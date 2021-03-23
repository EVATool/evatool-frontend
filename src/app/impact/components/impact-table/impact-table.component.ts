import { SliderFilterChange } from './../column-slider-filter/SliderFilterChange';
import { LogService } from '../../settings/log.service';
import { MatSliderChange } from '@angular/material/slider';
import { DimensionDataService } from '../../services/dimension/dimension-data.service';
import { DimensionDialogComponent } from '../dimension-dialog/dimension-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImpactDataService } from '../../services/impact/impact-data.service';
import { Impact } from '../../models/Impact';
import { AfterViewInit, Component, OnInit, ViewChild, isDevMode } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-impact-table',
  templateUrl: './impact-table.component.html',
  styleUrls: ['./impact-table.component.css', '../../../layout/style/style.css']
})
export class ImpactTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  // Used by table.
  displayedColumns: string[] = ['uniqueString', 'stakeholder', 'dimension', 'value', 'description'];
  tableDataSource: MatTableDataSource<Impact> = new MatTableDataSource<Impact>();

  // Filter components in UI.
  stakeholderFilter = new FormControl();
  dimensionFilter = new FormControl();
  valueFilter = new FormControl();
  searchToggles = new Map<string, boolean>();
  stakeholderNames: string[] = [];

  loaded: Promise<boolean> = Promise.resolve(false);

  filterValues = {
    id: '',
    stakeholder: [''],
    dimension: '',
    value: '',
    description: ''
  };

  constructor(
    private logger: LogService,
    public impactDataService: ImpactDataService,
    public dimensionDataService: DimensionDataService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.impactDataService.loadedImpacts.subscribe((impacts: Impact[]) => {
      this.logger.info('Impact Table received loadedImpacts event.');
      this.tableDataSource = new MatTableDataSource<Impact>(impacts);
      this.initSorting();
      this.initFiltering();
    });

    this.impactDataService.changedImpacts.subscribe((impacts: Impact[]) => {
      this.logger.info('Impact Table received changedImpacts event.');
      this.tableDataSource.data = impacts;
    });

    this.impactDataService.addedImpact.subscribe((impact: Impact) => {
      this.logger.info('Impact Table received addedImpact event.');
    });

    this.impactDataService.changedImpact.subscribe((impact: Impact) => {
      this.logger.info('Impact Table received changedImpact event.');
    });

    this.impactDataService.removedImpact.subscribe((impact: Impact) => {
      this.logger.info('Impact Table received removedImpact event.');
    });

    this.impactDataService.onInit();
  }

  private initSorting(): void {
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (impact, property) => {
      switch (property) {
        case 'stakeholder': return impact.stakeholder.name;
        case 'dimension': return impact.dimension.name;
        default: return impact[property];
      }
    };
  }

  public updateFilter(): void {
    console.log(JSON.stringify(this.filterValues));
    this.tableDataSource.filter = JSON.stringify(this.filterValues);
  }
  
  private initFiltering(): void {
    this.stakeholderNames = this.impactDataService.stakeholders.map(value => value.name);

    this.stakeholderFilter.valueChanges.subscribe(newStakeholder => {
      this.filterValues.stakeholder = newStakeholder;
      this.tableDataSource.filter = JSON.stringify(this.filterValues);
    });

    this.dimensionFilter.valueChanges.subscribe(newDimension => {
      this.filterValues.dimension = newDimension;
      this.tableDataSource.filter = JSON.stringify(this.filterValues);
    });

    this.valueFilter.valueChanges.subscribe(newValue => {
      this.filterValues.value = newValue;
      this.tableDataSource.filter = JSON.stringify(this.filterValues);
    });

    this.tableDataSource.filterPredicate = this.createFilter();

    this.searchToggles.set('stakeholder', false);
    this.searchToggles.set('dimension', false);
    this.searchToggles.set('value', false);
  }

  private createFilter(): (data: any, filter: string) => boolean {
    return (data: Impact, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return searchTerms.stakeholder.length === 0 || searchTerms.stakeholder.indexOf(data.stakeholder.name) !== -1
        && data.dimension.name.toLowerCase().indexOf(searchTerms.dimension.toLowerCase()) !== -1
        && searchTerms.value.length === 0 || searchTerms.value.indexOf(data.value) !== -1;
    };
  }

  valueFilterChanged(event: SliderFilterChange) {
    this.logger.info(event);

    //this.filterValues.value = event;
    this.filterValues.value = event.sliderFilterValues[0].toString();
    this.updateFilter();
  }

  toggleFilterVisibility(key: string): void {
    this.searchToggles.set(key, !this.searchToggles.get(key));
  }

  updateImpact(impact: Impact): void {
    this.impactDataService.updateImpact(impact);
  }

  deleteImpact(impact: Impact): void {
    this.impactDataService.deleteImpact(impact);
  }

  stakeholderChange(impact: Impact, event: MatSelectChange): void {
    this.logger.info('Stakeholder changed');
    this.updateImpact(impact);
  }

  dimensionChange(impact: Impact, event: MatSelectChange): void {
    this.logger.info('Dimension changed');
    this.updateImpact(impact);
  }

  valueChange(impact: Impact, event: MatSliderChange): void {
    this.logger.info('Value changed');
    if (event.value !== null) {
      impact.value = event.value;
    }
    this.updateImpact(impact);
  }

  descriptionChange(impact: Impact, event: Event): void {
    this.logger.info('Description changed');
    this.updateImpact(impact);
  }

  openDimensionModal(): void {
    if (!this.impactDataService.dimensionsLoaded) {
      this.logger.info('Dimensions not yet loaded.');
      return;
    }
    this.logger.info('Opening Dimension Modal Dialog.');
    const dialogRef = this.dialog.open(DimensionDialogComponent, {
      height: '80%',
      width: '50%',
      data: { parameter: 'I left this here because maybe we will need it c:' }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.logger.info('Closing Dimension Modal Dialog.');
    });
  }
}

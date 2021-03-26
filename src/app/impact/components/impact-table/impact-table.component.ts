import { ImpactTableFilterEvent } from './../impact-table-filter-bar/ImpactTableFilterEvent';
import { DimensionDialogComponent } from '../dimension-dialog/dimension-dialog.component';
import { MatSliderChange } from '@angular/material/slider';
import { DimensionDataService } from '../../services/dimension/dimension-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ImpactDataService } from '../../services/impact/impact-data.service';
import { Impact } from '../../models/Impact';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { LogService } from '../../../shared/services/log.service';
import { SliderFilterBoundary, SliderFilterSettings, SliderFilterType } from '../../../shared/components/impact-slider/SliderFilterSettings';

@Component({
  selector: 'app-impact-table',
  templateUrl: './impact-table.component.html',
  styleUrls: ['./impact-table.component.scss', '../../../layout/style/style.css']
})
export class ImpactTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  // Used by table.
  displayedColumns: string[] = ['uniqueString', 'stakeholder', 'dimension', 'value', 'description'];
  tableDataSource: MatTableDataSource<Impact> = new MatTableDataSource<Impact>();

  // Filter components in UI.
  stakeholderNames: string[] = [];
  dimensionNames: string[] = [];

  // TODO: Extend these for more complex queries.
  filterValues: any = {
    id: '',
    stakeholder: [],
    dimension: [],
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
      this.logger.info(this, 'Event \'loadedImpacts\' received from ImpactDataService');
      this.tableDataSource = new MatTableDataSource<Impact>(impacts);
      this.initSorting();
      this.initFiltering();
    });

    this.impactDataService.changedImpacts.subscribe((impacts: Impact[]) => {
      this.logger.info(this, 'Event \'changedImpacts\' received from ImpactDataService');
      this.tableDataSource.data = impacts;
    });

    this.impactDataService.addedImpact.subscribe((impact: Impact) => {
      this.logger.info(this, 'Event \'addedImpact\' received from ImpactDataService');
    });

    this.impactDataService.changedImpact.subscribe((impact: Impact) => {
      this.logger.info(this, 'Event \'changedImpact\' received from ImpactDataService');
    });

    this.impactDataService.removedImpact.subscribe((impact: Impact) => {
      this.logger.info(this, 'Event \'removedImpact\' received from ImpactDataService');
    });

    this.impactDataService.onInit();
  }

  private initSorting(): void {
    this.logger.info(this, 'Init Sorting');
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
    this.logger.info(this, 'Update Filter');
    this.tableDataSource.filter = JSON.stringify(this.filterValues);
  }

  private initFiltering(): void {
    this.logger.info(this, 'Init Filtering');
    this.stakeholderNames = this.impactDataService.stakeholders.map(value => value.name);
    this.dimensionNames = this.impactDataService.dimensions.map(value => value.name);

    this.tableDataSource.filterPredicate = this.createFilter();
  }

  private createFilter(): (data: any, filter: string) => boolean {
    this.logger.info(this, 'Create Filter');
    return (data: Impact, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const stakeholderFilter = searchTerms.stakeholder.length === 0 || searchTerms.stakeholder.indexOf(data.stakeholder.name) !== -1;

      const dimensionFilter = searchTerms.dimension.length === 0 || searchTerms.dimension.indexOf(data.dimension.name) !== -1;

      let valueFilter = false;
      switch (searchTerms.value.sliderFilterType) {
        case SliderFilterType.Off:
          valueFilter = true;
          break;

        case SliderFilterType.LessThan:
          if (searchTerms.value.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
            valueFilter = data.value < searchTerms.value.sliderFilterValues[0];
          } else {
            valueFilter = data.value <= searchTerms.value.sliderFilterValues[0];
          }
          break;

        case SliderFilterType.GreaterThan:
          if (searchTerms.value.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
            valueFilter = data.value > searchTerms.value.sliderFilterValues[0];
          } else {
            valueFilter = data.value >= searchTerms.value.sliderFilterValues[0];
          }
          break;

        case SliderFilterType.Equality:
          valueFilter = data.value === searchTerms.value.sliderFilterValues[0];
          break;

        case SliderFilterType.Bewtween:
          const minValue = Math.min(searchTerms.value.sliderFilterValues[0], searchTerms.value.sliderFilterValues[1]);
          const maxValue = Math.max(searchTerms.value.sliderFilterValues[0], searchTerms.value.sliderFilterValues[1]);
          if (searchTerms.value.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
            valueFilter = data.value > minValue && data.value < maxValue;
          } else {
            valueFilter = data.value >= minValue && data.value <= maxValue;
          }
          break;

        default:
          valueFilter = true;
          break;
      }

      return stakeholderFilter && dimensionFilter && valueFilter;
    };
  }

  filterChange(event: ImpactTableFilterEvent): void {
    this.logger.info(this, 'Value Filter Changed');
    this.filterValues.value = event.valueFilter;
    this.updateFilter();
  }

  updateImpact(impact: Impact): void {
    this.logger.info(this, 'Update Impact');
    this.impactDataService.updateImpact(impact);
  }

  deleteImpact(impact: Impact): void {
    this.logger.info(this, 'Delete Impact');
    this.impactDataService.deleteImpact(impact);
  }

  stakeholderChange(impact: Impact, event: MatSelectChange): void {
    this.logger.info(this, 'Stakeholder changed');
    this.updateImpact(impact);
  }

  dimensionChange(impact: Impact, event: MatSelectChange): void {
    this.logger.info(this, 'Dimension changed');
    this.updateImpact(impact);
  }

  valueChange(impact: Impact, event: MatSliderChange): void {
    this.logger.info(this, 'Value changed');
    if (event.value !== null) {
      impact.value = event.value;
    }
    this.updateImpact(impact);
  }

  descriptionChange(impact: Impact, event: Event): void {
    this.logger.info(this, 'Description changed');
    this.updateImpact(impact);
  }

  openDimensionModal(): void {
    // if (!this.dimensionDataService.loaded) {
    //  this.logger.info(this, 'Dimensions not yet loaded');
    //  return;
    // }
    this.logger.info(this, 'Opening Dimension Modal Dialog');
    const dialogRef = this.dialog.open(DimensionDialogComponent, {
      height: '80%',
      width: '50%',
      data: { parameter: 'I left this here because maybe we will need it c:' }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.logger.info(this, 'Closing Dimension Modal Dialog');
    });
  }
}

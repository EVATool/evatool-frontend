import { DimensionDataService } from './../../services/dimension/dimension-data.service';
import { DimensionDialogComponent } from './../dimension-dialog/dimension-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImpactDataService } from '../../services/impact/impact-data.service';
import { Impact } from '../../models/Impact';
import { AfterViewInit, Component, OnInit, ViewChild, isDevMode } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

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

  loaded: Promise<boolean> = Promise.resolve(false);

  constructor(
    public impactDataService: ImpactDataService,
    public dimensionDataService: DimensionDataService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.impactDataService.loadedImpacts.subscribe((impacts: Impact[]) => {
      this.tableDataSource = new MatTableDataSource<Impact>(impacts);
      this.initSorting();
      this.initFiltering();
    });

    this.impactDataService.changedImpacts.subscribe((impacts: Impact[]) => {
      this.tableDataSource.data = impacts;
    });

    this.impactDataService.addedImpact.subscribe((impact: Impact) => [

    ]);

    this.impactDataService.changedImpact.subscribe((impact: Impact) => [

    ]);

    this.impactDataService.removedImpact.subscribe((impact: Impact) => [

    ]);

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

  private initFiltering(): void {
    const filterValues = {
      id: '',
      stakeholder: '',
      dimension: '',
      value: '',
      description: ''
    };

    this.stakeholderFilter.valueChanges.subscribe(newStakeholder => {
      filterValues.stakeholder = newStakeholder;
      this.tableDataSource.filter = JSON.stringify(filterValues);
    });

    this.dimensionFilter.valueChanges.subscribe(newDimension => {
      filterValues.dimension = newDimension;
      this.tableDataSource.filter = JSON.stringify(filterValues);
    });

    this.valueFilter.valueChanges.subscribe(newValue => {
      filterValues.value = newValue;
      this.tableDataSource.filter = JSON.stringify(filterValues);
    });

    this.tableDataSource.filterPredicate = this.createFilter();

    this.searchToggles.set('stakeholder', false);
    this.searchToggles.set('dimension', false);
    this.searchToggles.set('value', false);
  }

  private createFilter(): (data: any, filter: string) => boolean {
    return (data: Impact, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.stakeholder.name.toLowerCase().indexOf(searchTerms.stakeholder.toLowerCase()) !== -1
        && data.dimension.name.toLowerCase().indexOf(searchTerms.dimension.toLowerCase()) !== -1
        && data.value.toString().toLowerCase().indexOf(searchTerms.value.toLowerCase()) !== -1;
    };
  }

  toggleFilterVisibility(key: string): void {
    this.searchToggles.set(key, !this.searchToggles.get(key));
  }

  deleteImpact(impact: Impact): void {
    this.impactDataService.deleteImpact(impact);
  }

  openDimensionModal(): void {
    if (!this.impactDataService.dimensionsLoaded) {
      console.log('Dimensions not yet loaded.');
      return;
    }
    console.log('Opening Dimension Modal Dialog.');
    const dialogRef = this.dialog.open(DimensionDialogComponent, {
      height: '80%',
      width: '50%',
      data: { parameter: 'I left this here because maybe we will need it c:' }
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('Closing Dimension Modal Dialog.');
    });
  }
}

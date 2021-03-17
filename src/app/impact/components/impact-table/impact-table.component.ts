import { DimensionDataService } from '../../services/dimension/dimension-data.service';
import { Dimension } from '../../models/Dimension';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderDataService } from '../../services/stakeholder/stakeholder-data.service';
import { ImpactDataService } from '../../services/impact/impact-data.service';
import { Impact } from '../../models/Impact';
import { AfterViewInit, Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-impact-table',
  templateUrl: './impact-table.component.html',
  styleUrls: ['./impact-table.component.css', '../../../layout/style/style.css']
})
export class ImpactTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  // Used by table.
  displayedColumns: string[] = ['id', 'stakeholder', 'dimension', 'value', 'description'];
  tableDataSource!: MatTableDataSource<Impact>;

  // Data arrays from services.
  dimensions: Dimension[] = [];
  dimensionTypes: string[] = [];
  stakeholders: Stakeholder[] = [];

  // Filter components in UI.
  stakeholderFilter = new FormControl();
  dimensionFilter = new FormControl();
  valueFilter = new FormControl();
  searchToggles = new Map<string, boolean>();

  constructor(
    private impactDataService: ImpactDataService,
    private dimensionDataService: DimensionDataService,
    private stakeholderDataService: StakeholderDataService) {

    // Listen for changes in data.
    this.impactDataService.loadedImpacts.subscribe(impacts => {
      this.tableDataSource = new MatTableDataSource<Impact>(impacts);
      this.initSorting();
      this.initFiltering();
    });

    this.impactDataService.changedImpacts.subscribe(impacts => {
      //this.tableDataSource.data = impacts;
      this.tableDataSource = new MatTableDataSource<Impact>(impacts);
      this.initSorting();
      this.initFiltering();
    });

    // Initially, due to timing, fire loadedImpacts event manually.
    this.impactDataService.invalidate();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

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
    this.tableDataSource.filterPredicate = this.createFilter();
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

  deleteImpact(impact: Impact) {
    this.impactDataService.removeImpact(impact);
  }
}

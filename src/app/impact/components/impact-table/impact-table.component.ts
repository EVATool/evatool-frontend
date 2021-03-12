import { DimensionDataService } from '../../services/dimension/dimension-data.service';
import { Dimension } from '../../models/Dimension';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderDataService } from '../../services/stakeholder/stakeholder-data.service';
import { ImpactDataService } from '../../services/impact/impact-data.service';
import { Impact } from '../../models/Impact';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

  displayedColumns: string[] = ['id', 'stakeholder', 'dimension', 'value', 'description'];
  impacts: Impact[] = [];
  dimensions: Dimension[] = [];
  dimensionTypes: string[] = [];
  stakeholders: Stakeholder[] = [];

  tableDataSource!: MatTableDataSource<Impact>;

  stakeholderFilter = new FormControl();
  dimensionFilter = new FormControl();
  valueFilter = new FormControl();

  constructor(
    private impactDataService: ImpactDataService,
    private dimensionDataService: DimensionDataService,
    private stakeholderDataService: StakeholderDataService) {
    this.impacts = this.impactDataService.getImpacts();
    this.dimensions = this.dimensionDataService.getDimensions();
    this.dimensionTypes = this.dimensionDataService.getDimensionTypes();
    this.stakeholders = this.stakeholderDataService.getStakeholders();
    this.tableDataSource = new MatTableDataSource<Impact>(this.impacts);
  }

  ngOnInit(): void {
    this.impactDataService.onImpactsLoaded.subscribe(_ => {
      this.tableDataSource = new MatTableDataSource<Impact>(this.impacts);
    });

    this.impactDataService.onCreateImpact.subscribe(_ => {
      this.tableDataSource.data = this.impacts;
    });
  }

  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.sort;
    this.initSorting();
    this.initFiltering();
  }

  private initSorting(): void {
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
  }

  private createFilter(): (data: any, filter: string) => boolean {
    return (data: Impact, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.stakeholder.name.toLowerCase().indexOf(searchTerms.stakeholder.toLowerCase()) !== -1
        && data.dimension.name.toLowerCase().indexOf(searchTerms.dimension.toLowerCase()) !== -1
        && data.value.toString().toLowerCase().indexOf(searchTerms.value.toLowerCase()) !== -1;
    };
  }
}

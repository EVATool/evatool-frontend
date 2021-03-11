import { DimensionDataService } from '../../services/dimension/dimension-data.service';
import { Dimension } from '../../models/Dimension';
import { Stakeholder } from '../../models/Stakeholder';
import { StakeholderDataService } from '../../services/stakeholder/stakeholder-data.service';
import { ImpactDataService } from '../../services/impact/impact-data.service';
import { Impact } from '../../models/Impact';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  tableDataSource: MatTableDataSource<Impact>;

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
    this.tableDataSource.sortingDataAccessor = (impact, property) => {
      switch(property) {
        case 'stakeholder': return impact.stakeholder.name;
        case 'dimension': return impact.dimension.name;
        default: return impact[property];
      }
    };
  }

  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.sort;
  }
}

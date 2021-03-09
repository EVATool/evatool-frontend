import { DimensionDataService } from './../../services/dimension/dimension-data.service';
import { Dimension } from './../../models/Dimension';
import { Stakeholder } from './../../models/Stakeholder';
import { StakeholderDataService } from './../../services/stakeholder/stakeholder-data.service';
import { ImpactDataService } from './../../services/impact/impact-data.service';
import { Impact } from './../../models/Impact';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-impact-table',
  templateUrl: './impact-table.component.html',
  styleUrls: ['./impact-table.component.css']
})
export class ImpactTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'stakeholder', 'dimension', 'value', 'description'];
  impacts: Impact[] = [];
  dimensions: Dimension[] = [];
  dimensionTypes: string[] = [];
  stakeholders: Stakeholder[] = [];

  constructor(
    private impactDataService: ImpactDataService,
    private dimensionDataService: DimensionDataService,
    private stakeholderDataService: StakeholderDataService) {
    this.impacts = this.impactDataService.getImpacts();
    this.dimensions = this.dimensionDataService.getDimensions();
    this.dimensionTypes = this.dimensionDataService.getDimensionTypes();
    this.stakeholders = this.stakeholderDataService.getStakeholders();
  }

  ngOnInit(): void {

  }
}

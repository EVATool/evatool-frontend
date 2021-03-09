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

  constructor(private impactDataService: ImpactDataService) {
    this.impacts = this.impactDataService.getImpacts();
  }

  ngOnInit(): void {

  }
}

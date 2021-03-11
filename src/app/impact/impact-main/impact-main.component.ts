import { ImpactDataService } from './../services/impact/impact-data.service';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Impact } from '../models/Impact';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.css']
})
export class ImpactMainComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private impactDataService: ImpactDataService) {

  }

  ngOnInit(): void {

  }

  addImpact(): void {
    console.log('add impact...');
    this.impactDataService.createImpact();
  }
}

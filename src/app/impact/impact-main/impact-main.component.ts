import { ImpactDataService } from './../services/impact/impact-data.service';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.css']
})
export class ImpactMainComponent implements OnInit {

  constructor(private impactDataService: ImpactDataService) {

  }

  ngOnInit(): void {

  }

  addImpact(): void {
    this.impactDataService.createImpact();
  }
}

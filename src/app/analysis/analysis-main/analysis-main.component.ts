import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-analysis-main',
  templateUrl: './analysis-main.component.html',
  styleUrls: ['./analysis-main.component.css']
})
export class AnalysisMainComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;


  constructor() {}

  ngOnInit(): void {
  }

  addAnalysis(): void {
    console.log('add analysis...');
    // this.analysisDataService.createAnalysis();
  }

}

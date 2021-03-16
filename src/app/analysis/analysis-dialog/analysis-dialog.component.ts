import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis-dialog',
  templateUrl: './analysis-dialog.component.html',
  styleUrls: ['./analysis-dialog.component.css']
})
export class AnalysisDialogComponent implements OnInit {
  analyseName: any;
  analysisDescription: any;

  onSubmit(): void {
    console.log(this.analyseName);
    console.log(this.analysisDescription);
  }

  constructor() { }


  ngOnInit(): void {
  }

}

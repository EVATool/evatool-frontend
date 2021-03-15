import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AnalysisDialogComponent} from "../analysis-dialog/analysis-dialog.component";


@Component({
  selector: 'app-analysis-main',
  templateUrl: './analysis-main.component.html',
  styleUrls: ['./analysis-main.component.css']
})
export class AnalysisMainComponent implements OnInit {


  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AnalysisDialogComponent, { data: { p: 'test', b: 'auch test' } });
  }
  ngOnInit(): void {
  }

  // addAnalysis(): void {
  //   console.log('add analysis...');
  // }

}

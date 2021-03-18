import { Dimension } from './../../models/Dimension';
import { DataLoader } from './../../settings/DataLoader';
import { DimensionDataService } from './../../services/dimension/dimension-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dimension-dialog',
  templateUrl: './dimension-dialog.component.html',
  styleUrls: ['./dimension-dialog.component.css']
})
export class DimensionDialogComponent implements OnInit, AfterViewInit {

  socialDimensionState = true;
  economicDimensionState = true;

  socialDimensions: Dimension[] = [];
  displayedColumns = ['id', 'name', 'type', 'description']

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DimensionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dimensionDataService: DimensionDataService) {
    this.socialDimensions = dimensionDataService.dimensions;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(null),
    });
  }

  ngAfterViewInit(): void {

  }

  closeClick(): void {
    this.dialogRef.close({ accept: false });
  }
}

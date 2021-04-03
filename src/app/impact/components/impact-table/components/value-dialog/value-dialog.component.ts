import { ValueDataService } from '../../../../services/value/value-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.scss']
})
export class ValueDialogComponent implements OnInit, AfterViewInit {

  socialValueState = true; // TODO Do foreach valueType, even necessary?
  economicValueState = true;

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public valuesDataService: ValueDataService) { }

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

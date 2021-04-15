import {ValueDataService} from '../../../../services/value/value-data.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {Value} from "../../../../models/Value";
import {LogService} from "../../../../../shared/services/log.service";

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.scss']
})
export class ValueDialogComponent implements OnInit, AfterViewInit {

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public valuesDataService: ValueDataService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  closeClick(): void {
    this.dialogRef.close();
  }

  propagateSeeReferences(value: Value) {
    this.logger.info(this, 'User wants to see the impacts referencing the value');
    this.dialogRef.close({showReferencedImpacts: true, value: value});
  }
}

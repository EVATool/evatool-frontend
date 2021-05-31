import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {LogService} from '../../../../services/log.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ValueDataService} from '../../../../services/data/value-data.service';
import {Value} from '../../../../model/Value';

@Component({
  selector: 'app-values-dialog',
  templateUrl: './values-dialog.component.html',
  styleUrls: ['./values-dialog.component.scss']
})
export class ValuesDialogComponent {

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public valueDataService: ValueDataService) {
  }

  closeClick(): void {
    this.dialogRef.close();
  }

  propagateSeeReferences(value: Value): void {
    this.logger.info(this, 'User wants to see the impacts referencing the value');
    this.dialogRef.close({showReferencedImpacts: true, value: value});
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {LogService} from '../../../../services/log.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ValueDataService} from '../../../../services/data/value-data.service';
import {Value} from '../../../../model/Value';
import {CrossUiEventService, ValueReferencedByImpactsEvent} from '../../../../services/cross-ui-event.service';

@Component({
  selector: 'app-values-dialog',
  templateUrl: './values-dialog.component.html',
  styleUrls: ['./values-dialog.component.scss']
})
export class ValuesDialogComponent implements OnInit {

  id!: string;

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public valueDataService: ValueDataService,
    private crossUI: CrossUiEventService) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.crossUI.userWantsToSeeValueReferencedByImpacts.subscribe((event: ValueReferencedByImpactsEvent) => {
      this.closeClick();
    });
  }

  closeClick(): void {
    this.dialogRef.close();
  }

  propagateSeeReferences(value: Value): void {
    this.logger.info(this, 'User wants to see the impacts referencing the value');
    this.dialogRef.close({showReferencedImpacts: true, value: value});
  }
}

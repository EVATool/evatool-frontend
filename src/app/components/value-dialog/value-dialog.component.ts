import {Component, Inject, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ValueDataService} from '../../services/data/value-data.service';
import {CrossUiEventService, ValueReferencedByImpactsEvent} from '../../services/cross-ui-event.service';

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.scss']
})
export class ValueDialogComponent implements OnInit {

  id!: string;

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ValueDialogComponent>,
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
}

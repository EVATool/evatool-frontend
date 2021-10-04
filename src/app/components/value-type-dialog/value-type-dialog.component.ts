import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogService} from '../../services/log.service';
import {FormBuilder} from '@angular/forms';
import {Subject} from 'rxjs';
import {ValueTypeDataService} from '../../services/data/value-type-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {ValuesReferencingValueType} from '../../services/event/events/http409/ValuesReferencingValueType';

@Component({
  selector: 'app-value-type-dialog',
  templateUrl: './value-type-dialog.component.html',
  styleUrls: ['./value-type-dialog.component.scss']
})
export class ValueTypeDialogComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  id!: string;

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ValueTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public valueDataService: ValueTypeDataService,
    private crossUI: CrossUiEventService) {
  }

  ngOnInit(): void {
    this.crossUI.userWantsToSeeValuesReferencingValueType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValuesReferencingValueType) => {
        this.closeClick();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  closeClick(): void {
    this.dialogRef.close();
  }
}

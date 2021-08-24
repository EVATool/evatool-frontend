import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ValueDataService} from '../../services/data/value-data.service';
import {CrossUiEventService, ValueReferencedByImpactsEvent} from '../../services/cross-ui-event.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.scss']
})
export class ValueDialogComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

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
    this.crossUI.userWantsToSeeValueReferencedByImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: ValueReferencedByImpactsEvent) => {
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

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LogService} from '../../services/log.service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {takeUntil} from 'rxjs/operators';
import {VariantTypeDataService} from '../../services/data/variant-type-data.service';
import {VariantsReferencingVariantType} from '../../services/event/events/http409/VariantsReferencingVariantType';

@Component({
  selector: 'app-variant-type-dialog',
  templateUrl: './variant-type-dialog.component.html',
  styleUrls: ['./variant-type-dialog.component.scss']
})
export class VariantTypeDialogComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  id!: string;

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public variantTypeDataService: VariantTypeDataService,
    private crossUI: CrossUiEventService) {
  }

  ngOnInit(): void {
    this.crossUI.userWantsToSeeVariantsReferencingVariantType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: VariantsReferencingVariantType) => {
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

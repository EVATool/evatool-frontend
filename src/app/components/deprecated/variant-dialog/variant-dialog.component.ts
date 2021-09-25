import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VariantDataService} from '../../../services/data/variant-data.service';
import {LogService} from '../../../services/log.service';
import {CrossUiEventService} from '../../../services/event/cross-ui-event.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {VariantReferencedByRequirementsEvent} from '../../../services/event/events/http409/VariantReferencedByRequirementsEvent';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.scss']
})
export class VariantDialogComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  ids!: string[];

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ids: string[] },
    private crossUI: CrossUiEventService,
    public variantDataService: VariantDataService) {
    this.ids = data.ids;
  }

  ngOnInit(): void {
    this.crossUI.userWantsToSeeVariantReferencedByRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: VariantReferencedByRequirementsEvent) => {
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

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VariantDataService} from '../../services/data/variant-data.service';
import {LogService} from '../../services/log.service';
import {Variant} from '../../model/Variant';
import {
  CrossUiEventService,
  ValueReferencedByImpactsEvent,
  VariantReferencedByRequirementsEvent
} from '../../services/cross-ui-event.service';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.scss']
})
export class VariantDialogComponent implements OnInit {

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
    this.crossUI.userWantsToSeeVariantReferencedByRequirements.subscribe((event: VariantReferencedByRequirementsEvent) => {
      this.closeClick();
    });
  }

  closeClick(): void {
    this.dialogRef.close();
  }
}

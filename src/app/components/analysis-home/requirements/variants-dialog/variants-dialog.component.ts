import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VariantDataService} from '../../../../services/data/variant-data.service';
import {LogService} from '../../../../services/log.service';
import {Variant} from '../../../../model/Variant';
import {
  CrossUiEventService,
  ValueReferencedByImpactsEvent,
  VariantReferencedByRequirementsEvent
} from '../../../../services/cross-ui-event.service';

@Component({
  selector: 'app-variants-dialog',
  templateUrl: './variants-dialog.component.html',
  styleUrls: ['./variants-dialog.component.scss']
})
export class VariantsDialogComponent implements OnInit {

  ids!: string[];

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantsDialogComponent>,
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

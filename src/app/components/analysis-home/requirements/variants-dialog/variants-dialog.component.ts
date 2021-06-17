import {Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VariantDataService} from '../../../../services/data/variant-data.service';
import {LogService} from '../../../../services/log.service';
import {Variant} from '../../../../model/Variant';

@Component({
  selector: 'app-variants-dialog',
  templateUrl: './variants-dialog.component.html',
  styleUrls: ['./variants-dialog.component.scss']
})
export class VariantsDialogComponent {

  ids!: string[];

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ids: string[] },
    public variantDataService: VariantDataService) {
    this.ids = data.ids;
  }

  closeClick(): void {
    this.dialogRef.close();
  }

  propagateSeeReferences(variant: Variant): void {
    this.logger.info(this, 'User wants to see the requirements referencing the variant');
    this.dialogRef.close({showReferencedRequirements: true, variant: variant});
  }
}

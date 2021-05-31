import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VariantDataService} from '../../../../services/data/variant-data.service';
import {LogService} from '../../../../services/log.service';

@Component({
  selector: 'app-variants-dialog',
  templateUrl: './variants-dialog.component.html',
  styleUrls: ['./variants-dialog.component.scss']
})
export class VariantsDialogComponent {

  constructor(
    private logger: LogService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public variantDataService: VariantDataService) {
  }

  closeClick(): void {
    this.dialogRef.close();
  }
}

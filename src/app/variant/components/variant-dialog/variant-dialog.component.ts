import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../../models/Variant';
import {VariantDataService} from '../../services/variant-data.service';
import {VariantRestService} from '../../services/variant-rest.service';
import {VariantDTO} from '../../models/VariantDTO';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.scss']
})
export class VariantDialogComponent implements OnInit {

  form!: FormGroup;
  displayedColumns = ['guiId', 'title', 'description'];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public variantDataService: VariantDataService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(null)
    });
  }

  addVariant(): void {
    this.variantDataService.createVariant();
  }

  save(variant: Variant): void {
    variant.editable = false;
    this.variantDataService.save(variant);
  }

  archive(variant: Variant): void {
    this.variantDataService.archive(variant);
  }
}

import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../models/Variant';
import {VariantDataService} from '../services/variant-data.service';
import {VariantRestService} from '../services/variant-rest.service';
import {VariantDTO} from '../models/VariantDTO';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.scss']
})
export class VariantDialogComponent implements OnInit {

  form!: FormGroup;
  displayedColumns = ['guiId', 'title', 'description'];
  variants: Variant[] = [];
  matDataSource = new MatTableDataSource<Variant>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private variantDataService: VariantDataService,
    private variantRestService: VariantRestService) {
    this.matDataSource = new MatTableDataSource<Variant>(this.variants);
  }


  ngOnInit(): void {
    this.loadVariants();
    this.form = this.formBuilder.group({
      id: new FormControl(null)
    });

    this.variantDataService.onCreateVariant.subscribe(variant => {
      this.variants.push(variant);
      this.matDataSource = new MatTableDataSource<Variant>(this.variants);
    });
  }

  loadVariants(): void{
    this.variantRestService.getVariants().subscribe((result: any) => {
      this.variants = [];
      console.log(result);
      result.forEach((variantDTO: VariantDTO) => {
        const variant: Variant = {
          id: variantDTO.id,
          guiId: variantDTO.guiId,
          description: variantDTO.description,
          title: variantDTO.title,
          analysisId: variantDTO.analysisId,
          archived: variantDTO.archived
        };
        this.variants.push(variant);
      });
      this.matDataSource = new MatTableDataSource<Variant>(this.variants);
    });
  }

  addVariant(): void {
    this.variantDataService.createVariant();
  }

  save(variant: Variant): void {
    variant.editable = false;
    this.variantDataService.save(variant, this);
  }

  archive(variant: Variant): void {
    this.variantDataService.archive(variant, this );
  }
}

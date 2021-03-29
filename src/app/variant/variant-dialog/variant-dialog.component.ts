import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../models/Variant';
import {VariantDataService} from '../services/variant-data.service';
import {VariantRestService} from '../services/variant-rest.service';


@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.scss']
})
export class VariantDialogComponent implements OnInit {

  form!: FormGroup;
  displayedColumns = ['title', 'description', 'options'];
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

    this.form = this.formBuilder.group({
      id: new FormControl(null)
    });

    this.variantRestService.getVariants().subscribe((result: any) => {
      this.variants = [];
      result.content.forEach((variantDTO: any) => {
        const variant = {
          id: variantDTO.uuid,
          description: variantDTO.description,
          title: variantDTO.title,
          analysesId: variantDTO.analysesId
        };
        this.variants.push(variant);
      });
      this.matDataSource = new MatTableDataSource<Variant>(this.variants);
    });

    this.variantDataService.onCreateVariant.subscribe(variant => {
      this.variants.push(variant);
      this.matDataSource = new MatTableDataSource<Variant>(this.variants);
    });
  }

  addVariant(): void {
    this.variantDataService.createVariant();
  }

  save(variant: Variant): void {
    variant.editable = false;
    this.variantDataService.save(variant);
  }

}

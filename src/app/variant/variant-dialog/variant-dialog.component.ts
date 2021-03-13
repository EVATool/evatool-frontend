import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../models/Variant';
import {VariantDataService} from '../services/variant-data.service';
import {Impact} from '../../impact/models/Impact';
import {VariantRestService} from '../services/variant-rest.service';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.css']
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
      id: new FormControl(null),
      title: new FormControl(null),
      description: new FormControl(null),
      editable: new FormControl(null)
    });

    this.variantRestService.getVariants().subscribe((result: any) =>  {
      this.variants = [];
      result.content.forEach((variantDTO: any) => {
        const variant = {
          id: variantDTO.uuid,
          description: variantDTO.description,
          title: variantDTO.title
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

  abort(): void {
    this.dialogRef.close({accept: false});
  }

  closeModal(): void {
    this.dialogRef.close({accept: true, form: this.form.value});
  }

  addVariant(): void {
    this.variantDataService.createVariant();
  }

  save(variant: Variant): void {
    // variant.title = this.index.value.title;
    // variant.description = this.index.value.description;

    this.variantDataService.save(variant);
  }
}

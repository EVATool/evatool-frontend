import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../models/Variant';
import {VariantDataService} from '../services/variant-data.service';
import {Impact} from '../../impact/models/Impact';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.css']
})
export class VariantDialogComponent implements OnInit {

  form!: FormGroup;
  displayedColumns =  ['title', 'description', 'options'];
  variants: Variant[] = [];
  matDataSource = new MatTableDataSource<Variant>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private variantDataService: VariantDataService) {
    this.variantDataService.onCreateVariant.subscribe(variant => {
      console.log(variant);
      this.matDataSource = new MatTableDataSource<Variant>(this.variants);
    });
    this.variants = this.variantDataService.getVariants();
    this.matDataSource = new MatTableDataSource<Variant>(this.variants);
  }


  ngOnInit(): void {

    this.form = this.formBuilder.group({index: new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null),
      description: new FormControl(null),
      editable: new FormControl(null)
   })});


  }

  abort(): void {
    this.dialogRef.close({ accept: false });
  }

  ok(): void {
    this.dialogRef.close({ accept: true, form: this.form.value });
  }

  addVariant(): void{
    this.variantDataService.createVariant();
  }

  save(variant: Variant): void{
    //variant.title = this.index.value.title;
    //variant.description = this.index.value.description;

    this.variantDataService.save(variant);
  }
}

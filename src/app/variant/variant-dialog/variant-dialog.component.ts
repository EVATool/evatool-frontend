import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Impact} from '../../impact/models/Impact';
import {Variant} from '../models/Variant';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.css']
})
export class VariantDialogComponent implements OnInit {

  form!: FormGroup;
  displayedColumns =  ['title', 'description'];
  variants: Variant[] = [
    {
      id: '0',
      title: '1',
      description: 'This is the first read-only impact',

    },
    {
      id: '2',
      title: '0.5',
      description: 'This is the second read-only impact',

    },
    {
      id: '3',
      title: '0.9',
      description: 'This is the third read-only impact',
    }
  ];
  matDataSource = new MatTableDataSource<Variant>();



  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.matDataSource = new MatTableDataSource<Variant>(this.variants);
    this.form = this.formBuilder.group({
      id: new FormControl(null),

    });
  }

  abort(): void {
    this.dialogRef.close({ accept: false });
  }

  ok(): void {
    this.dialogRef.close({ accept: true, form: this.form.value });
  }

}

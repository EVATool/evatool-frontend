import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from "@angular/material/table";
import {Impact} from "../../impact/models/Impact";

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.css']
})
export class VariantDialogComponent implements OnInit {

  form!: FormGroup;
  displayedColumns =  ['titel', 'description']
  matDataSource = new MatTableDataSource<items>();

  dummyVariants: items[] = [
    {
      id: 0,
      titel: '1',
      description: 'This is the first read-only impact',

    },
    {
      id: '2',
      titel: 0.5,
      description: 'This is the second read-only impact',

    },
    {
      id: '3',
      titel: 0.9,
      description: 'This is the third read-only impact',
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.matDataSource.data.push(this.dummyVariants)
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

export interface items{}



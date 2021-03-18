import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dimension-dialog',
  templateUrl: './dimension-dialog.component.html',
  styleUrls: ['./dimension-dialog.component.css']
})
export class DimensionDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DimensionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(null),
    });
  }

  closeClick(): void {
    this.dialogRef.close({ accept: false });
  }
}

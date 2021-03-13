import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-variant-dialog',
  templateUrl: './variant-dialog.component.html',
  styleUrls: ['./variant-dialog.component.css']
})
export class VariantDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VariantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
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

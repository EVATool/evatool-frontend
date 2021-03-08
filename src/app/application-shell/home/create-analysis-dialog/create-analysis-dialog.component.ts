import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-analysis-dialog',
  templateUrl: './create-analysis-dialog.component.html',
  styleUrls: ['./create-analysis-dialog.component.css']
})
export class CreateAnalysisDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateAnalysisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl(null),
    })
  }

  abort() {
    this.dialogRef.close({ accept: false });
  }

  ok() {
    this.dialogRef.close({ accept: true, form: this.form.value });
  }
}

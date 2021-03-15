import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Stakeholder} from '../model/Stakeholder';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StakeholderDataService} from '../service/stakeholder-data.service';

@Component({
  selector: 'app-stakeholder-dialog',
  templateUrl: './stakeholder-dialog.component.html',
  styleUrls: ['./stakeholder-dialog.component.css']
})
export class StakeholderDialogComponent implements OnInit{

  form!: FormGroup;
  displayedColumns =  ['Stakeholder', 'Ebene', 'Prio', 'Impact'];
  stakeholders: Stakeholder[] = [];
  matDataSource = new MatTableDataSource<Stakeholder>();


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<StakeholderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stakeholderDataService: StakeholderDataService) {
    this.stakeholders = stakeholderDataService.getStakeholders();
    this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({index: new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null),
        level: new FormControl(null),
        prio: new FormControl(null),
        impact: new FormControl(null),
        editable: new FormControl(null)
      })});
    this.stakeholderDataService.onCreateStakeholder.subscribe(stakeholder => {
      console.log(stakeholder);
      this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
    });


  }

  abort(): void {
    this.dialogRef.close({ accept: false });
  }

  ok(): void {
    this.dialogRef.close({ accept: true, form: this.form.value });
  }

  addStakeholder(): void{
    this.stakeholderDataService.createStakeholder();
  }
  save(stakeholder: Stakeholder): void{
    this.stakeholderDataService.save(stakeholder);
  }


}

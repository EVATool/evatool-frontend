import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Stakeholder} from '../model/Stakeholder';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-stakeholder-main',
  templateUrl: './stakeholder-main.component.html',
  styleUrls: ['./stakeholder-main.component.css']
})
export class StakeholderMainComponent implements OnInit{
  constructor(){
  }

  ngOnInit(): void {}

  addStakeholder(): void{
  }
  save(stakeholder: Stakeholder): void{
  }


}

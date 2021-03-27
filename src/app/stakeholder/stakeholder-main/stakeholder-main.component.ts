import {Component, OnInit} from '@angular/core';
import {Stakeholder} from '../model/Stakeholder';


@Component({
  selector: 'app-stakeholder-main',
  templateUrl: './stakeholder-main.component.html',
  styleUrls: ['./stakeholder-main.component.scss']
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

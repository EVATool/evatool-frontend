import { Component, OnInit } from '@angular/core';
import {Requirements} from '../models/Requirements';

@Component({
  selector: 'app-requirement-main',
  templateUrl: './requirement-main.component.html',
  styleUrls: ['./requirement-main.component.css']
})
export class RequirementMainComponent implements OnInit {

  data: Requirements[] = [];
  constructor() {
  }

  ngOnInit(): void {
  }

}

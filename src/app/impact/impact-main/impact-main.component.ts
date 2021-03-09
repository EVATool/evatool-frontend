import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.css']
})
export class ImpactMainComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

  addImpact(){
    console.log('add impact...');
  }
}

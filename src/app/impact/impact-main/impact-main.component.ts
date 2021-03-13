import { ImpactDataService } from './../services/impact/impact-data.service';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.css']
})
export class ImpactMainComponent implements OnInit {

  windowScrolled = true;

  constructor(private impactDataService: ImpactDataService) { }

  ngOnInit(): void {

  }

  addImpact(): void {
    this.impactDataService.addImpact();
  }

  
  onScroll(e: any) {
    console.log('lol');
  }
}

import { ImpactDataService } from './../services/impact/impact-data.service';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.css']
})
export class ImpactMainComponent implements OnInit {

  windowScrolled = false;

  constructor(private impactDataService: ImpactDataService) { }

  ngOnInit(): void {

  }

  addImpact(): void {
    this.impactDataService.addImpact();
  }

  onScroll(event: Event) {
    let scrollDiv = document.getElementById('impact-table-div');
    this.windowScrolled = scrollDiv?.scrollTop !== 0;
  }

  scrollToTop() {
    let scrollDiv = document.getElementById('impact-table-div');
    var scrollOptions = {
      left: 0,
      top: 0,
      behavior: 'smooth'
    }
    //scrollDiv?.scrollTo(scrollOptions); // TODO smooth animation
    scrollDiv?.scroll(0, 0);
  }
}

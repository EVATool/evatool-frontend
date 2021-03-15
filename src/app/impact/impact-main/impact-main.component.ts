import { element } from 'protractor';
import { ImpactDataService } from './../services/impact/impact-data.service';
import { Component, OnInit, Inject, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.css']
})
export class ImpactMainComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;

  windowScrolled = false;

  constructor(private impactDataService: ImpactDataService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.scrollbarRef?.scrolled.subscribe(e => {
      this.windowScrolled = e.target.scrollTop !== 0;
    })
  }

  scrollToTop() {
    const options = { top: 0, duration: 250 };
    this.scrollbarRef.scrollTo(options);
  }

  addImpact(): void {
    this.impactDataService.addImpact();
    const options = { bottom: -50, duration: 250 }; // Why does the method require -50 and does not scroll to bottom with 0?
    this.scrollbarRef.scrollTo(options);
  }
}

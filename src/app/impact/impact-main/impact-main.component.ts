import { LogServiceService } from '../settings/log-service.service';
import { Impact } from './../models/Impact';
import { ImpactDataService } from '../services/impact/impact-data.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.css']
})
export class ImpactMainComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;

  windowScrolled = false;

  constructor(
    private logger: LogServiceService,
    private impactDataService: ImpactDataService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.scrollbarRef?.scrolled.subscribe(e => {
      this.windowScrolled = e.target.scrollTop !== 0;
    });

    this.impactDataService.addedImpact.subscribe((impact: Impact) => {
      const options = { bottom: -100, duration: 250 };
      this.scrollbarRef.scrollTo(options);
    });
  }

  scrollToTop(): void {
    const options = { top: 0, duration: 250 };
    this.scrollbarRef.scrollTo(options);
  }

  addImpact(): void {
    this.impactDataService.createImpact();
  }

  searchTextChange(searchValue: string): void {
    this.logger.info(searchValue);
  }
}

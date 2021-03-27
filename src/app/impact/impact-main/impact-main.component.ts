import { ImpactTableFilterBarComponent } from './../components/impact-table-filter-bar/impact-table-filter-bar.component';
import { ImpactTableFilterEvent } from './../components/impact-table-filter-bar/ImpactTableFilterEvent';
import { ImpactTableComponent } from './../components/impact-table/impact-table.component';
import { MatTable } from '@angular/material/table';
import { SliderFilterSettings } from './../../shared/components/impact-slider/SliderFilterSettings';
import { LogService } from '../../shared/services/log.service';
import { Impact } from './../models/Impact';
import { ImpactDataService } from '../services/impact/impact-data.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-impact-main',
  templateUrl: './impact-main.component.html',
  styleUrls: ['./impact-main.component.scss']
})
export class ImpactMainComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(ImpactTableComponent) table!: ImpactTableComponent;
  @ViewChild(ImpactTableFilterBarComponent) filterBat!: ImpactTableFilterBarComponent;

  windowScrolled = false;

  text = 'text highlight me pls';
  search = 'me p';

  constructor(
    private logger: LogService,
    private impactDataService: ImpactDataService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.scrollbarRef?.scrolled.subscribe(e => {
      this.logger.info(this, 'Event \'scrolled\' received from Scrollbar');
      this.windowScrolled = e.target.scrollTop !== 0;
    });

    this.impactDataService.addedImpact.subscribe((impact: Impact) => {
      this.logger.info(this, 'Event \'addedImpact\' received from ImpactDataService');
      this.filterBat.clickClear();
      const options = { bottom: -100, duration: 250 };
      this.scrollbarRef.scrollTo(options);
    });
  }

  scrollToTop(): void {
    this.logger.info(this, 'Scroll To Top');
    const options = { top: 0, duration: 250 };
    this.scrollbarRef.scrollTo(options);
  }

  addImpact(): void {
    this.logger.info(this, 'Add Impact');
    this.impactDataService.createImpact();
  }

  searchTextChange(searchValue: string): void {
    this.logger.info(this, `Search Bar Text Changed: ${searchValue}`);
    this.search = searchValue;
  }

  filterBarChanged(event: ImpactTableFilterEvent) {
    this.logger.info(this, 'Filter Bar Changed');
    this.search = event.highlightFilter;
    this.table.filterChange(event);
  }
}

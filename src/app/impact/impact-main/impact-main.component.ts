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
    private impactDataService: ImpactDataService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.scrollbarRef?.scrolled.subscribe(e => {
      this.windowScrolled = e.target.scrollTop !== 0;
    });
  }

  scrollToTop(): void {
    const options = { top: 0, duration: 250 };
    this.scrollbarRef.scrollTo(options);
  }

  addImpact(): void {
    this.impactDataService.createImpact();
    const options = { bottom: -100, duration: 250 };
    this.scrollbarRef.scrollTo(options);

    // Test debug
    // console.log(this.impactDataService.impacts[0].value);
    // this.impactDataService.impacts[0].value = 1;
  }

  searchTextChange(searchValue: string): void {
    console.log(searchValue);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-impact-table-filter-bar',
  templateUrl: './impact-table-filter-bar.component.html',
  styleUrls: ['./impact-table-filter-bar.component.scss']
})
export class ImpactTableFilterBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchTextChange($event: string): void {
  }
}

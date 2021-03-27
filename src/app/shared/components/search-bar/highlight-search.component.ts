import { LogService } from '../../services/log.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  templateUrl: './highlight-search.component.html',
  styleUrls: ['./highlight-search.component.scss']
})
export class HighlightSearchComponent implements OnInit {
  @ViewChild(MatInput) textfield!: MatInput;
  @Output() searchTextChanged = new EventEmitter<string>();

  constructor(private logger: LogService) { }

  ngOnInit(): void {

  }

  searchTextChange(event: any): void {
    this.logger.info(this, `Search Bar Text Changed: ${event.target.value}`);
    this.searchTextChanged.emit(event.target.value);
  }

  clearFilter() {
    this.textfield.value = '';
  }
}

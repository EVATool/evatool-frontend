import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-search-bar', // TODO Rename to app-highlight-search
  templateUrl: './highlight-search.component.html',
  styleUrls: ['./highlight-search.component.scss']
})
export class HighlightSearchComponent {
  @ViewChild(MatInput) textfield!: MatInput;
  @Output() highlightTextChanged = new EventEmitter<string>();

  constructor(private logger: LogService) {
  }

  searchTextChange(event: any): void {
    this.logger.info(this, `Search Bar Text Changed: ${event.target.value}`);
    this.highlightTextChanged.emit(event.target.value);
  }

  clearFilter(): void {
    this.textfield.value = '';
    this.highlightTextChanged.emit(this.textfield.value);
  }
}

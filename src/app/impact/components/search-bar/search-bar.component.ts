import { LogService } from '../../settings/log.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTextChanged = new EventEmitter<string>();

  constructor(private logger: LogService) { }

  ngOnInit(): void {

  }

  searchTextChange(event: any): void {
    this.logger.info(`Search Bar Text Changed: ${event.target.value}`);
    this.searchTextChanged.emit(event.target.value);
  }
}

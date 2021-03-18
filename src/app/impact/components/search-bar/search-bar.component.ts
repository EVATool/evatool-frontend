import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTextChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  searchTextChange(event: any) {
    //console.log(event.target.value);
    this.searchTextChanged.emit(event.target.value);
  }
}

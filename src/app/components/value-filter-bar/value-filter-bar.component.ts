import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LogService} from '../../services/log.service';
import {ValueTableFilterEvent} from './ValueTableFilterEvent';
import {ValueDataService} from '../../services/data/value-data.service';

@Component({
  selector: 'app-value-filter-bar',
  templateUrl: './value-filter-bar.component.html',
  styleUrls: ['./value-filter-bar.component.scss']
})
export class ValueFilterBarComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<ValueTableFilterEvent>();

  valueTableFilterEvent: ValueTableFilterEvent;
  suppressChildEvent = false;

  constructor(private logger: LogService,
              public valueDataService: ValueDataService) {
    this.valueTableFilterEvent = ValueTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
  }
}

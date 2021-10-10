import {Component, OnInit, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';
import {ValueFilterBarComponent} from '../value-filter-bar/value-filter-bar.component';
import {ValueTableComponent} from '../value-table/value-table.component';

@Component({
  selector: 'app-value-edit',
  templateUrl: './value-edit.component.html',
  styleUrls: ['./value-edit.component.scss']
})
export class ValueEditComponent implements OnInit {
  @ViewChild(ValueTableComponent) table!: ValueTableComponent;
  @ViewChild(ValueFilterBarComponent) filterBar!: ValueFilterBarComponent;

  constructor(private logger: LogService) {
  }

  ngOnInit(): void {
  }
}

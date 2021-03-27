import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogService} from '../../../shared/services/log.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-column-category-filter',
  templateUrl: './column-category-filter.component.html',
  styleUrls: ['./column-category-filter.component.scss']
})
export class ColumnCategoryFilterComponent implements OnInit {
  @Input() categories: string[] = [];
  @Input() settings: IDropdownSettings = {};
  @Input() name = 'Filter';
  @Output() filterChanged = new EventEmitter<string[]>();

  public filterValues: string[] = [];
  public isVisible = false;
  public defaultSettings: IDropdownSettings = {
    singleSelection: false,
    selectAllText: 'Alle auswählen',
    unSelectAllText: 'Alle abwählen',
    itemsShowLimit: 2,
  };

  constructor(private logger: LogService) {
    if (!this.settings.singleSelection) {
      this.settings = this.defaultSettings;
    }
  }

  ngOnInit(): void {
  }

  updateFilter(): void {
    this.logger.debug(this, 'New Filter for ' + this.name + ': ' + this.filterValues);
    this.filterChanged.emit(this.filterValues);
  }

  clearFilter(): void {
    this.filterValues = [];
    this.filterChanged.emit(this.filterValues);
  }

  equals(objOne: any, objTwo: any): boolean {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
    return false;
  }
}

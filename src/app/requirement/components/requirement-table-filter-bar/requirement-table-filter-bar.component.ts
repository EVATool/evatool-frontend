import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnCategoryFilterComponent} from '../../../shared/components/column-category-filter/column-category-filter.component';
import {ImpactTableFilterEvent} from '../../../impact/components/impact-table-filter-bar/ImpactTableFilterEvent';
// import{RequirementTableFilterEvent} from './RequirementTableFilterEvent';

@Component({
  selector: 'app-requirement-table-filter-bar',
  templateUrl: './requirement-table-filter-bar.component.html',
  styleUrls: ['./requirement-table-filter-bar.component.scss']
})
export class RequirementTableFilterBarComponent implements OnInit {
  @ViewChild('variantsFilter') variantsFilter!: ColumnCategoryFilterComponent;
  variantsNames: string[] = [];

  // requirementTableFilterEvent!: RequirementTableFilterEvent;
  constructor() { }

  ngOnInit(): void {
  }

  // variantsFilterChanged(event: string[]): void {
  //   this.requirementTableFilterEvent.stakeholderFilter = event;
  //   if (!this.suppressChildEvent) {
  //     this.filterChanged.emit(this.impactTableFilterEvent);
  //   }
  // }

}

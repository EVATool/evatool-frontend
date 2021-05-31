import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-impacted-filter',
  templateUrl: './impacted-filter.component.html',
  styleUrls: ['./impacted-filter.component.scss']
})
export class ImpactedFilterComponent {

  @Output() filterChanged = new EventEmitter<number>();

  impacted = 0;

  impactedFilterChange(event: number | null): void {
    this.filterChanged.emit(this.impacted);
  }
}

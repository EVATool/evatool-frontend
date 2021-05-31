import {Component, EventEmitter, Output} from '@angular/core';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-impacted-filter',
  templateUrl: './impacted-filter.component.html',
  styleUrls: ['./impacted-filter.component.scss']
})
export class ImpactedFilterComponent {

  @Output() filterChanged = new EventEmitter<number>();

  impacted: number | null = 0;

  constructor(private logger: LogService) {
  }

  impactedFilterChange(event: number | null): void {
    this.filterChanged.emit(event == null ? -2 : event);
  }

  clearFilter(): void {
    this.impacted = -2;
    this.filterChanged.emit(this.impacted);
  }
}

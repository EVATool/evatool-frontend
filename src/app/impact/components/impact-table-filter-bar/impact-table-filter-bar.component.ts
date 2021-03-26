import { ColumnSliderFilterComponent } from './../column-slider-filter/column-slider-filter.component';
import { ImpactTableFilterEvent } from './ImpactTableFilterEvent';
import { LogService } from '../../../shared/services/log.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SliderFilterSettings } from 'src/app/shared/components/impact-slider/SliderFilterSettings';

@Component({
  selector: 'app-impact-table-filter-bar',
  templateUrl: './impact-table-filter-bar.component.html',
  styleUrls: ['./impact-table-filter-bar.component.scss']
})
export class ImpactTableFilterBarComponent implements OnInit {
  @ViewChild(ColumnSliderFilterComponent) sliderFilter!: ColumnSliderFilterComponent;
  @Output() filterChanged = new EventEmitter<ImpactTableFilterEvent>();

  impactTableFilterEvent: ImpactTableFilterEvent;
  suppressChildEvent: boolean = false;

  constructor(private logger: LogService) {
    this.impactTableFilterEvent = ImpactTableFilterEvent.getDefault();
  }

  ngOnInit(): void {

  }

  valueFilterChanged(event: SliderFilterSettings): void {
    this.logger.info(this, 'Slider Filter Changed');
    this.impactTableFilterEvent.valueFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  searchTextChange($event: string): void {
  }

  clickClear() {
    this.logger.info(this, 'Clearing Filtering');
    this.suppressChildEvent = true;

    // Clear all children and suspent event firing in method above.
    this.sliderFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }
}

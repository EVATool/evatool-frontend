import { ImpactTableFilterEvent } from './ImpactTableFilterEvent';
import { LogService } from '../../../shared/services/log.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SliderFilterSettings } from 'src/app/shared/components/impact-slider/SliderFilterSettings';

@Component({
  selector: 'app-impact-table-filter-bar',
  templateUrl: './impact-table-filter-bar.component.html',
  styleUrls: ['./impact-table-filter-bar.component.scss']
})
export class ImpactTableFilterBarComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<ImpactTableFilterEvent>();

  impactTableFilterEvent: ImpactTableFilterEvent;

  constructor(private logger: LogService) {
    this.impactTableFilterEvent = ImpactTableFilterEvent.getDefault();
  }

  ngOnInit(): void {

  }

  valueFilterChanged(event: SliderFilterSettings): void {
    this.logger.info(this, 'Slider Filter Changed');
    this.impactTableFilterEvent.valueFilter = event;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }


  searchTextChange($event: string): void {
  }
}

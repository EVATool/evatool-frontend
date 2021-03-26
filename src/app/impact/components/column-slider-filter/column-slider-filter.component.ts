import { LogService } from '../../../shared/services/log.service';
import { SliderFilterSettings, SliderFilterType, SliderFilterBoundary } from '../../../shared/components/impact-slider/SliderFilterSettings';
import { MatSliderChange } from '@angular/material/slider';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { ImpactSliderComponent } from 'src/app/shared/components/impact-slider/impact-slider.component';

@Component({
  selector: 'app-column-slider-filter',
  templateUrl: './column-slider-filter.component.html',
  styleUrls: ['./column-slider-filter.component.scss']
})
export class ColumnSliderFilterComponent implements OnInit, AfterViewInit {
  @ViewChild(ImpactSliderComponent) slider!: ImpactSliderComponent;
  @Input() name = '';
  @Output() filterChanged = new EventEmitter<SliderFilterSettings>();

  filterType: SliderFilterType = 0;
  filterBoundary: SliderFilterBoundary = 0;

  public isVisible = false;

  constructor(private logger: LogService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  sliderFilterValueChanged(event: MatSliderChange) {
    this.logger.info(this, 'Filter Slider Changed: ' + event.value);
    this.filteringChanged();
  }

  filteringChanged(): void {
    this.logger.info(this, 'Filtering Changed');
    this.slider.sliderFilterSettings.sliderFilterType = this.filterType;
    this.slider.sliderFilterSettings.sliderFilterBoundary = this.filterBoundary;
    this.slider.sliderFilterSettings.sliderFilterValues = [this.slider.value, this.slider.valueSecond];
    this.slider.invalidate();
    this.filterChanged.emit(this.slider.sliderFilterSettings);
  }

  clickClear() {
    this.logger.info(this, 'Clearing Filtering');
    this.filterType = SliderFilterType.LessThan;
    this.filterBoundary = SliderFilterBoundary.Include;
    this.slider.value = 1;
    this.filteringChanged();
  }
}

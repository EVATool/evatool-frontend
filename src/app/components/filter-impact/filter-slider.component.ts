import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ImpactSliderComponent} from '../impact-slider/impact-slider.component';
import {SliderFilterBoundary, SliderFilterSettings, SliderFilterType} from '../impact-slider/SliderFilterSettings';
import {MatSliderChange} from '@angular/material/slider';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-filter-impact',
  templateUrl: './filter-slider.component.html',
  styleUrls: ['./filter-slider.component.scss']
})
export class FilterSliderComponent {
  @ViewChild(ImpactSliderComponent) slider!: ImpactSliderComponent;
  @Input() name = '';
  @Output() filterChanged = new EventEmitter<SliderFilterSettings>();

  filterType: SliderFilterType = 2;
  filterBoundary: SliderFilterBoundary = 0;

  public isVisible = false;

  constructor(private logger: LogService) {
  }

  sliderFilterValueChanged(event: MatSliderChange): void {
    this.logger.debug(this, 'Filter Slider Changed: ' + event.value);
    this.filteringChanged();
  }

  filteringChanged(): void {
    this.logger.debug(this, 'Filtering Changed');
    this.slider.sliderFilterSettings.sliderFilterType = this.filterType;
    this.slider.sliderFilterSettings.sliderFilterBoundary = this.filterBoundary;
    this.slider.sliderFilterSettings.sliderFilterValues = [this.slider.value, this.slider.valueSecond];
    this.slider.invalidate();
    this.filterChanged.emit(this.slider.sliderFilterSettings);
  }

  public clearFilter(): void {
    this.logger.debug(this, 'Clearing Filtering');
    this.filterType = SliderFilterType.Between;
    this.filterBoundary = SliderFilterBoundary.Include;
    this.slider.value = 1;
    this.slider.valueSecond = -1;
    this.filteringChanged();
  }
}

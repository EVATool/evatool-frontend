import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ImpactSliderComponent} from "../impact-slider/impact-slider.component";
import {SliderFilterBoundary, SliderFilterSettings, SliderFilterType} from "../impact-slider/SliderFilterSettings";
import {MatSliderChange} from "@angular/material/slider";
import {LogService} from "../../services/log.service";

@Component({
  selector: 'app-column-slider-filter', // TODO Rename
  templateUrl: './column-slider-filter.component.html',
  styleUrls: ['./column-slider-filter.component.scss']
})
export class ColumnSliderFilterComponent implements OnInit, AfterViewInit {
  @ViewChild(ImpactSliderComponent) slider!: ImpactSliderComponent;
  @Input() name = '';
  @Output() filterChanged = new EventEmitter<SliderFilterSettings>();

  filterType: SliderFilterType = 2;
  filterBoundary: SliderFilterBoundary = 0;

  public isVisible = false;

  constructor(private logger: LogService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  sliderFilterValueChanged(event: MatSliderChange): void {
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

  public clearFilter(): void {
    this.logger.info(this, 'Clearing Filtering');
    this.filterType = SliderFilterType.Between;
    this.filterBoundary = SliderFilterBoundary.Include;
    this.slider.value = 1;
    this.slider.valueSecond = -1;
    this.filteringChanged();
  }
}

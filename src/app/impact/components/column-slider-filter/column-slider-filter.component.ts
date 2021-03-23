import { ImpactSliderComponent } from './../impact-slider/impact-slider.component';
import { SliderFilterChange, SliderFilterType, SliderFilterBoundary } from './SliderFilterChange';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSliderChange } from '@angular/material/slider';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-column-slider-filter',
  templateUrl: './column-slider-filter.component.html',
  styleUrls: ['./column-slider-filter.component.css']
})
export class ColumnSliderFilterComponent implements OnInit {
  @ViewChild(ImpactSliderComponent) slider!: ImpactSliderComponent;

  @Input() name = '';

  @Output() filterChanged = new EventEmitter<SliderFilterChange>();


  useBetween = true;
  useLessThan = true;
  useEquals = true;
  public isVisible = false;

  constructor() { }

  ngOnInit(): void {

  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  setInvisible(): void {
    this.isVisible = false;
  }

  sliderFilterValueChanged(event: MatSliderChange) {
    console.log("Filter Slider Changed: " + event.value);
    const sliderFilterChange = new SliderFilterChange(
      SliderFilterType.LessThan,
      SliderFilterBoundary.Include,
      [this.slider.value]);
    this.filterChanged.emit(sliderFilterChange);
  }

  filterTypeChanged(): void {
    console.log('New slider filter configuration: ' + this.useBetween + ", " + this.useLessThan + ", " + this.useEquals);
  }
}

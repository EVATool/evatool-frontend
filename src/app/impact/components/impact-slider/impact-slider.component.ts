import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-impact-slider',
  templateUrl: './impact-slider.component.html',
  styleUrls: ['./impact-slider.component.css']
})
export class ImpactSliderComponent implements OnInit, AfterViewInit {
  @Input() value!: number;
  @Output() valueChange = new EventEmitter<number | null>();
  @ViewChild(MatSlider) slider!: MatSlider;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  sliderValueChanged(event: MatSliderChange): void {
    this.valueChange.emit(event.value);
  }
}

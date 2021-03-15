import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { Impact } from './../../models/Impact';
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
    //console.log(this.value);
  }

  ngAfterViewInit(): void {

  }

  sliderValueChanged(event: MatSliderChange) {
    this.valueChange.emit(event.value);
  }
}

import { Stakeholder } from './../../models/Stakeholder';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-impact-slider',
  templateUrl: './impact-slider.component.html',
  styleUrls: ['./impact-slider.component.css']
})
export class ImpactSliderComponent implements OnInit, AfterViewInit {
  @Input() value!: number;
  @Input() deadzone: number = 0.0;
  @Output() sliderValueChange = new EventEmitter<MatSliderChange>();
  @ViewChild(MatSlider) slider!: MatSlider;
  @ViewChild('goal') goalBar!: ElementRef;
  @ViewChild('risk') riskBar!: ElementRef;
  @ViewChild('thumb') thumb!: ElementRef;
  @ViewChild('matSlider') matSlider!: ElementRef;

  legalValue!: number;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.legalValue = this.value;
    this.drawSlider();
  }

  sliderValueChanged(event: MatSliderChange): void {
    if (event.value !== null) {
      if (-this.deadzone < event.value && event.value < this.deadzone && event.value !== 0) {
        console.log('Slider Deadzone Around Zero');
      } else {
        console.log(`Slider Value Changed: ${event.value}`);
        this.value = event.value;
        this.legalValue = event.value;
        this.drawSlider();
      }
    }
  }

  sliderValueChangedFinal(event: MatSliderChange): void {
    this.slider.value = this.legalValue
    event.value = this.legalValue;
    this.sliderValueChange.emit(event);
  }

  drawSlider(): void {
    this.riskBar.nativeElement.style.width = Math.max(-this.value * 50, 0) + '%';
    this.goalBar.nativeElement.style.width = Math.max(this.value * 50, 0) + '%';
    const map = (mapValue: number, x1: number, y1: number, x2: number, y2: number) => (mapValue - x1) * (y2 - x2) / (y1 - x1) + x2;
    const val = map(this.value, -1, 1, -3, 97);
    this.thumb.nativeElement.style.left = val + '%';
  }
}

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
  @Output() valueChange = new EventEmitter<number | null>();
  @ViewChild(MatSlider) slider!: MatSlider;
  @ViewChild('goal') goalBar!: ElementRef;
  @ViewChild('risk') riskBar!: ElementRef;
  @ViewChild('thumb') thumb!: ElementRef;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.drawSlider(this.value);
  }

  sliderValueChanged(event: MatSliderChange): void {
    console.log(`Slider Value Changed: ${event.value}`);
    this.valueChange.emit(event.value);
    if (event.value !== null) {
      this.drawSlider(event.value);
    }
  }

  drawSlider(value: number): void {
    this.riskBar.nativeElement.style.width = Math.max(-value * 50, 0) + "%";
    this.goalBar.nativeElement.style.width = Math.max(value * 50, 0) + "%";
    const map = (value: number, x1: number, y1: number, x2: number, y2: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
    const val = map(value, -1, 1, 0, 94);
    this.thumb.nativeElement.style.left = val + "%";
  }
}

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

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.slider.value);
    this.drawSlider();
  }

  sliderValueChanged(event: MatSliderChange): void {
    console.log(event.value);
    this.valueChange.emit(event.value);
    if (event.value !== null) {
      this.drawSlider();
    }
  }

  drawSlider(): void {
    this.riskBar.nativeElement.style.width = Math.max(-this.value * 50, 0) + "%";
    this.goalBar.nativeElement.style.width = Math.max(this.value * 50, 0) + "%";
  }
}

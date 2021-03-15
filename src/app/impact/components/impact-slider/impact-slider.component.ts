import { Impact } from './../../models/Impact';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-impact-slider',
  templateUrl: './impact-slider.component.html',
  styleUrls: ['./impact-slider.component.css']
})
export class ImpactSliderComponent implements OnInit {
  @Input() value!: string;

  readonly min = -1.0;
  readonly max = 1.0;
  readonly step = 0.1;

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.value);
  }
}

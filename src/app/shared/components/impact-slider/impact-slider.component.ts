import {SliderFilterSettings, SliderFilterType, SliderFilterBoundary} from './SliderFilterSettings';
import {MatSlider, MatSliderChange} from '@angular/material/slider';
import {Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, ElementRef} from '@angular/core';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-impact-slider',
  templateUrl: './impact-slider.component.html',
  styleUrls: ['./impact-slider.component.scss']
})
export class ImpactSliderComponent implements OnInit, AfterViewInit {
  @Input() value: number = 1;
  @Input() valueSecond: number = -1;
  @Input() deadzone: number = 0.0;
  @Input() isFilter: boolean = false;

  @Input() isRisk: boolean = false;
  @Input() isGoal: boolean = false;

  @Output() sliderValueChange = new EventEmitter<MatSliderChange>();
  @ViewChild(MatSlider) slider!: MatSlider;
  @ViewChild('goal') goalBar!: ElementRef;
  @ViewChild('risk') riskBar!: ElementRef;
  @ViewChild('thumb') thumb!: ElementRef;
  @ViewChild('thumbSecond') thumbSecond!: ElementRef;

  legalValue!: number;
  sliderFilterSettings: SliderFilterSettings;

  constructor(private logger: LogService) {
    this.sliderFilterSettings = SliderFilterSettings.getDefault();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.legalValue = this.value;
    this.drawSlider();
  }

  onInit(): void {

  }

  invalidate(): void {
    this.logger.info(this, 'Invalidating');
    this.drawSlider();
  }

  sliderValueChanged(event: MatSliderChange): void {
    if (event.value !== null) {
      if (-this.deadzone < event.value && event.value < this.deadzone && event.value !== 0) {
        this.logger.info(this, 'Slider Deadzone Around Zero');
      } else if (this.isRisk && event.value > 0) {
        this.logger.info(this, 'Risk Slider Cropping Value');
      } else if (this.isGoal && event.value < 0) {
        this.logger.info(this, 'Goal Slider Cropping Value');
      } else {
        this.logger.info(this, `Slider Value Changed: ${event.value}`);
        this.value = event.value;
        this.legalValue = event.value;
        this.drawSlider();
      }
    }
  }

  sliderSecondValueChanged(event: MatSliderChange): void {
    if (event.value !== null) {
      if (-this.deadzone < event.value && event.value < this.deadzone && event.value !== 0) {
        this.logger.info(this, 'Slider Deadzone Around Zero');
      } else {
        this.logger.info(this, `Slider Value Changed: ${event.value}`);
        this.valueSecond = event.value;
        this.drawSlider();
      }
    }
  }

  sliderValueChangedFinal(event: MatSliderChange): void {
    this.logger.info(this, `Slider Value Changed Final: ${this.legalValue}`);
    this.slider.value = this.legalValue;
    event.value = this.legalValue;
    this.sliderValueChange.emit(event);
  }

  drawSlider(): void {
    this.logger.info(this, 'Draw Slider');

    // Default bar settings.
    this.goalBar.nativeElement.style.display = 'block';
    this.goalBar.nativeElement.style.position = 'absolute';
    this.goalBar.nativeElement.style.width = '50%';
    this.goalBar.nativeElement.style.height = '20px';
    this.goalBar.nativeElement.style.marginLeft = '50%';

    this.riskBar.nativeElement.style.width = '50%';
    this.riskBar.nativeElement.style.height = '20px';
    this.riskBar.nativeElement.style.float = 'right';
    this.riskBar.nativeElement.style.marginRight = '50%';

    // Default thumb settings.
    const thumbs = [this.thumb, this.thumbSecond];
    thumbs.forEach((thumb: any) => {
      thumb.nativeElement.style.position = 'absolute';
      thumb.nativeElement.style.backgroundColor = 'gray';
      thumb.nativeElement.style.height = '20px';
      thumb.nativeElement.style.width = '11px';
      thumb.nativeElement.style.float = 'left';
      if (this.isFilter)
        thumb.nativeElement.style.opacity = '1';
      else
        thumb.nativeElement.style.transition = 'none';
    });

    if (this.isFilter) {
      switch (this.sliderFilterSettings.sliderFilterType) {
        case SliderFilterType.GreaterThan:
          this.riskBar.nativeElement.style.width = '0%';

          this.goalBar.nativeElement.style.backgroundColor = 'orange';
          this.goalBar.nativeElement.style.float = 'right';
          this.goalBar.nativeElement.style.position = 'relative';
          this.goalBar.nativeElement.style.width = (50 - this.value * 50) + '%';

          this.drawThumb(this.value, this.thumb);
          break;

        case SliderFilterType.LessThan:
          this.goalBar.nativeElement.style.width = '0%';

          this.riskBar.nativeElement.style.backgroundColor = 'orange';
          this.riskBar.nativeElement.style.float = 'left';
          this.riskBar.nativeElement.style.position = 'relative';
          this.riskBar.nativeElement.style.width = (50 + this.value * 50) + '%';

          this.drawThumb(this.value, this.thumb);
          break;

        case SliderFilterType.Equality:
          this.goalBar.nativeElement.style.width = '0%';
          this.riskBar.nativeElement.style.width = '0%';

          this.drawThumb(this.value, this.thumb);
          break;

        case SliderFilterType.Between:
          const smallerValue = Math.min(this.value, this.valueSecond);
          const biggerValue = Math.max(this.value, this.valueSecond);
          this.riskBar.nativeElement.style.width = '0%';

          if (smallerValue != biggerValue) {
            this.goalBar.nativeElement.style.backgroundColor = 'orange';
            this.goalBar.nativeElement.style.marginLeft = (50 + smallerValue * 50) + '%';
            this.goalBar.nativeElement.style.width = ((biggerValue - smallerValue) * 50) + '%';
          } else {
            this.goalBar.nativeElement.style.width = '0%';
          }

          this.drawThumb(this.value, this.thumb);
          this.drawThumb(this.valueSecond, this.thumbSecond);
          break;

        case SliderFilterType.Off:
          this.goalBar.nativeElement.style.width = '0%';
          this.riskBar.nativeElement.style.width = '0%';

          this.drawThumb(this.value, this.thumb);
          break;

        default:
          this.logger.warn(this, 'Unhandled Filter Type');
          break;
      }

      switch (this.sliderFilterSettings.sliderFilterBoundary) {
        case SliderFilterBoundary.Include:
          thumbs.forEach((thumb: any) => {
            thumb.nativeElement.style.backgroundColor = '#1569C7';
          });
          break;

        case SliderFilterBoundary.Exclude:
          thumbs.forEach((thumb: any) => {
            thumb.nativeElement.style.backgroundColor = 'orangered';
          });
          break;

        default:
          this.logger.warn(this, 'Unhandled Filter Boundary Type');
          break;
      }
    } else {
      if (this.isRisk) {
        this.riskBar.nativeElement.style.float = 'right';
        this.riskBar.nativeElement.style.position = 'relative';

        this.goalBar.nativeElement.style.float = 'left';
        this.goalBar.nativeElement.style.position = 'absolute';

        this.riskBar.nativeElement.style.backgroundColor = 'red';
        this.goalBar.nativeElement.style.backgroundColor = 'black';

        this.riskBar.nativeElement.style.width = Math.max(-this.value * 50, 0) + '%';
        this.goalBar.nativeElement.style.width = '50%';

        this.drawThumb(this.value, this.thumb);
      } else if (this.isGoal) {
        this.riskBar.nativeElement.style.float = 'right';
        this.riskBar.nativeElement.style.position = 'relative';

        this.goalBar.nativeElement.style.float = 'left';
        this.goalBar.nativeElement.style.position = 'absolute';

        this.riskBar.nativeElement.style.backgroundColor = 'black';
        this.goalBar.nativeElement.style.backgroundColor = 'green';

        this.riskBar.nativeElement.style.width = '50%';
        this.goalBar.nativeElement.style.width = Math.max(this.value * 50, 0) + '%';

        this.drawThumb(this.value, this.thumb);
      } else {
        this.riskBar.nativeElement.style.float = 'right';
        this.riskBar.nativeElement.style.position = 'relative';

        this.goalBar.nativeElement.style.float = 'left';
        this.goalBar.nativeElement.style.position = 'absolute';

        this.riskBar.nativeElement.style.backgroundColor = 'red';
        this.goalBar.nativeElement.style.backgroundColor = 'green';

        this.riskBar.nativeElement.style.width = Math.max(-this.value * 50, 0) + '%';
        this.goalBar.nativeElement.style.width = Math.max(this.value * 50, 0) + '%';

        this.drawThumb(this.value, this.thumb);
      }
    }
  }

  drawThumb(value: number, thumb: any) {
    const map = (mapValue: number, x1: number, y1: number, x2: number, y2: number) => (mapValue - x1) * (y2 - x2) / (y1 - x1) + x2;
    const val = map(value, -1, 1, 1, 99);
    thumb.nativeElement.style.left = 'calc(' + val + '% - 5px)';
  }

  mouseEnter() {
    this.logger.info(this, 'Mouse Enter Event')
    if (!this.isFilter) {
      this.thumb.nativeElement.style.transition = '250ms ease-out 100ms';
      this.thumb.nativeElement.style.opacity = 1.0;
    }
  }

  mouseLeave() {
    this.logger.info(this, 'Mouse Leave Event')
    if (!this.isFilter) {
      this.thumb.nativeElement.style.transition = '250ms ease-out 100ms';
      this.thumb.nativeElement.style.opacity = 0.0;
    }
  }
}

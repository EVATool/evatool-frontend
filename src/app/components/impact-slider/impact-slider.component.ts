import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {SliderFilterBoundary, SliderFilterSettings, SliderFilterType} from './SliderFilterSettings';
import {MatSlider, MatSliderChange} from '@angular/material/slider';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-impact-slider',
  templateUrl: './impact-slider.component.html',
  styleUrls: ['./impact-slider.component.scss']
})
export class ImpactSliderComponent implements AfterViewInit {
  @Input() value = 1;
  @Output() valueChange = new EventEmitter<number>();

  @Input() valueSecond = -1;
  @Input() deadZone = 0.0;
  @Input() isFilter = false;
  @Input() minvalue = -1.0;
  @Input() maxvalue = 1.0;

  @Input() isRisk = false;
  @Input() isGoal = false;

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

  ngAfterViewInit(): void {
    this.legalValue = this.value;
    this.drawSlider();
  }

  invalidate(): void {
    this.logger.trace(this, 'Invalidating');
    this.drawSlider();
  }

  sliderValueChanged(event: MatSliderChange): void {
    if (event.value !== null) {
      if (-this.deadZone < event.value && event.value < this.deadZone && event.value !== 0) {
        this.logger.debug(this, 'Slider Deadzone Around Zero');
      } else if (this.isRisk && event.value > 0) {
        this.logger.debug(this, 'Risk Slider Cropping Value');
      } else if (this.isGoal && event.value < 0) {
        this.logger.debug(this, 'Goal Slider Cropping Value');
      } else if (this.minvalue > event.value) {
        this.logger.debug(this, 'Below min Cropping Value');
      } else if (this.maxvalue < event.value) {
        this.logger.debug(this, 'Above max Cropping Value');
      } else {
        this.logger.debug(this, `Slider Value Changed: ${event.value}`);
        this.value = event.value;
        this.valueChange.emit(this.value);
        this.legalValue = event.value;
        this.drawSlider();
      }
    }
  }

  sliderSecondValueChanged(event: MatSliderChange): void {
    if (event.value !== null) {
      if (-this.deadZone < event.value && event.value < this.deadZone && event.value !== 0) {
        this.logger.debug(this, 'Slider Deadzone Around Zero');
      } else {
        this.logger.debug(this, `Slider Value Changed: ${event.value}`);
        this.valueSecond = event.value;
        this.drawSlider();
      }
    }
  }

  sliderValueChangedFinal(event: MatSliderChange): void {
    this.logger.debug(this, `Slider Value Changed Final: ${this.legalValue}`);
    this.slider.value = this.legalValue;
    event.value = this.legalValue;
    this.sliderValueChange.emit(event);
  }

  drawSlider(): void {
    this.logger.trace(this, 'Draw Slider');

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
      if (this.isFilter) {
        thumb.nativeElement.style.opacity = '1';
      } else {
        thumb.nativeElement.style.transition = 'none';
      }
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

          if (smallerValue !== biggerValue) {
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
        this.goalBar.nativeElement.style.backgroundColor = 'darkgrey';

        this.riskBar.nativeElement.style.width = Math.max(-this.value * 50, 0) + '%';
        this.goalBar.nativeElement.style.width = '50%';

        this.drawThumb(this.value, this.thumb);
      } else if (this.isGoal) {
        this.riskBar.nativeElement.style.float = 'right';
        this.riskBar.nativeElement.style.position = 'relative';

        this.goalBar.nativeElement.style.float = 'left';
        this.goalBar.nativeElement.style.position = 'absolute';

        this.riskBar.nativeElement.style.backgroundColor = 'darkgrey';
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

  drawThumb(value: number, thumb: any): void {
    const map = (mapValue: number, x1: number, y1: number, x2: number, y2: number) => (mapValue - x1) * (y2 - x2) / (y1 - x1) + x2;
    const val = map(value, -1, 1, 1, 99);
    thumb.nativeElement.style.left = 'calc(' + val + '% - 5px)';
  }

  mouseEnter(): void {
    this.logger.trace(this, 'Mouse Enter Event');
    if (!this.isFilter) {
      this.thumb.nativeElement.style.transition = '250ms ease-out 100ms';
      this.thumb.nativeElement.style.opacity = 1.0;
    }
  }

  mouseLeave(): void {
    this.logger.trace(this, 'Mouse Leave Event');
    if (!this.isFilter) {
      this.thumb.nativeElement.style.transition = '250ms ease-out 100ms';
      this.thumb.nativeElement.style.opacity = 0.0;
    }
  }
}

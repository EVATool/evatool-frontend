import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';

export class RequirementTableFilterEvent {

  variant: string[];
  value: string[];
  impact: string[];
  merit: SliderFilterSettings;

  constructor(
    variant: string[],
    value: string[],
    impact: string[],
    merit: SliderFilterSettings) {
    this.variant = variant;
    this.value = value;
    this.impact = impact;
    this.merit = merit;
  }

  static getDefault(): RequirementTableFilterEvent {
    return new RequirementTableFilterEvent([], [], [], SliderFilterSettings.getDefault());
  }
}

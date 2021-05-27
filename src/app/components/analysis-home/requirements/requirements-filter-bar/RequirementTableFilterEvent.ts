import {SliderFilterSettings} from '../../../impact-slider/SliderFilterSettings';

export class RequirementTableFilterEvent {

  variant: string[];
  value: string[];
  impact: string[];
  merit: SliderFilterSettings;
  highlight: string;

  constructor(
    variant: string[],
    value: string[],
    impact: string[],
    merit: SliderFilterSettings,
    highlight: string) {
    this.variant = variant;
    this.value = value;
    this.impact = impact;
    this.merit = merit;
    this.highlight = highlight;
  }

  static getDefault(): RequirementTableFilterEvent {
    return new RequirementTableFilterEvent([], [], [], SliderFilterSettings.getDefault(), '');
  }
}

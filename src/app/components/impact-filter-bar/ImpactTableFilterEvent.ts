import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';

export class ImpactTableFilterEvent {

  stakeholder: string[];
  value: string[];
  merit: SliderFilterSettings;

  constructor(
    stakeholder: string[],
    value: string[],
    merit: SliderFilterSettings) {
    this.stakeholder = stakeholder;
    this.value = value;
    this.merit = merit;
  }

  static getDefault(): ImpactTableFilterEvent {
    return new ImpactTableFilterEvent([], [], SliderFilterSettings.getDefault());
  }
}

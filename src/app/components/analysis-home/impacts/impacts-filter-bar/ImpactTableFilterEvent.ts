import {SliderFilterSettings} from "../../../impact-slider/SliderFilterSettings";

export class ImpactTableFilterEvent {

  stakeholder: string[];
  value: string[];
  merit: SliderFilterSettings;
  highlight: string;

  constructor(
    stakeholder: string[],
    value: string[],
    merit: SliderFilterSettings,
    highlight: string) {
    this.stakeholder = stakeholder;
    this.value = value;
    this.merit = merit;
    this.highlight = highlight;
  }

  static getDefault(): ImpactTableFilterEvent {
    return new ImpactTableFilterEvent([], [], SliderFilterSettings.getDefault(), '');
  }
}

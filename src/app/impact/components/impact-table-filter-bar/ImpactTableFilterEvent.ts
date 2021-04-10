import { SliderFilterSettings } from '../../../shared/components/impact-slider/SliderFilterSettings';
export class ImpactTableFilterEvent {

  stakeholderFilter: string[];
  valuesFilter: string[];
  valueFilter: SliderFilterSettings;
  highlightFilter: string;

  constructor(
    stakeholderFilter: string[],
    valuesFilter: string[],
    valueFilter: SliderFilterSettings,
    highlightFilter: string) {
    this.stakeholderFilter = stakeholderFilter;
    this.valuesFilter = valuesFilter;
    this.valueFilter = valueFilter;
    this.highlightFilter = highlightFilter;
  }

  static getDefault(): ImpactTableFilterEvent {
    return new ImpactTableFilterEvent([], [], SliderFilterSettings.getDefault(), '');
  }
}

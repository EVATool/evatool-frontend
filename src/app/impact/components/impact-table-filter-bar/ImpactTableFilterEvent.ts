import { SliderFilterSettings } from '../../../shared/components/impact-slider/SliderFilterSettings';
export class ImpactTableFilterEvent {

  stakeholderFilter: string[];
  dimensionFilter: string[];
  valueFilter: SliderFilterSettings;
  highlightFilter: string;

  constructor(
    stakeholderFilter: string[],
    dimensionFilter: string[],
    valueFilter: SliderFilterSettings,
    highlightFilter: string) {
    this.stakeholderFilter = stakeholderFilter;
    this.dimensionFilter = dimensionFilter;
    this.valueFilter = valueFilter;
    this.highlightFilter = highlightFilter;
  }

  static getDefault(): ImpactTableFilterEvent {
    return new ImpactTableFilterEvent([], [], SliderFilterSettings.getDefault(), '');
  }
}

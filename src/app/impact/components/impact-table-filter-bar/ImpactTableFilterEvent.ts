import { SliderFilterSettings } from '../../../shared/components/impact-slider/SliderFilterSettings';
export class ImpactTableFilterEvent {

  stakeholderFilter: string[];
  dimensionFilter: string[];
  valueFilter: SliderFilterSettings;

  constructor(
    stakeholderFilter: string[],
    dimensionFilter: string[],
    valueFilter: SliderFilterSettings) {
    this.stakeholderFilter = stakeholderFilter;
    this.dimensionFilter = dimensionFilter;
    this.valueFilter = valueFilter;
  }

  static getDefault(): ImpactTableFilterEvent {
    return new ImpactTableFilterEvent([], [], SliderFilterSettings.getDefault());
  }
}

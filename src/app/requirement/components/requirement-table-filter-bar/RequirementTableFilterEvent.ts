import {SliderFilterSettings} from '../../../shared/components/impact-slider/SliderFilterSettings';

export class RequirementTableFilterEvent {
  variantsFilter: string[];
  valueSystemFilter: string[];
  valueFilter: SliderFilterSettings;
  highlightFilter: string;
  constructor(
    variantsFilter: string[],
    valueSystemFilter: string[],
    valueFilter: SliderFilterSettings,
    highlightFilter: string) {
    this.valueSystemFilter = valueSystemFilter;
    this.variantsFilter = variantsFilter;
    this.valueFilter = valueFilter;
    this.highlightFilter = highlightFilter;
  }
  static getDefault(): RequirementTableFilterEvent {
    return new RequirementTableFilterEvent([], [], SliderFilterSettings.getDefault(),'');
  }
}

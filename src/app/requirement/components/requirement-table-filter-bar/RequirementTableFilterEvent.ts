import { SliderFilterSettings } from '../../../shared/components/impact-slider/SliderFilterSettings';
export class RequirementTableFilterEvent {
  variantsFilter: string[];
  valueSystemFilter: string[];
  valueFilter: SliderFilterSettings;
  constructor(
    variantsFilter: string[],
    valueSystemFilter: string[],
    valueFilter: SliderFilterSettings) {
    this.valueSystemFilter = valueSystemFilter;
    this.variantsFilter = variantsFilter;
    this.valueFilter = valueFilter;
  }
  static getDefault(): RequirementTableFilterEvent {
    return new RequirementTableFilterEvent([], [], SliderFilterSettings.getDefault());
  }
}

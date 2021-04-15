import {SliderFilterSettings} from '../../../shared/components/impact-slider/SliderFilterSettings';

export class RequirementTableFilterEvent {
  variantsFilter!: string[];
  valueSystemFilter!: string[];
  valueFilter!: SliderFilterSettings;
  constructor() {
  }
}

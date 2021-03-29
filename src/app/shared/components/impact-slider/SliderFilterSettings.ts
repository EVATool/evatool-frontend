export enum SliderFilterType {
  LessThan = 0,
  GreaterThan = 1,
  Bewtween = 2,
  Equality = 3,
  Off = 4
}

export enum SliderFilterBoundary {
  Include = 0,
  Exclude = 1
}

export class SliderFilterSettings {

  sliderFilterType: SliderFilterType;
  sliderFilterBoundary: SliderFilterBoundary;
  sliderFilterValues;

  constructor(
    sliderFilterTypes: SliderFilterType,
    sliderFilterBoundary: SliderFilterBoundary,
    sliderFilterValues: number[]) {
    this.sliderFilterType = sliderFilterTypes;
    this.sliderFilterBoundary = sliderFilterBoundary;
    this.sliderFilterValues = sliderFilterValues;
  }

  static getDefault(): SliderFilterSettings {
    return new SliderFilterSettings(0, 0, [1, -1]);
  }
}
export enum SliderFilterType {
  LessThan,
  GreaterThan,
  Bewtween,
  Equality,
  Off
}

export enum SliderFilterBoundary {
  Include,
  Exclude
}

export class SliderFilterChange {

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
}
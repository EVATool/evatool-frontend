export enum SliderFilterType {
  LessThan = 0,
  GreaterThan = 1,
  Between = 2,
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
    return new SliderFilterSettings(2, 0, [1, -1]);
  }

  static filter(settings: any, value: number): boolean {
    let filtered: boolean;

    switch (settings.sliderFilterType) {
      case SliderFilterType.Off:
        filtered = true;
        break;

      case SliderFilterType.LessThan:
        if (settings.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
          filtered = value < settings.sliderFilterValues[0];
        } else {
          filtered = value <= settings.sliderFilterValues[0];
        }
        break;

      case SliderFilterType.GreaterThan:
        if (settings.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
          filtered = value > settings.sliderFilterValues[0];
        } else {
          filtered = value >= settings.sliderFilterValues[0];
        }
        break;

      case SliderFilterType.Equality:
        filtered = value === settings.sliderFilterValues[0];
        break;

      case SliderFilterType.Between:
        const minValue = Math.min(settings.sliderFilterValues[0], settings.sliderFilterValues[1]);
        const maxValue = Math.max(settings.sliderFilterValues[0], settings.sliderFilterValues[1]);
        if (settings.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
          filtered = value > minValue && value < maxValue;
        } else {
          filtered = value >= minValue && value <= maxValue;
        }
        break;

      default:
        filtered = true;
        break;
    }

    return filtered;
  }
}

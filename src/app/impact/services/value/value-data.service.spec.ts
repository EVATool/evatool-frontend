import {SampleDataService} from '../../spec/sample-data.service';
import {TestBed} from '@angular/core/testing';

import {ValueDataService} from './value-data.service';
import {RestMockProviders} from "../../spec/RestMockProviders";

describe('ValueDataService', () => {
  let sampleData: SampleDataService;
  let service: ValueDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProviders.imports,
      providers: RestMockProviders.providers
    });

    sampleData = TestBed.inject(SampleDataService);
    service = TestBed.inject(ValueDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should fire \'loadedValues\' event', () => {
      // Arrange
      spyOn(service.loadedValues, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.loadedValues.emit).toHaveBeenCalled();
    });

    it('should fire \'loadedValueTypes\' event', () => {
      // Arrange
      spyOn(service.loadedValuesTypes, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.loadedValuesTypes.emit).toHaveBeenCalled();
    });

    it('should load values', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.values).toEqual(sampleData.dummyValues);
    });

    it('should load value types', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.valuesTypes).toEqual(sampleData.dummyValueTypes);
    });
  });
});

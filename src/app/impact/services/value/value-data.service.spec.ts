import {SampleDataService} from '../../spec/sample-data.service';
import {TestBed} from '@angular/core/testing';

import {ValueDataService} from './value-data.service';
import {RestMock} from "../../spec/RestMock";

describe('ValueDataService', () => {
  let data: SampleDataService;
  let service: ValueDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMock.imports,
      providers: RestMock.providers
    });

    data = TestBed.inject(SampleDataService);
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

    it('should fire \'addedValue\' event', () => {
      // Arrange
      spyOn(service.addedValue, 'emit');
      service.onInit();

      // Act
      service.createValue(service.values[0]);

      // Assert
      expect(service.addedValue.emit).toHaveBeenCalled();
    });

    it('should fire \'changedValue\' event', () => {
      // Arrange
      spyOn(service.changedValue, 'emit');
      service.onInit();

      // Act
      service.updateValue(service.values[0]);

      // Assert
      expect(service.changedValue.emit).toHaveBeenCalled();
    });

    it('should fire \'removedValue\' event', () => {
      // Arrange
      spyOn(service.removedValue, 'emit');
      service.onInit();

      // Act
      service.deleteValue(service.values[0]);

      // Assert
      expect(service.removedValue.emit).toHaveBeenCalled();
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
      expect(service.values).toEqual(data.dummyValues);
    });


    it('should create a new Value', () => {
      // Arrange
      service.onInit();

      // Act
      const existingImpacts = service.values.length;
      service.createValue(data.dummyValues[0]);

      // Assert
      expect(service.values.length).toBe(existingImpacts + 1);
    });

    it('should update a Value', () => {
      // Arrange
      service.onInit();

      // Act
      const updateImpact = service.values[0];
      updateImpact.description = "New Description";
      service.updateValue(updateImpact);

      // Assert
      expect(service.values).toContain(updateImpact);
    });

    it('should delete a Value', () => {
      // Arrange
      service.onInit();

      // Act
      const existingValues = service.values.length;
      const deleteValue = service.values[0];
      service.deleteValue(deleteValue);

      // Assert
      expect(service.values.length).toBe(existingValues - 1);
    });

    it('should load value types', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.valuesTypes).toEqual(data.dummyValueTypes);
    });
  });
});

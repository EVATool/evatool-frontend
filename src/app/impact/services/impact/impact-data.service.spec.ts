import {TestBed} from '@angular/core/testing';

import {ImpactDataService} from './impact-data.service';
import {SampleDataService} from '../../spec/sample-data.service';
import {RestMockProviders} from "../../spec/RestMockProviders";

describe('ImpactDataService', () => {
  let sampleData: SampleDataService;
  let service: ImpactDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: RestMockProviders.imports,
      providers: RestMockProviders.providers
    });

    sampleData = TestBed.inject(SampleDataService);
    service = TestBed.inject(ImpactDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#onInit', () => {
    it('should fire \'loadedImpacts\' event', () => {
      // Arrange
      spyOn(service.loadedImpacts, 'emit');

      // Act
      service.onInit();

      // Assert
      expect(service.loadedImpacts.emit).toHaveBeenCalled();
    });

    it('should fire \'addedImpact\' event', () => {
      // Arrange
      spyOn(service.addedImpact, 'emit');
      service.onInit();

      // Act
      service.createImpact();

      // Assert
      expect(service.addedImpact.emit).toHaveBeenCalled();
    });

    it('should fire \'changedImpact\' event', () => {
      // Arrange
      spyOn(service.changedImpact, 'emit');
      service.onInit();

      // Act
      service.updateImpact(service.impacts[0]);

      // Assert
      expect(service.changedImpact.emit).toHaveBeenCalled();
    });

    it('should fire \'removedImpact\' event', () => {
      // Arrange
      spyOn(service.removedImpact, 'emit');
      service.onInit();

      // Act
      service.deleteImpact(service.impacts[0]);

      // Assert
      expect(service.removedImpact.emit).toHaveBeenCalled();
    });

    it('should load impacts', () => {
      // Arrange

      // Act
      service.onInit();

      // Assert
      expect(service.impacts).toEqual(sampleData.dummyImpacts);
    });
  });

  describe('#createImpact', () => {
    it('should create a new Impact', () => {
      // Arrange
      service.onInit();

      // Act
      const existingImpacts = service.impacts.length;
      service.createImpact();

      // Assert
      expect(service.impacts.length).toBe(existingImpacts + 1);
    });
  });

  describe('#updateImpact', () => {
    it('should update an Impact', () => {
      // Arrange
      service.onInit();

      // Act
      const updateImpact = service.impacts[0];
      updateImpact.description = "New Description";
      service.updateImpact(updateImpact);

      // Assert
      expect(service.impacts).toContain(updateImpact);
    });
  });

  describe('#deleteImpact', () => {
    it('should delete an Impact', () => {
      // Arrange
      service.onInit();

      // Act
      const existingImpacts = service.impacts.length;
      const deleteImpact = service.impacts[0];
      service.deleteImpact(deleteImpact);

      // Assert
      expect(service.impacts.length).toBe(existingImpacts - 1);
    });
  });
});

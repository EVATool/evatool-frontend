import {SampleDataService} from '../../spec/sample-data.service';
import {TestBed} from '@angular/core/testing';
import {ValueMapperService} from './value-mapper.service';

describe('ValueMapperService', () => {
  let service: ValueMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // Arrange
    const value = data.getDummyValue();

    // Act
    const valueDto = service.toDto(value);

    // Assert
    expect(value.equalsDto(valueDto)).toBeTruthy();
  });

  it('should convert from dto', () => {
    // Arrange
    const valueDto = data.getDummyValueDto();

    // Act
    const value = service.fromDto(valueDto);

    // Assert
    expect(value.equalsDto(valueDto)).toBeTruthy();
  });

  it('should convert to impact dto', () => {
    // Arrange
    const value = data.getDummyValue();

    // Act
    const valueDto = service.toImpactDto(value);

    // Assert
    expect(value.equalsImpactDto(valueDto)).toBeTruthy();

  });

  it('should convert from impact dto', () => {
    // Arrange
    const valueDto = data.getDummyImpactValueDto();

    // Act
    const value = service.fromImpactDto(valueDto);

    // Assert
    expect(value.equalsImpactDto(valueDto)).toBeTruthy();
  });
});

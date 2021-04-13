import {SampleDataService} from '../../spec/sample-data.service';
import {TestBed} from '@angular/core/testing';
import {StakeholderMapperService} from './stakeholder-mapper.service';

describe('StakeholderMapperService', () => {
  let service: StakeholderMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakeholderMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // Arrange
    const stakeholder = data.getDummyStakeholder();

    // Act
    const stakeholderDto = service.toDto(stakeholder);

    // Assert
    expect(stakeholder.equalsDto(stakeholderDto)).toBeTruthy();
  });

  it('should convert from dto', () => {
    // Arrange
    const stakeholderDto = data.getDummyStakeholderDto();

    // Act
    const stakeholder = service.fromDto(stakeholderDto);

    // Assert
    expect(stakeholder.equalsDto(stakeholderDto)).toBeTruthy();

  });

  it('should convert to impact dto', () => {
    // Arrange
    const stakeholder = data.getDummyStakeholder();

    // Act
    const stakeholderDto = service.toImpactDto(stakeholder);

    // Assert
    expect(stakeholder.equalsImpactDto(stakeholderDto)).toBeTruthy();

  });

  it('should convert from impact dto', () => {
    // Arrange
    const stakeholderDto = data.getDummyImpactStakeholderDto();

    // Act
    const stakeholder = service.fromImpactDto(stakeholderDto);

    // Assert
    expect(stakeholder.equalsImpactDto(stakeholderDto)).toBeTruthy();
  });
});

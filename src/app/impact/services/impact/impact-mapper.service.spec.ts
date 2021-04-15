import {SampleDataService} from '../../spec/sample-data.service';
import {TestBed} from '@angular/core/testing';
import {ImpactMapperService} from './impact-mapper.service';

describe('ImpactMapperService', () => {
  let service: ImpactMapperService;
  let data: SampleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactMapperService);
    data = TestBed.inject(SampleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // Arrange
    const impact = data.getDummyImpact();

    // Act
    const impactDto = service.toDto(impact);

    // Assert
    expect(impact.equalsDto(impactDto)).toBeTruthy();
  });

  it('should convert from dto', () => {
    // Arrange
    const value = data.getDummyValue();
    const stakeholder = data.getDummyStakeholder();
    const analysis = data.getDummyAnalysis();
    const impactDto = data.getDummyImpactDtoWithMyChildren(value, stakeholder, analysis);

    // Act
    const impact = service.fromDto(impactDto, [value], [stakeholder], [analysis]);

    // Assert
    expect(impact.equalsDto(impactDto)).toBeTruthy();
  });
});

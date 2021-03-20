import { SampleDataGenerator } from '../../spec/sample-data.service';
import { TestBed } from '@angular/core/testing';
import { StakeholderMapperService } from './stakeholder-mapper.service';

describe('StakeholderMapperService', () => {
  let service: StakeholderMapperService;
  let data: SampleDataGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleDataGenerator]
    });
    service = TestBed.inject(StakeholderMapperService);
    data = TestBed.inject(SampleDataGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // given
    const stakeholder = data.getDummyStakeholder();

    // when
    const stakeholderDto = service.toDto(stakeholder);

    // then
    expect(stakeholder.id === stakeholderDto.rootEntityID).toBeTruthy();
    expect(stakeholder.name === stakeholderDto.stakeholderName).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    const stakeholderDto = data.getDummyStakeholderDto();

    // when
    const stakeholder = service.fromDto(stakeholderDto);

    // then
    expect(stakeholder.id === stakeholderDto.rootEntityID).toBeTruthy();
    expect(stakeholder.name === stakeholderDto.stakeholderName).toBeTruthy();
  });

  it('should convert to impact dto', () => {
    // given
    const stakeholder = data.getDummyStakeholder();

    // when
    const stakeholderDto = service.toImpactDto(stakeholder);

    // then
    expect(stakeholder.id === stakeholderDto.id).toBeTruthy();
    expect(stakeholder.name === stakeholderDto.name).toBeTruthy();
  });

  it('should convert from impact dto', () => {
    // given
    const stakeholderDto = data.getDummyImpactStakeholderDto();

    // when
    const stakeholder = service.fromImpactDto(stakeholderDto);

    // then
    expect(stakeholder.id === stakeholderDto.id).toBeTruthy();
    expect(stakeholder.name === stakeholderDto.name).toBeTruthy();
  });
});

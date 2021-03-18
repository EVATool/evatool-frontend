import { SampleDataGenerator } from './../../spec/SampleDataGenerator';
import { TestBed } from '@angular/core/testing';
import { StakeholderMapperService } from './stakeholder-mapper.service';

describe('StakeholderMapperService', () => {
  let service: StakeholderMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StakeholderMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert to dto', () => {
    // given
    let stakeholder = SampleDataGenerator.getDummyStakeholder();

    // when
    let stakeholderDto = StakeholderMapperService.toDto(stakeholder);

    // then
    expect(stakeholder.id === stakeholderDto.rootEntityID).toBeTruthy();
    expect(stakeholder.name === stakeholderDto.stakeholderName).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    let stakeholderDto = SampleDataGenerator.getDummyStakeholderDto();

    // when
    let stakeholder = StakeholderMapperService.fromDto(stakeholderDto);

    // then
    expect(stakeholder.id === stakeholderDto.rootEntityID).toBeTruthy();
    expect(stakeholder.name === stakeholderDto.stakeholderName).toBeTruthy();
  });
});

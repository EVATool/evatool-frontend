import { SampleDataGenerator } from '../../spec/SampleDataGenerator';
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
    const stakeholder = SampleDataGenerator.getDummyStakeholder();

    // when
    const stakeholderDto = StakeholderMapperService.toDto(stakeholder);

    // then
    expect(stakeholder.id === stakeholderDto.id).toBeTruthy();
    expect(stakeholder.name === stakeholderDto.name).toBeTruthy();
  });

  it('should convert from dto', () => {
    // given
    const stakeholderDto = SampleDataGenerator.getDummyStakeholderDto();

    // when
    const stakeholder = StakeholderMapperService.fromDto(stakeholderDto);

    // then
    expect(stakeholder.id === stakeholderDto.id).toBeTruthy();
    expect(stakeholder.name === stakeholderDto.name).toBeTruthy();
  });
});

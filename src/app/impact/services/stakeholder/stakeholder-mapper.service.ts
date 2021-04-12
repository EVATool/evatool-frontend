import {LogService} from '../../../shared/services/log.service';
import {ImpactStakeholderDto} from '../../dtos/ImpactStakeholderDto';
import {StakeholderDto} from '../../dtos/StakeholderDto';
import {Stakeholder} from '../../models/Stakeholder';
import {Injectable} from '@angular/core';
import {AnalysisMapperService} from "../analysis/analysis-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class StakeholderMapperService {

  constructor(
    private logger: LogService,
    private analysisMapperService: AnalysisMapperService) {
  }

  toDto(stakeholder: Stakeholder): StakeholderDto {
    this.logger.info(this, 'Mapping Stakeholder to StakeholderDto');

    const stakeholderDto = new StakeholderDto();

    stakeholderDto.rootEntityID = stakeholder.id;
    stakeholderDto.stakeholderName = stakeholder.name;
    stakeholderDto.stakeholderLevel = stakeholder.level;

    return stakeholderDto;
  }

  fromDto(stakeholderDto: StakeholderDto): Stakeholder {
    this.logger.info(this, 'Mapping StakeholderDto to Stakeholder');
    const stakeholder = new Stakeholder();

    stakeholder.id = stakeholderDto.rootEntityID;
    stakeholder.name = stakeholderDto.stakeholderName;
    stakeholder.level = stakeholderDto.stakeholderLevel;

    return stakeholder;
  }

  toImpactDto(stakeholder: Stakeholder): ImpactStakeholderDto {
    this.logger.info(this, 'Mapping Stakeholder to ImpactStakeholderDto');
    const stakeholderDto = new ImpactStakeholderDto();

    stakeholderDto.id = stakeholder.id;
    stakeholderDto.name = stakeholder.name;
    stakeholderDto.level = stakeholder.level;

    return stakeholderDto;
  }

  fromImpactDto(stakeholderDto: ImpactStakeholderDto): Stakeholder {
    this.logger.info(this, 'Mapping ImpactStakeholderDto to Stakeholder');
    const stakeholder = new Stakeholder();

    stakeholder.id = stakeholderDto.id;
    stakeholder.name = stakeholderDto.name;
    stakeholder.level = stakeholderDto.level;

    return stakeholder;
  }
}

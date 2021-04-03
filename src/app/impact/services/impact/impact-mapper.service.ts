import { LogService } from '../../../shared/services/log.service';
import { AnalysisMapperService } from './../analysis/analysis-mapper.service';
import { Analysis } from '../../models/Analysis';
import { Stakeholder } from '../../models/Stakeholder';
import { Value } from '../../models/Value';
import { StakeholderMapperService } from '../stakeholder/stakeholder-mapper.service';
import { ValueMapperService } from '../value/value-mapper.service';
import { ImpactDto } from '../../dtos/ImpactDto';
import { Impact } from '../../models/Impact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactMapperService {

  constructor(
    private logger: LogService,
    private valueMapperService: ValueMapperService,
    private stakeholderMapperService: StakeholderMapperService,
    private analysisMapperService: AnalysisMapperService
  ) { }

  toDto(impact: Impact): ImpactDto {
    this.logger.info(this, 'Mapping Impact to ImpactDto');

    const impactDto = new ImpactDto();

    impactDto.id = impact.id;
    impactDto.uniqueString = impact.uniqueString;
    impactDto.value = impact.value;
    impactDto.description = impact.description;

    impactDto.valueEntity = this.valueMapperService.toImpactDto(impact.valueEntity);
    impactDto.stakeholder = this.stakeholderMapperService.toImpactDto(impact.stakeholder);
    impactDto.analysis = this.analysisMapperService.toImpactDto(impact.analysis);

    return impactDto;
  }

  fromDto(impactDto: ImpactDto, values: Value[], stakeholders: Stakeholder[], analyses: Analysis[]): Impact {
    this.logger.info(this, 'Mapping ImpactDto to Impact');

    const impact = new Impact();

    impact.id = impactDto.id;
    impact.uniqueString = impactDto.uniqueString;
    impact.value = impactDto.value;
    impact.description = impactDto.description;

    values.forEach(value => {
      if (value.id === impactDto.valueEntity.id) {
        impact.valueEntity = value;
        return;
      }
    });

    stakeholders.forEach(stakeholder => {
      if (stakeholder.id === impactDto.stakeholder.id) {
        impact.stakeholder = stakeholder;
        return;
      }
    });

    analyses.forEach(analysis => {
      if (analysis.id === impactDto.analysis.id) {
        impact.analysis = analysis;
        return;
      }
    });

    return impact;
  }
}

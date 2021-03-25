import { LogService } from '../../settings/log.service';
import { AnalysisMapperService } from './../analysis/analysis-mapper.service';
import { Analysis } from '../../models/Analysis';
import { Stakeholder } from '../../models/Stakeholder';
import { Dimension } from '../../models/Dimension';
import { StakeholderMapperService } from '../stakeholder/stakeholder-mapper.service';
import { DimensionMapperService } from '../dimension/dimension-mapper.service';
import { ImpactDto } from '../../dtos/ImpactDto';
import { Impact } from '../../models/Impact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactMapperService {

  constructor(
    private logger: LogService,
    private dimensionMapperService: DimensionMapperService,
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

    impactDto.dimension = this.dimensionMapperService.toDto(impact.dimension);
    impactDto.stakeholder = this.stakeholderMapperService.toImpactDto(impact.stakeholder);
    impactDto.analysis = this.analysisMapperService.toImpactDto(impact.analysis);

    return impactDto;
  }

  fromDto(impactDto: ImpactDto, dimensions: Dimension[], stakeholders: Stakeholder[], analyses: Analysis[]): Impact {
    this.logger.info(this, 'Mapping ImpactDto to Impact');

    const impact = new Impact();

    impact.id = impactDto.id;
    impact.uniqueString = impactDto.uniqueString;
    impact.value = impactDto.value;
    impact.description = impactDto.description;

    dimensions.forEach(dimension => {
      if (dimension.id === impactDto.dimension.id) {
        impact.dimension = dimension;
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

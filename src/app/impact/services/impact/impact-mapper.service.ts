import { AnalysisMapperService } from '../analysis/analysis-mapper.service';
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

  constructor() { }

  static toDto(impact: Impact): ImpactDto {
    console.log('Mapping Impact to ImpactDto');

    const impactDto = new ImpactDto();

    impactDto.id = impact.id;
    impactDto.uniqueString = impact.uniqueString;
    impactDto.value = impact.value;
    impactDto.description = impact.description;

    impactDto.dimension = DimensionMapperService.toDto(impact.dimension);
    impactDto.stakeholder = StakeholderMapperService.toImpactDto(impact.stakeholder);
    impactDto.analysis = AnalysisMapperService.toImpactDto(impact.analysis);

    return impactDto;
  }

  // impactDto: any has to be used, because the backend sends other names for both:
  // The child Dtos: The Dtos are not suffixed with *Dto in the backend return content.
  // The child Dtos attributes: The ids do not have the names of the owner domain, due to the domain impact using other names.
  static fromDto(impactDto: ImpactDto, dimensions: Dimension[], stakeholders: Stakeholder[], analyses: Analysis[]): Impact {
    console.log('Mapping ImpactDto to Impact');

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

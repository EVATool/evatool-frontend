import { Stakeholder } from './../../models/Stakeholder';
import { Dimension } from './../../models/Dimension';
import { StakeholderMapperService } from './../stakeholder/stakeholder-mapper.service';
import { DimensionMapperService } from './../dimension/dimension-mapper.service';
import { ImpactDto } from './../../dtos/ImpactDto';
import { Impact } from './../../models/Impact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactMapperService {

  constructor() { }

  
  static toDto(impact: Impact): ImpactDto {
    let impactDto = new ImpactDto();

    impactDto.id = impact.id;
    impactDto.value = impact.value;
    impactDto.description = impact.description;

    impactDto.dimension = DimensionMapperService.toDto(impact.dimension);
    impactDto.stakeholder = StakeholderMapperService.toDto(impact.stakeholder);

    return impactDto;
  }

  static fromDto(impactDto: ImpactDto, dimensions: Dimension[], stakeholders: Stakeholder[]): Impact {
    let impact = new Impact();

    impact.id = impactDto.id;
    impact.value = impactDto.value;
    impact.description = impactDto.description;

    dimensions.forEach(dimension => {
      if (dimension.id === impactDto.dimension.id) {
        impactDto.dimension = dimension;
        return;
      }
    });

    stakeholders.forEach(stakeholder => {
      if (stakeholder.id === impactDto.stakeholder.id) {
        impactDto.stakeholder = stakeholder;
        return;
      }
    });
    
    return impact;
  }
}

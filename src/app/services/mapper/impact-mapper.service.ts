import {Injectable} from '@angular/core';
import {MapperService} from '../mapper.service';
import {LogService} from '../log.service';
import {Impact} from '../../model/Impact';
import {ImpactDto} from '../../dto/ImpactDto';
import {Analysis} from '../../model/Analysis';
import {Value} from '../../model/Value';
import {Stakeholder} from '../../model/Stakeholder';
import {AnalysisDto} from '../../dto/AnalysisDto';

@Injectable({
  providedIn: 'root'
})
export class ImpactMapperService extends MapperService {

  constructor(protected logger: LogService) {
    super(logger);
  }

  toDto(impact: Impact): ImpactDto {
    this.logger.info(this, 'Mapping Impact to ImpactDto');
    const impactDto = new ImpactDto();

    impactDto.id = impact.id;
    impactDto.prefixSequenceId = impact.prefixSequenceId;
    impactDto.merit = impact.merit;
    impactDto.description = impact.description;
    impactDto.isGoal = impact.isGoal;
    impactDto.analysisId = impact.analysis.id;
    impactDto.valueId = impact.value.id;
    impactDto.stakeholderId = impact.stakeholder.id;

    return impactDto;
  }

  fromDto(impactDto: ImpactDto, analyses: Analysis[], values: Value[], stakeholders: Stakeholder[]): Impact {
    this.logger.info(this, 'Mapping ImpactDto to Impact');
    const impact = new Impact();
    this.updateFromDto(impactDto, impact, analyses, values, stakeholders);
    return impact;
  }

  updateFromDto(impactDto: ImpactDto, impact: Impact, analyses: Analysis[], values: Value[], stakeholders: Stakeholder[]): void {
    impact.id = impactDto.id;
    impact.prefixSequenceId = impactDto.prefixSequenceId;
    impact.merit = impactDto.merit;
    impact.description = impactDto.description;
    impact.isGoal = impactDto.isGoal;

    for (const analysis of analyses) {
      if (analysis.id === impactDto.analysisId) {
        impact.analysis = analysis;
        break;
      }
    }
    for (const value of values) {
      if (value.id === impactDto.valueId) {
        impact.value = value;
        break;
      }
    }
    for (const stakeholder of stakeholders) {
      if (stakeholder.id === impactDto.stakeholderId) {
        impact.stakeholder = stakeholder;
        break;
      }
    }
  }
}

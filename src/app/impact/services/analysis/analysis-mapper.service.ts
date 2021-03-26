import { LogService } from '../../../shared/services/log.service';
import { ImpactAnalysisDto } from '../../dtos/ImpactAnalysisDto';
import { AnalysisDto } from '../../dtos/AnalysisDto';
import { Analysis } from '../../models/Analysis';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisMapperService {

  constructor(private logger: LogService) { }

  toDto(analysis: Analysis): AnalysisDto {
    this.logger.info(this, 'Mapping Analysis to AnalysisDto');
    const analysisDto = new AnalysisDto();

    analysisDto.rootEntityID = analysis.id;

    return analysisDto;
  }

  fromDto(analysisDto: AnalysisDto): Analysis {
    this.logger.info(this, 'Mapping AnalysisDto to Analysis');
    const analysis = new Analysis();

    analysis.id = analysisDto.rootEntityID;

    return analysis;
  }

  toImpactDto(analysis: Analysis): ImpactAnalysisDto {
    this.logger.info(this, 'Mapping Analysis to ImpactAnalysisDto');
    const analysisDto = new ImpactAnalysisDto();

    analysisDto.id = analysis.id;

    return analysisDto;
  }

  fromImpactDto(analysisDto: ImpactAnalysisDto): Analysis {
    this.logger.info(this, 'Mapping ImpactAnalysisDto to AnalysisDto');
    const analysis = new Analysis();

    analysis.id = analysisDto.id;

    return analysis;
  }
}

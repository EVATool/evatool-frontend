import { ImpactAnalysisDto } from '../../dtos/ImpactAnalysisDto';
import { AnalysisDto } from '../../dtos/AnalysisDto';
import { Analysis } from '../../models/Analysis';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisMapperService {

  constructor() { }

  toDto(analysis: Analysis): AnalysisDto {
    const analysisDto = new AnalysisDto();

    analysisDto.rootEntityID = analysis.id;

    return analysisDto;
  }

  fromDto(analysisDto: AnalysisDto): Analysis {
    const analysis = new Analysis();

    analysis.id = analysisDto.rootEntityID;

    return analysis;
  }

  toImpactDto(analysis: Analysis): ImpactAnalysisDto {
    const analysisDto = new ImpactAnalysisDto();

    analysisDto.id = analysis.id;

    return analysisDto;
  }

  fromImpactDto(analysisDto: ImpactAnalysisDto): Analysis {
    const analysis = new Analysis();

    analysis.id = analysisDto.id;

    return analysis;
  }
}

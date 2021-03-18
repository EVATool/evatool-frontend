import { ImpactAnalysisDto } from './../../dtos/ImpactAnalysisDto';
import { AnalysisDto } from './../../dtos/AnalysisDto';
import { Analysis } from './../../models/Analysis';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysisMapperService {

  constructor() { }

  static toDto(analysis: Analysis): AnalysisDto {
    let analysisDto = new AnalysisDto();

    analysisDto.rootEntityID = analysis.id;

    return analysisDto;
  }

  static fromDto(analysisDto: AnalysisDto): Analysis {
    let analysis = new Analysis();

    analysis.id = analysisDto.rootEntityID;

    return analysis;
  }

  static toImpactDto(analysis: Analysis): ImpactAnalysisDto {
    let analysisDto = new ImpactAnalysisDto();

    analysisDto.id = analysis.id;

    return analysisDto;
  }

  static fromImpactDto(analysisDto: ImpactAnalysisDto): Analysis {
    let analysis = new Analysis();

    analysis.id = analysisDto.id;

    return analysis;
  }
}

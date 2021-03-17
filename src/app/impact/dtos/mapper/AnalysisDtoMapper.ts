import { AnalysisDto } from './../AnalysisDto';
import { Analysis } from './../../models/Analysis';

export class AnalysisDtoMapper {

  static toDto(analysis: Analysis): AnalysisDto {
    let analysisDto = new AnalysisDto();

    analysisDto.id = analysis.id;

    return analysisDto;
  }

  static fromDto(analysisDto: AnalysisDto): Analysis {
    let analysis = new Analysis();

    analysis.id = analysisDto.id;

    return analysis;
  }
}

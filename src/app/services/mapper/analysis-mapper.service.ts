import {Injectable} from '@angular/core';
import {LogService} from '../log.service';
import {Analysis} from '../../model/Analysis';
import {AnalysisDto} from '../../dto/AnalysisDto';
import {MapperService} from '../mapper.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisMapperService extends MapperService {

  constructor(protected logger: LogService) {
    super(logger);
  }

  toDto(analysis: Analysis): AnalysisDto {
    this.logger.info(this, 'Mapping Analysis to AnalysisDto');
    const analysisDto = new AnalysisDto();

    analysisDto.id = analysis.id;
    analysisDto.prefixSequenceId = analysis.prefixSequenceId;
    analysisDto.name = analysis.name;
    analysisDto.description = analysis.description;
    analysisDto.isTemplate = analysis.isTemplate;
    analysisDto.imageUrl = analysis.imageUrl;
    analysisDto.lastUpdated = analysis.lastUpdated;

    return analysisDto;
  }

  fromDto(analysisDto: AnalysisDto): Analysis {
    this.logger.info(this, 'Mapping AnalysisDto to Analysis');
    const analysis = new Analysis();

    analysis.id = analysisDto.id;
    analysis.prefixSequenceId = analysisDto.prefixSequenceId;
    analysis.name = analysisDto.name;
    analysis.description = analysisDto.description;
    analysis.isTemplate = analysisDto.isTemplate;
    analysis.imageUrl = analysisDto.imageUrl;
    analysis.lastUpdated = analysisDto.lastUpdated;

    return analysis;
  }
}

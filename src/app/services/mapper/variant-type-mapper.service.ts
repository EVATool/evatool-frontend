import {Injectable} from '@angular/core';
import {MapperService} from './mapper.service';
import {LogService} from '../log.service';
import {VariantType} from '../../model/VariantType';
import {VariantTypeDto} from '../../dto/VariantTypeDto';
import {Analysis} from '../../model/Analysis';

@Injectable({
  providedIn: 'root'
})
export class VariantTypeMapperService extends MapperService {

  constructor(protected  logger: LogService) {
    super(logger);
  }

  toDto(variantType: VariantType): VariantTypeDto {
    this.logger.debug(this, 'Mapping VariantType to VariantTypeDto');
    const variantTypeDto = new VariantTypeDto();

    variantTypeDto.id = variantType.id;
    variantTypeDto.name = variantType.name;
    variantTypeDto.description = variantType.description;
    variantTypeDto.analysisId = variantType.analysis.id;

    return variantTypeDto;
  }

  fromDto(variantTypeDto: VariantTypeDto, analyses: Analysis[]): VariantType {
    this.logger.debug(this, 'Mapping VariantTypeDto to VariantType');
    const variantType = new VariantType();
    this.updateFromDto(variantTypeDto, variantType, analyses);
    return variantType;
  }

  updateFromDto(variantTypeDto: VariantTypeDto, variantType: VariantType, analyses: Analysis[]): void {
    variantType.id = variantTypeDto.id;
    variantType.name = variantTypeDto.name;
    variantType.description = variantTypeDto.description;
    for (const analysis of analyses) {
      if (analysis.id === variantTypeDto.analysisId) {
        variantType.analysis = analysis;
        break;
      }
    }
  }
}

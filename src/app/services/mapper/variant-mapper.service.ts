import {Injectable} from '@angular/core';
import {MapperService} from '../mapper.service';
import {LogService} from '../log.service';
import {Variant} from '../../model/Variant';
import {VariantDto} from '../../dto/VariantDto';
import {Analysis} from '../../model/Analysis';

@Injectable({
  providedIn: 'root'
})
export class VariantMapperService extends MapperService {

  constructor(protected logger: LogService) {
    super(logger);
  }

  toDto(variant: Variant): VariantDto {
    this.logger.info(this, 'Mapping Variant to VariantDto');
    const variantDto = new VariantDto();

    variantDto.id = variant.id;
    variantDto.prefixSequenceId = variant.prefixSequenceId;
    variantDto.name = variant.name;
    variantDto.description = variant.description;
    variantDto.archived = variant.archived;
    variantDto.analysisId = variant.analysis.id;
    variantDto.subVariantIds = variant.subVariants.map(variant => variant.id);

    return variantDto;
  }

  fromDto(variantDto: any, analyses: Analysis[]): any {
    this.logger.info(this, 'Mapping VariantDto to Variant');
    const variant = new Variant();

    variant.id = variantDto.id;
    variant.prefixSequenceId = variantDto.prefixSequenceId;
    variant.name = variantDto.name;
    variant.description = variantDto.description;
    variant.archived = variantDto.archived;
    for (let analysis of analyses) {
      if (analysis.id === variantDto.analysisId) {
        variant.analysis = analysis;
        break;
      }
    }
    //variant.subVariantIds = variantDto.subVariants.map(subVar => subVar.id);

    return variant;
  }
}

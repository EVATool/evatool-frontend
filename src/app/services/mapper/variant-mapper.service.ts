import {Injectable} from '@angular/core';
import {MapperService} from './mapper.service';
import {LogService} from '../log.service';
import {Variant} from '../../model/Variant';
import {VariantDto} from '../../dto/VariantDto';
import {Analysis} from '../../model/Analysis';
import {VariantType} from '../../model/VariantType';

@Injectable({
  providedIn: 'root'
})
export class VariantMapperService extends MapperService {

  constructor(protected logger: LogService) {
    super(logger);
  }

  toDto(variant: Variant): VariantDto {
    this.logger.debug(this, 'Mapping Variant to VariantDto');
    const variantDto = new VariantDto();

    variantDto.id = variant.id;
    variantDto.prefixSequenceId = variant.prefixSequenceId;
    variantDto.name = variant.name;
    variantDto.description = variant.description;
    variantDto.archived = variant.archived;
    variantDto.analysisId = variant.analysis.id;
    variantDto.subVariantIds = variant.subVariants.map(subVariant => subVariant.id);

    return variantDto;
  }

  fromDto(variantDto: any, analyses: Analysis[], variantTypes: VariantType[]): any {
    this.logger.debug(this, 'Mapping VariantDto to Variant');
    const variant = new Variant();
    this.updateFromDto(variantDto, variant, analyses, variantTypes);
    return variant;
  }

  updateFromDto(variantDto: VariantDto, variant: Variant, analyses: Analysis[], variantTypes: VariantType[]): void {
    variant.id = variantDto.id;
    variant.prefixSequenceId = variantDto.prefixSequenceId;
    variant.name = variantDto.name;
    variant.description = variantDto.description;
    variant.archived = variantDto.archived;
    for (const analysis of analyses) {
      if (analysis.id === variantDto.analysisId) {
        variant.analysis = analysis;
        break;
      }
    }
    for (const variantType of variantTypes) {
      if (variantType.id === variantDto.variantTypeId) {
        variant.variantType = variantType;
        break;
      }
    }
    //variant.subVariantIds = variantDto.subVariants.map(subVar => subVar.id);
  }
}

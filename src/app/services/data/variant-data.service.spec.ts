import {TestBed} from '@angular/core/testing';

import {VariantDataService} from './variant-data.service';
import {SpecService} from '../spec.service';
import {Variant} from '../../model/Variant';
import {SampleDataService} from '../sample-data.service';
import {MasterService} from '../master.service';

describe('VariantDataService', () => {
  let service: VariantDataService;
  let data: SampleDataService;
  let masterService: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: SpecService.imports,
    });
    service = TestBed.inject(VariantDataService);
    data = TestBed.inject(SampleDataService);
    masterService = TestBed.inject(MasterService);
    masterService.init();
    masterService.analysisData.changeCurrentAnalysis('1');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize', () => {
    // given

    // when

    // then

  });

  it('should create variant', () => {
    // given
    const createVariant = data.variants[0];

    // then
    service.createdVariant.subscribe((variant: Variant) => {
      expect(service.variants).toContain(variant);
    });

    // when
    service.createVariant(createVariant);
  });

  it('should update variant', () => {
    // given
    const updatedVariant = data.variants[0];

    // then
    service.updatedVariant.subscribe((variant: Variant) => {
      expect(updatedVariant).toEqual(variant);
    });

    // when
    updatedVariant.archived = !updatedVariant.archived;
    service.updateVariant(updatedVariant);
  });

  it('should delete variant', () => {
    // given
    const deletedVariant = service.variants[0];

    // then
    service.deletedVariant.subscribe((variant: Variant) => {
      expect(service.variants).not.toContain(variant);
    });

    // when
    service.deleteVariant(deletedVariant);
  });

  it('should create a default variant', () => {
    // given

    // when
    const defaultVariant = service.createDefaultVariant(data.analyses[0]);

    // then
    expect(defaultVariant.id).toBeUndefined();
    expect(defaultVariant.prefixSequenceId).toBeUndefined();
    expect(defaultVariant.name).toEqual('');
    expect(defaultVariant.description).toEqual('');
    expect(defaultVariant.archived).toEqual(false);
    expect(defaultVariant.analysis).toBeDefined();
    expect(defaultVariant.subVariants.length).toBe(0);
  });

  describe('event emitter', () => {
    it('should fire created variants event', () => {
      // given
      const createVariants = data.variants[0];
      spyOn(service.createdVariant, 'emit');

      // when
      service.createVariant(createVariants);

      // then
      expect(service.createdVariant.emit).toHaveBeenCalled();
    });

    it('should fire updated variants event', () => {
      // given
      const updateVariants = data.variants[0];
      spyOn(service.updatedVariant, 'emit');

      // when
      service.updateVariant(updateVariants);

      // then
      expect(service.updatedVariant.emit).toHaveBeenCalled();
    });

    it('should fire deleted variants event', () => {
      // given
      const deleteVariants = data.variants[0];
      spyOn(service.deletedVariant, 'emit');

      // when
      service.deleteVariant(deleteVariants);

      // then
      expect(service.deletedVariant.emit).toHaveBeenCalled();
    });
  });
});

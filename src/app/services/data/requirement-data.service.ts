import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {LogService} from '../log.service';
import {AnalysisDataService} from './analysis-data.service';
import {DataService} from '../data.service';
import {RequirementRestService} from '../rest/requirement-rest.service';
import {RequirementMapperService} from '../mapper/requirement-mapper.service';
import {Requirement} from '../../model/Requirement';
import {Analysis} from '../../model/Analysis';
import {RequirementDto} from '../../dto/RequirementDto';
import {VariantDataService} from './variant-data.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequirementDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() loadedRequirements: EventEmitter<Requirement[]> = new EventEmitter();
  @Output() createdRequirement: EventEmitter<Requirement> = new EventEmitter();
  @Output() updatedRequirement: EventEmitter<Requirement> = new EventEmitter();
  @Output() deletedRequirement: EventEmitter<Requirement> = new EventEmitter();

  requirements: Requirement[] = [];
  variantsLoaded = false;

  constructor(protected logger: LogService,
              private requirementRest: RequirementRestService,
              private requirementMapper: RequirementMapperService,
              private analysisData: AnalysisDataService,
              private variantData: VariantDataService) {
    super(logger);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    // Load Requirements.
    this.analysisData.loadedCurrentAnalysis
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysis: Analysis) => {
        this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
      });
    this.variantData.loadedVariants
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.variantsLoaded = true;
        this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
      });
  }

  loadIfChildrenLoaded(analysisId: string): void {
    if (!this.variantsLoaded) {
      return;
    }

    this.requirementRest.getRequirementsByAnalysisId(analysisId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((requirementDtoList: RequirementDto[]) => {
        this.requirements = [];
        requirementDtoList.forEach(requirementDto => {
          this.requirements.push(this.requirementMapper.fromDto(requirementDto,
            [this.analysisData.currentAnalysis],
            this.variantData.variants));
        });
        this.requirements = this.sortDefault(this.requirements);
        this.loadedRequirements.emit(this.requirements);
        this.logger.info(this, 'Requirements loaded');
      });
  }

  createRequirement(requirement: Requirement): void {
    this.requirementRest.createRequirement(this.requirementMapper.toDto(requirement))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((requirementDto: RequirementDto) => {
        const createdRequirement = this.requirementMapper.fromDto(requirementDto,
          [this.analysisData.currentAnalysis],
          this.variantData.variants);
        this.requirements.push(createdRequirement);
        this.createdRequirement.emit(createdRequirement);
        this.logger.info(this, 'Requirement created');
      });
  }

  updateRequirement(requirement: Requirement): void {
    this.requirementRest.updateRequirement(this.requirementMapper.toDto(requirement))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((requirementDto: RequirementDto) => {
        this.requirementMapper.updateFromDto(requirementDto,
          requirement,
          [this.analysisData.currentAnalysis],
          this.variantData.variants);
        this.updatedRequirement.emit(requirement);
        this.logger.info(this, 'Requirement updated');
      });
  }

  deleteRequirement(requirement: Requirement): void {
    this.requirementRest.deleteRequirement(requirement.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.requirements.indexOf(requirement, 0);
        this.requirements.splice(index, 1);
        this.deletedRequirement.emit(requirement);
        this.logger.info(this, 'Requirement deleted');
      });
  }

  createDefaultRequirement(analysis: Analysis): Requirement {
    const requirement = new Requirement();

    requirement.description = '';
    requirement.analysis = analysis;
    requirement.variants = [];

    return requirement;
  }
}

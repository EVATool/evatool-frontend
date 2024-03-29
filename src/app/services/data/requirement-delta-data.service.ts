import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {DataService} from './data.service';
import {LogService} from '../log.service';
import {AnalysisDataService} from './analysis-data.service';
import {RequirementDelta} from '../../model/RequirementDelta';
import {RequirementDeltaRestService} from '../rest/requirement-delta-rest.service';
import {RequirementDeltaMapperService} from '../mapper/requirement-delta-mapper.service';
import {ImpactDataService} from './impact-data.service';
import {RequirementDataService} from './requirement-data.service';
import {Analysis} from '../../model/Analysis';
import {RequirementDeltaDto} from '../../dto/RequirementDeltaDto';
import {Requirement} from '../../model/Requirement';
import {Impact} from '../../model/Impact';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequirementDeltaDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() loadedRequirementDeltas: EventEmitter<RequirementDelta[]> = new EventEmitter();
  @Output() createdRequirementDelta: EventEmitter<RequirementDelta> = new EventEmitter();
  @Output() updatedRequirementDelta: EventEmitter<RequirementDelta> = new EventEmitter();
  @Output() deletedRequirementDelta: EventEmitter<RequirementDelta> = new EventEmitter();

  requirementDeltasLoaded = false;
  requirementDeltas: RequirementDelta[] = [];

  constructor(protected logger: LogService,
              private requirementDeltaRest: RequirementDeltaRestService,
              private requirementDeltaMapper: RequirementDeltaMapperService,
              private analysisData: AnalysisDataService,
              private impactData: ImpactDataService,
              private requirementData: RequirementDataService) {
    super(logger);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    // Load Requirement Deltas.
    this.analysisData.loadedCurrentAnalysis
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysis: Analysis) => {
        //this.requirementDeltasLoaded = false;
      });
    this.impactData.loadedImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
      });
    this.requirementData.loadedRequirements
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
      });
  }

  clearData(): void {
    this.requirementDeltasLoaded = false;
    this.requirementDeltas = [];
  }

  loadIfChildrenLoaded(analysisId: string): void {
    if (!this.impactData.impactsLoaded || !this.requirementData.requirementsLoaded) {
      this.logger.debug(this, 'A child entity collection has not yet been loaded');
      return;
    }
    this.requirementDeltaRest.getRequirementDeltasByAnalysisId(analysisId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((deltaDtoList: RequirementDeltaDto[]) => {
        const tempDeltas: RequirementDelta[] = [];
        deltaDtoList.forEach(requirementDeltaDto => {
          tempDeltas.push(this.requirementDeltaMapper.fromDto(
            requirementDeltaDto,
            this.requirementData.requirements,
            this.impactData.impacts));
        });
        this.requirementDeltas = this.sortDefault(tempDeltas);
        this.requirementDeltasLoaded = true;
        this.loadedRequirementDeltas.emit(this.requirementDeltas);
        this.logger.debug(this, 'RequirementDeltas loaded');
      });
  }

  createRequirementDelta(requirementDelta: RequirementDelta): void {
    this.requirementDeltaRest.createRequirementDelta(this.requirementDeltaMapper.toDto(requirementDelta))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((requirementDeltaDto: RequirementDeltaDto) => {
        const createdRequirementDelta = this.requirementDeltaMapper.fromDto(requirementDeltaDto,
          this.requirementData.requirements,
          this.impactData.impacts);
        this.requirementDeltas.push(createdRequirementDelta);
        this.createdRequirementDelta.emit(createdRequirementDelta);
        this.logger.debug(this, 'RequirementDelta created');
      });
  }

  updateRequirementDelta(requirementDelta: RequirementDelta): void {
    this.requirementDeltaRest.updateRequirementDelta(this.requirementDeltaMapper.toDto(requirementDelta))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((requirementDeltaDto: RequirementDeltaDto) => {
        this.requirementDeltaMapper.updateFromDto(requirementDeltaDto,
          requirementDelta,
          this.requirementData.requirements,
          this.impactData.impacts);
        this.updatedRequirementDelta.emit(requirementDelta);
        this.logger.debug(this, 'RequirementDelta updated');
      });
  }

  deleteRequirementDelta(requirementDelta: RequirementDelta): void {
    this.requirementDeltaRest.deleteRequirementDelta(requirementDelta.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.requirementDeltas.indexOf(requirementDelta, 0);
        this.requirementDeltas.splice(index, 1);
        this.deletedRequirementDelta.emit(requirementDelta);
        this.logger.debug(this, 'RequirementDelta deleted');
      });
  }

  createDefaultRequirementDelta(impact: Impact, requirement: Requirement): RequirementDelta {
    const requirementDelta = new RequirementDelta();

    requirementDelta.overwriteMerit = impact.merit;
    requirementDelta.impact = impact;
    requirementDelta.requirement = requirement;

    return requirementDelta;
  }
}

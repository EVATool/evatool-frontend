import {EventEmitter, Injectable, Output} from '@angular/core';
import {DataService} from '../data.service';
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

@Injectable({
  providedIn: 'root'
})
export class RequirementDeltaDataService extends DataService {
  @Output() loadedRequirementDeltas: EventEmitter<RequirementDelta[]> = new EventEmitter();
  @Output() createdRequirementDelta: EventEmitter<RequirementDelta> = new EventEmitter();
  @Output() updatedRequirementDelta: EventEmitter<RequirementDelta> = new EventEmitter();
  @Output() deletedRequirementDelta: EventEmitter<RequirementDelta> = new EventEmitter();

  requirementDeltas: RequirementDelta[] = [];
  impactsLoaded = false;
  requirementsLoaded = false;

  constructor(protected logger: LogService,
              private requirementDeltaRest: RequirementDeltaRestService,
              private requirementDeltaMapper: RequirementDeltaMapperService,
              private analysisData: AnalysisDataService,
              private impactData: ImpactDataService,
              private requirementData: RequirementDataService) {
    super(logger);
  }

  init(): void {
    // Load Requirement Deltas.
    this.analysisData.loadedCurrentAnalysis.subscribe((analysis: Analysis) => {
    });
    this.impactData.loadedImpacts.subscribe(() => {
      this.impactsLoaded = true;
      this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
    });
    this.requirementData.loadedRequirements.subscribe(() => {
      this.requirementsLoaded = true;
      this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
    });

    // Update local data with data from backend
    this.updatedRequirementDelta.subscribe((delta: RequirementDelta) => {
      const localDelta = this.requirementDeltas.find(d => d.id === delta.id);
      if (localDelta != null) {
        localDelta.originalMerit = delta.originalMerit; // TODO updateLocal method in mapper services.
        localDelta.minOverwriteMerit = delta.minOverwriteMerit;
        localDelta.maxOverwriteMerit = delta.maxOverwriteMerit;
        localDelta.meritColorCode = delta.meritColorCode;
      }
    });
  }

  loadIfChildrenLoaded(analysisId: string): void {
    if (!this.impactsLoaded || !this.requirementsLoaded) {
      return;
    }
    this.requirementDeltaRest.getRequirementDeltasByAnalysisId(analysisId).subscribe((deltaDtoList: RequirementDeltaDto[]) => {
      this.requirementDeltas = [];
      deltaDtoList.forEach(requirementDeltaDto => {
        this.requirementDeltas.push(this.requirementDeltaMapper.fromDto(
          requirementDeltaDto,
          this.requirementData.requirements,
          this.impactData.impacts));
      });
      this.loadedRequirementDeltas.emit(this.requirementDeltas);
      this.logger.info(this, 'RequirementDeltas loaded');
    });
  }

  createRequirementDelta(requirementDelta: RequirementDelta): void {
    this.requirementDeltaRest.createRequirementDelta(this.requirementDeltaMapper.toDto(requirementDelta)).subscribe((requirementDeltaDto: RequirementDeltaDto) => {
      const createdRequirementDelta = this.requirementDeltaMapper.fromDto(requirementDeltaDto,
        this.requirementData.requirements,
        this.impactData.impacts);
      this.requirementDeltas.push(createdRequirementDelta);
      this.createdRequirementDelta.emit(createdRequirementDelta);
      this.logger.info(this, 'RequirementDelta created');
    });
  }

  updateRequirementDelta(requirementDelta: RequirementDelta): void {
    this.requirementDeltaRest.updateRequirementDelta(this.requirementDeltaMapper.toDto(requirementDelta)).subscribe((requirementDeltaDto: RequirementDeltaDto) => {
      const updatedRequirementDelta = this.requirementDeltaMapper.fromDto(requirementDeltaDto,
        this.requirementData.requirements,
        this.impactData.impacts);
      this.updatedRequirementDelta.emit(updatedRequirementDelta);
      this.logger.info(this, 'RequirementDelta updated');
    });
  }

  deleteRequirementDelta(requirementDelta: RequirementDelta): void {
    this.requirementDeltaRest.deleteRequirementDelta(requirementDelta.id).subscribe(() => {
      const index: number = this.requirementDeltas.indexOf(requirementDelta, 0);
      this.requirementDeltas.splice(index, 1);
      this.deletedRequirementDelta.emit(requirementDelta);
      this.logger.info(this, 'RequirementDelta deleted');
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

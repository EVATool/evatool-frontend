import { LogService } from '../../../shared/services/log.service';
import { ImpactRestService } from './impact-rest.service';
import { Analysis } from '../../models/Analysis';
import { Dimension } from '../../models/Dimension';
import { Stakeholder } from '../../models/Stakeholder';
import { ImpactMapperService } from './impact-mapper.service';
import { AnalysisDataService } from '../analysis/analysis-data.service';
import { DimensionDataService } from '../dimension/dimension-data.service';
import { StakeholderDataService } from '../stakeholder/stakeholder-data.service';
import { Impact } from '../../models/Impact';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {
  @Output() loadedImpacts: EventEmitter<Impact[]> = new EventEmitter();
  @Output() addedImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() changedImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() removedImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() changedImpacts: EventEmitter<Impact[]> = new EventEmitter();

  impacts: Impact[] = [];
  private impactsLoaded = false;
  stakeholders: Stakeholder[] = [];
  private stakeholdersLoaded = false;
  dimensions: Dimension[] = [];
  private dimensionsLoaded = false;
  analyses: Analysis[] = [];
  private analysesLoaded = false;

  constructor(
    private logger: LogService,
    private impactMapperService: ImpactMapperService,
    private impactRestService: ImpactRestService,
    private stakeholderDataService: StakeholderDataService,
    private dimensionDataService: DimensionDataService,
    private analysisDataService: AnalysisDataService) {
  }

  onInit(): void {
    this.stakeholderDataService.loadedStakeholders.subscribe(stakeholders => {
      this.stakeholders = stakeholders;
      this.stakeholdersLoaded = true;
      this.loadIfChildrenAreLoaded();
    });

    this.dimensionDataService.loadedDimensions.subscribe(dimensions => {
      this.dimensions = dimensions;
      this.dimensionsLoaded = true;
      this.loadIfChildrenAreLoaded();
    });

    this.analysisDataService.loadedAnalyses.subscribe(currentAnalysis => {
      this.analyses = [currentAnalysis];
      this.analysesLoaded = true;
      this.loadIfChildrenAreLoaded();
    });

    this.stakeholderDataService.onInit();
    this.dimensionDataService.onInit();
    this.analysisDataService.onInit();
  }

  private loadIfChildrenAreLoaded(): void {
    if (this.getChildrenLoaded() && !this.impactsLoaded) {
      // Load impacts.
      this.impactRestService.getImpactsByAnalysisId(this.analysisDataService.getCurrentAnalysis().id).subscribe(imps => {
        imps.sort((a, b) => this.sortImpactsById(a, b));
        let fromDtos: Impact[] = [];
        imps.forEach(imp => {
          //this.impacts.push(this.impactMapperService.fromDto(imp, this.dimensions, this.stakeholders, this.analyses));
          fromDtos.push(this.impactMapperService.fromDto(imp, this.dimensions, this.stakeholders, this.analyses));
        });
        this.impacts = fromDtos;
        this.logger.info(this, 'Impacts loaded');
        this.loadedImpacts.emit(this.impacts);
        this.impactsLoaded = true;
      });
    }
  }

  private sortImpactsById(a: Impact, b: Impact): number {
    this.logger.debug(this, 'Sorting Impacts By Id');
    const numberA = + ("" + a.uniqueString?.replace("IMP", ""));
    const numberB = + ("" + b.uniqueString?.replace("IMP", ""));
    return numberA > numberB ? 1 : -1;
  }

  private getChildrenLoaded(): boolean {
    return this.stakeholdersLoaded && this.dimensionsLoaded && this.analysesLoaded;
  }

  private createDefaultImpact(): Impact {
    this.logger.debug(this, 'Create Default Impact');
    const impact = new Impact();

    impact.value = 0.0;
    impact.description = '';
    impact.dimension = this.dimensionDataService.getDefaultDimension();
    impact.stakeholder = this.stakeholderDataService.getDefaultStakeholder();
    impact.analysis = this.analysisDataService.getCurrentAnalysis();

    return impact;
  }

  createImpact(): void {
    this.logger.info(this, 'Create Impact');
    const impact = this.createDefaultImpact();
    const impactDto = this.impactMapperService.toDto(impact);
    this.impactRestService.createImpact(impactDto).subscribe(impDto => {
      impact.id = impDto.id;
      impact.uniqueString = impDto.uniqueString;
      this.impacts.push(impact);
      this.addedImpact.emit(impact);
      this.changedImpacts.emit(this.impacts);
    });
  }

  updateImpact(impact: Impact): void {
    this.logger.info(this, 'Update Impact');
    const impactDto = this.impactMapperService.toDto(impact);
    this.impactRestService.updateImpact(impactDto).subscribe((newImpact: Impact) => {
      this.changedImpact.emit(newImpact);
      // this.changedImpacts.emit(this.impacts);
    });
  }

  deleteImpact(impact: Impact): void {
    this.logger.info(this, 'Delete Impact');
    const impactDto = this.impactMapperService.toDto(impact);
    this.impactRestService.deleteImpact(impactDto).subscribe((impDto) => {
      const index: number = this.impacts.indexOf(impact, 0);
      this.impacts.splice(index, 1);
      this.removedImpact.emit(impact);
      this.changedImpacts.emit(this.impacts);
    });
  }
}

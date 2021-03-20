import { LogServiceService } from '../../settings/LogService.service';
import { ImpactRestService } from './impact-rest.service';
import { DataLoader } from '../../settings/DataLoader';
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
  impactsLoaded = false;
  stakeholders: Stakeholder[] = [];
  stakeholdersLoaded = false;
  dimensions: Dimension[] = [];
  dimensionsLoaded = false;
  analyses: Analysis[] = [];
  analysesLoaded = false;

  constructor(
    private logger: LogServiceService,
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

    this.analysisDataService.loadedAnalyses.subscribe(analyses => {
      this.analyses = analyses;
      this.analysesLoaded = true;
      this.loadIfChildrenAreLoaded();
    });

    this.stakeholderDataService.onInit();
    this.dimensionDataService.onInit();
    this.analysisDataService.onInit();
  }

  private loadIfChildrenAreLoaded(): void {
    if (this.getChildrenLoaded() && !this.impactsLoaded) {
      if (DataLoader.useDummyData) {
        // Load dummy impacts.
        DataLoader.dummyImpactDtos.forEach(imp => {
          this.impacts.push(this.impactMapperService.fromDto(imp, this.dimensions, this.stakeholders, this.analyses));
        });
        this.logger.info('Impacts loaded');
        this.loadedImpacts.emit(this.impacts);
        this.impactsLoaded = true;
      } else {
        // Load impacts.
        this.impactRestService.getImpacts().subscribe(imps => {
          imps.forEach(imp => {
            this.impacts.push(this.impactMapperService.fromDto(imp, this.dimensions, this.stakeholders, this.analyses));
          });
          this.logger.info('Impacts loaded');
          this.logger.info(this.impacts);
          this.loadedImpacts.emit(this.impacts);
        });
      }
    }
  }

  private getChildrenLoaded(): boolean {
    return this.stakeholdersLoaded && this.dimensionsLoaded && this.analysesLoaded;
  }

  private createDefaultImpact(): Impact {
    const impact = new Impact();

    impact.value = 0.0;
    impact.description = '';
    impact.dimension = this.dimensionDataService.getDefaultDimension();
    impact.stakeholder = this.stakeholderDataService.getDefaultStakeholder();
    impact.analysis = this.analysisDataService.getCurrentAnalysis();

    return impact;
  }

  createImpact(): void {
    this.logger.info('Create Impact');
    if (DataLoader.useDummyData) {
      const impact = this.createDefaultImpact();
      this.impacts.push(impact);
      this.addedImpact.emit(impact);
      this.changedImpacts.emit(this.impacts);
    } else {
      const impact = this.createDefaultImpact();
      const impactDto = this.impactMapperService.toDto(impact);
      this.logger.info(impactDto);
      this.impactRestService.createImpact(impactDto).subscribe(impDto => {
        this.impacts.push(impact);
        this.addedImpact.emit(impact);
        this.changedImpacts.emit(this.impacts);
      });
    }
  }

  updateImpact(impact: Impact): void {
    this.logger.info('Update Impact');
    if (DataLoader.useDummyData) {
      // Dummy data does not require any updating.
      this.changedImpact.emit(impact);
      this.changedImpacts.emit(this.impacts);
    } else {
      const impactDto = this.impactMapperService.toDto(impact);
      this.impactRestService.updateImpact(impactDto).subscribe((newImpact: Impact) => {
        this.changedImpact.emit(newImpact);
        // this.changedImpacts.emit(this.impacts);
      });
    }
  }

  deleteImpact(impact: Impact): void {
    this.logger.info('Delete Impact');
    if (DataLoader.useDummyData) {
      const index: number = this.impacts.indexOf(impact, 0);
      this.impacts.splice(index, 1);
      this.removedImpact.emit(impact);
      this.changedImpacts.emit(this.impacts);
    } else {
      const impactDto = this.impactMapperService.toDto(impact);
      this.impactRestService.deleteImpact(impactDto).subscribe((impDto) => {
        const index: number = this.impacts.indexOf(impact, 0);
        this.impacts.splice(index, 1);
        this.removedImpact.emit(impact);
        this.changedImpacts.emit(this.impacts);
      });
    }
  }

  calculateDecimalPlaces(num: number): number {
    return `${num}`.length;
  }
}

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
    if (DataLoader.useDummyData) {
      if (this.getChildrenLoaded() && !this.impactsLoaded) {
        // Load dummy impacts.
        DataLoader.dummyImpactDtos.forEach(imp => {
          this.impacts.push(ImpactMapperService.fromDto(imp, this.dimensions, this.stakeholders, this.analyses));
        });
        console.log('Impacts loaded.');
        this.loadedImpacts.emit(this.impacts);
        this.impactsLoaded = true;
      }
    } else {
      // Load impacts.
      this.impactRestService.getImpacts().subscribe(imps => {
        imps.forEach(imp => {
          this.impacts.push(ImpactMapperService.fromDto(imp, this.dimensions, this.stakeholders, this.analyses));
        });
        console.log('Impacts loaded.');
        console.log(this.impacts);
        this.loadedImpacts.emit(this.impacts);
      });

    }
  }

  private getChildrenLoaded(): boolean {
    return this.stakeholdersLoaded && this.dimensionsLoaded && this.analysesLoaded;
  }

  private createDefaultImpact(): Impact {
    const impact = new Impact();

    impact.id = 'I00' + (this.impacts.length + 1);
    impact.value = 0.0;
    impact.description = '';
    impact.dimension = this.dimensionDataService.getDefaultDimension();
    impact.stakeholder = this.stakeholderDataService.getDefaultStakeholder();
    // impact.analysis = this.analysisDataService.getCurrentAnalyses();???

    return impact;
  }

  createImpact(): void {
    const impact = this.createDefaultImpact();
    this.impacts.push(impact);
    this.addedImpact.emit(impact);
    this.changedImpacts.emit(this.impacts);
  }

  updateImpact(): void {

  }

  deleteImpact(impact: Impact): void {
    const index: number = this.impacts.indexOf(impact, 0);
    this.impacts.splice(index, 1);
    this.removedImpact.emit();
    this.changedImpacts.emit(this.impacts);
  }
}

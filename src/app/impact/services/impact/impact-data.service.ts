import { DataLoader } from '../../settings/DataLoader';
import { Analysis } from './../../models/Analysis';
import { Dimension } from './../../models/Dimension';
import { Stakeholder } from './../../models/Stakeholder';
import { ImpactDto } from './../../dtos/ImpactDto';
import { ImpactMapperService } from './impact-mapper.service';
import { AnalysisDataService } from './../analysis/analysis-data.service';
import { DimensionDataService } from './../dimension/dimension-data.service';
import { StakeholderDataService } from './../stakeholder/stakeholder-data.service';
import { Impact } from './../../models/Impact';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {
  @Output() loadedImpacts: EventEmitter<Impact[]> = new EventEmitter();
  @Output() createImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() updateImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() deleteImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() changedImpacts: EventEmitter<Impact[]> = new EventEmitter();

  dummyImpactDtos: any[] = [
    {
      id: '1',
      value: -0.3,
      description: 'This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact ',
      dimensionDto: { id: '1' },
      stakeholderDto: { id: '1' },
      analysisDto: { id: '1' }
    },
    {
      id: '2',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimensionDto: { id: '4' },
      stakeholderDto: { id: '1' },
      analysisDto: { id: '1' }
    },
    {
      id: '3',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimensionDto: { id: '2' },
      stakeholderDto: { id: '4' },
      analysisDto: { id: '1' }
    },
    {
      id: '4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimensionDto: { id: '2' },
      stakeholderDto: { id: '3' },
      analysisDto: { id: '1' }
    }
  ];

  impacts: Impact[] = [];
  impactsLoaded = false;
  stakeholders: Stakeholder[] = [];
  stakeholdersLoaded = false;
  dimensions: Dimension[] = [];
  dimensionsLoaded = false;
  analyses: Analysis[] = [];
  analysesLoaded = false;

  constructor(
    private stakeholderDataService: StakeholderDataService,
    private dimensionDataService: DimensionDataService,
    private analysisDataService: AnalysisDataService) {
  }

  onInit() {
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

  private loadIfChildrenAreLoaded() {
    if (DataLoader.useDummyData) {
      if (this.getChildrenLoaded() && !this.impactsLoaded) {
        // Load dummy dimensions.
        this.dummyImpactDtos.forEach(imp => {
          this.impacts.push(ImpactMapperService.fromDto(imp, this.dimensions, this.stakeholders, this.analyses));
        });
        console.log('Impacts loaded.');
        this.loadedImpacts.emit(this.impacts);
        this.impactsLoaded = true;
      }
    } else {

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
    //impact.analysis = this.analysisDataService.???

    return impact;
  }

  // Wrong! Only temporary
  addImpact(): void {
    const impact = this.createDefaultImpact();
    this.impacts.push(impact);
    this.createImpact.emit(impact);
    this.changedImpacts.emit(this.impacts);
  }

  // Wrong! Only temporary
  removeImpact(impact: Impact): void {
    const index: number = this.impacts.indexOf(impact, 0);
    this.impacts.splice(index, 1);
    this.deleteImpact.emit();
    this.changedImpacts.emit(this.impacts);
  }
}

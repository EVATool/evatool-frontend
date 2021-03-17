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

  dummyImpactDtos: ImpactDto[] = [
    {
      id: '1',
      value: -0.3,
      description: 'This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact ',
      dimensionDto: { id: '21', name: 'Feelings', description: 'Feelings of Patient ', type: 'SOCIAL' },
      stakeholderDto: { id: '11', name: 'Patient' },
      analysisDto: { id: '7' }
    },
    {
      id: '2',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimensionDto: { id: '22', name: 'Control', description: 'Control of Doctor', type: 'SOCIAL' },
      stakeholderDto: { id: '12', name: 'Doctor' },
      analysisDto: { id: '7' }
    },
    {
      id: '3',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimensionDto: { id: '23', name: 'Finances', description: 'Economics of Family', type: 'ECONOMIC' },
      stakeholderDto: { id: '13', name: 'Family' },
      analysisDto: { id: '7' }
    },
    {
      id: '4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimensionDto: { id: '24', name: 'Safety', description: 'Lorem Ipsum', type: 'SOCIAL' },
      stakeholderDto: { id: '14', name: 'Ensurance' },
      analysisDto: { id: '7' }
    }
  ];

  impacts: Impact[] = [];

  constructor(
    private stakeholderDataService: StakeholderDataService,
    private dimensionDataService: DimensionDataService,
    private analysisDataService: AnalysisDataService) {
    // Load dummy dimensions.
    this.dummyImpactDtos.forEach(imp => {
      this.impacts.push(ImpactMapperService.fromDto(imp, [], [], []));
    });
    this.loadedImpacts.emit(this.impacts);
  }

  onInit() {

  }

  invalidate() {
    if (this.impacts.length > 0) {
      this.loadedImpacts.emit(this.impacts);
    }
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

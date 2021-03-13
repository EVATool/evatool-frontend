import { DimensionDataService } from './../dimension/dimension-data.service';
import { Stakeholder } from './../../models/Stakeholder';
import { StakeholderDataService } from './../stakeholder/stakeholder-data.service';
import { Analysis } from './../../models/Analysis';
import { Impact } from './../../models/Impact';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {
  @Output() createImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() updateImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() deleteImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() loadedImpacts: EventEmitter<Impact> = new EventEmitter();

  dummyImpacts: Impact[] = [
    {
      id: '1',
      value: -0.3,
      description: 'This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact This is the first read-only impact ',
      dimension: { id: '21', name: 'Feelings', description: 'Feelings of Patient ', type: 'SOCIAL' },
      stakeholder: { id: '11', name: 'Patient' },
      analysis: { id: '7' }
    },
    {
      id: '2',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '22', name: 'Control', description: 'Control of Doctor', type: 'SOCIAL' },
      stakeholder: { id: '12', name: 'Doctor' },
      analysis: { id: '7' }
    },
    {
      id: '3',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances', description: 'Economics of Family', type: 'ECONOMIC' },
      stakeholder: { id: '13', name: 'Family' },
      analysis: { id: '7' }
    },
    {
      id: '4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety', description: 'Lorem Ipsum', type: 'SOCIAL' },
      stakeholder: { id: '14', name: 'Ensurance' },
      analysis: { id: '7' }
    }
  ];

  impacts: Impact[] = this.dummyImpacts;

  constructor(
    private stakeholderDataService: StakeholderDataService,
    private dimensionDataService: DimensionDataService) {
    for (const impact of this.impacts) {
      impact.stakeholder = this.stakeholderDataService.getStakeholders()[Math.floor(Math.random() * Math.floor(4))];
      impact.dimension = this.dimensionDataService.getDimensions()[Math.floor(Math.random() * Math.floor(4))];
    }
    this.loadedImpacts.emit();
  }

  getImpacts(): Impact[] {
    return this.impacts;
  }

  private createDefaultImpact(): Impact {
    const impact = new Impact();

    impact.id = 'TEST';
    impact.value = -0.9;
    impact.description = '';
    impact.dimension = this.dimensionDataService.getDefaultDimension();
    impact.stakeholder = this.stakeholderDataService.getDefaultStakeholder();

    return impact;
  }

  addImpact(): Impact {
    const impact = this.createDefaultImpact();
    this.impacts.push(impact);
    this.createImpact.emit(impact);
    return impact;
  }
}

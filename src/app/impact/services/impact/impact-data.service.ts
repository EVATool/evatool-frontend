import { Analysis } from './../../models/Analysis';
import { Impact } from './../../models/Impact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {

  dummyImpacts: Impact[] = [
    {
      id: '1',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { id: '21', name: 'Feelings', description: 'Feelings of Patient', type: 'SOCIAL' },
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

  constructor() {

  }

  getImpacts(): Impact[] {
    return this.impacts;
  }
}

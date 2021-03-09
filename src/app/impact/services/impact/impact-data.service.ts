import { Analysis } from './../../models/Analysis';
import { Stakeholder } from './../../models/Stakeholder';
import { Impact } from './../../models/Impact';
import { Injectable } from '@angular/core';
import { Dimension } from '../../models/Dimension';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {

  constructor() {

  }

  getImpacts(): Impact[] {
    return [
      {
        id: '1',
        value: -0.3,
        description: 'This is the first read-only impact',
        dimension!: new Dimension,
        stakeholder!: new Stakeholder,
        analysis!: new Analysis
      },
      {
        id: '2',
        value: 0.5,
        description: 'This is the first read-only impact',
        dimension!: new Dimension,
        stakeholder!: new Stakeholder,
        analysis!: new Analysis
      },
      {
        id: '3',
        value: 0.9,
        description: 'This is the first read-only impact',
        dimension!: new Dimension,
        stakeholder!: new Stakeholder,
        analysis!: new Analysis
      }
    ];
  }
}

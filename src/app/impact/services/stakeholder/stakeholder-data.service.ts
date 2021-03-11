import { Stakeholder } from './../../models/Stakeholder';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {

  dummyStakeholders: Stakeholder[] = [
    {
      id: '11', name: 'Patient'
    },
    {
      id: '12', name: 'Doctor'
    },
    {
      id: '13', name: 'Family'
    },
    {
      id: '14', name: 'Ensurance'
    }
  ];

  stakeholders: Stakeholder[] = this.dummyStakeholders;

  constructor() {

  }

  getStakeholders(): Stakeholder[] {
    return this.stakeholders;
  }

  getDefaultStakeholder(): Stakeholder {
    return this.stakeholders[0];
  }
}

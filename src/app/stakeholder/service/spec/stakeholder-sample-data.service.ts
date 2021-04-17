import { Injectable } from '@angular/core';
import {StakeholderDTO} from '../../model/StakeholderDTO';
import {Impact} from '../../../impact/models/Impact';
import {Stakeholder} from '../../model/Stakeholder';

@Injectable({
  providedIn: 'root'
})
export class StakeholderSampleDataService {

  constructor() { }

  dummyStakeholderDTOs: StakeholderDTO[] = [
    {
      rootEntityID: '1',
      stakeholderName: 'name1',
      priority: 'p1',
      guiId: 'st1',
      analysisId: 'an1',
      stakeholderLevel: 'lv1',
      impactList: []
    },
    {
      rootEntityID: '2',
      stakeholderName: 'name2',
      priority: 'p2',
      guiId: 'st2',
      analysisId: 'an2',
      stakeholderLevel: 'lv2',
      impactList: []
    },
    {
      rootEntityID: '3',
      stakeholderName: 'name3',
      priority: 'p3',
      guiId: 'st3',
      analysisId: 'an3',
      stakeholderLevel: 'lv3',
      impactList: []
    },
  ];

  readonly dummyStakeholder: Stakeholder[] = [
    {
      id: '1',
      name: 'name1',
      level: 'lv1',
      created: false,
      editable: false,
      guiId: 'st1',
      priority: 'p1',
      analysisId: 'an1',
      negativeImpact: 0,
      positiveImpact: 0
    },
    {
      id: '2',
      name: 'name2',
      level: 'lv2',
      created: false,
      editable: false,
      guiId: 'st2',
      priority: 'p2',
      analysisId: 'an2',
      negativeImpact: 0,
      positiveImpact: 0
    },
    {
      id: '3',
      name: 'name3',
      level: 'lv3',
      created: false,
      editable: false,
      guiId: 'st3',
      priority: 'p3',
      analysisId: 'an3',
      negativeImpact: 0,
      positiveImpact: 0
    },
  ];

  public stakeholderDummyDTOS = this.dummyStakeholderDTOs;

  setup(): void {
    this.stakeholderDummyDTOS = this.dummyStakeholderDTOs;
  }

  delete(): void {
    this.stakeholderDummyDTOS.pop();
  }

  getdummyStakeholderDTOs(): StakeholderDTO[] {
    return this.dummyStakeholderDTOs;
  }

  getdummyStakeholderDTO(): StakeholderDTO {
    return this.dummyStakeholderDTOs[0];
  }

  getdummyStakeholder(): Stakeholder {
    return this.dummyStakeholder[0];
  }
}

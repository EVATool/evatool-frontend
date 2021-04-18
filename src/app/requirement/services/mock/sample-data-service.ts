import {Injectable} from '@angular/core';
import {Requirements} from '../../models/Requirements';

@Injectable({
  provideIn: 'root'
})

export class RequirementSampleDataService{
  constructor() {}

  dummyRequirements: Requirements[] = [
    {
      rootEntityId : '1',
      projectID : 'P1',
      uniqueString : 'TEST1',
      requirementDescription : 'TESTREQ1',
      values : [],
      requirementImpactPoints : [],
      variantsTitle : [],
    },
    {
      rootEntityId : '2',
      projectID : 'P2',
      uniqueString : 'TEST2',
      requirementDescription : 'TESTREQ2',
      values : [],
      requirementImpactPoints : [],
      variantsTitle : [],
    },
    {
      rootEntityId : '3',
      projectID : 'P3',
      uniqueString : 'TEST3',
      requirementDescription : 'TESTREQ3',
      values : [],
      requirementImpactPoints : [],
      variantsTitle : [],
    },
  ];

  public dummyReq = this.dummyRequirements;

  getDummyRequirements(): Requirements[] {
    return this.dummyReq;
  }

  getDummyRequirement(): Requirements {
    return this.dummyReq[0];
  }

  update(): void {
    this.dummyReq = this.dummyRequirements;
  }

  delete(): void {
    this.dummyReq.pop();
  }

  setup(): void{
    this.dummyReq = this.dummyReq;
  }
}

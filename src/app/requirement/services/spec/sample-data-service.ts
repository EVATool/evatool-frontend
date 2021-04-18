import {Injectable} from '@angular/core';
import {Requirements} from '../../models/Requirements';
import {VariantDTO} from '../../../variant/models/VariantDTO';
import {Variant} from '../../../variant/models/Variant';

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {
  constructor() {}


  //Requirement
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

  //Variants

  dummyVariantDTOs: VariantDTO[] = [
    {
      id: '1',
      guiId: 'Var1',
      archived: false,
      subVariant: [],
      description: 'Description',
      title: 'Title',
      analysisId: '1'
    },
    {
      id: '2',
      guiId: 'Var2',
      archived: false,
      subVariant: [],
      description: 'Description',
      title: 'Title',
      analysisId: '1'
    },
    {
      id: '3',
      guiId: 'Var3',
      archived: false,
      subVariant: [],
      description: 'Description',
      title: 'Title',
      analysisId: '1'
    },
  ];

  dummyVariantDTOsArchived: VariantDTO[] = [
    {
      id: '1',
      guiId: 'Var1',
      archived: true,
      subVariant: [],
      description: 'Description',
      title: 'Title',
      analysisId: '1'
    },
    {
      id: '2',
      guiId: 'Var2',
      archived: false,
      subVariant: [],
      description: 'Description',
      title: 'Title',
      analysisId: '1'
    },
    {
      id: '3',
      guiId: 'Var3',
      archived: false,
      subVariant: [],
      description: 'Description',
      title: 'Title',
      analysisId: '1'
    },
  ];


  readonly dummyVariants: Variant[] = [
    {
      id: '1',
      guiId: 'Var1',
      description: 'Description',
      analysisId: '1',
      archived: false,
      editable: false,
      title: 'Titel 1'
    },
    {
      id: '2',
      guiId: 'Var2',
      description: 'Description',
      analysisId: '1',
      archived: false,
      editable: false,
      title: 'Titel 1'
    },
    {
      id: '3',
      guiId: 'Var3',
      description: 'Description',
      analysisId: '1',
      archived: false,
      editable: false,
      title: 'Titel 1'
    }
  ];


}

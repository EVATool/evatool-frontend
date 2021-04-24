import {Injectable} from '@angular/core';
import {Requirements} from '../../models/Requirements';
import {VariantDTO} from '../../../variant/models/VariantDTO';
import {Variant} from '../../../variant/models/Variant';
import {ValueDto} from '../../models/ValueDto';
import {Value} from '../../../impact/models/Value';
import {Impact} from '../../models/Impact';

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {
  constructor() {}


  // Requirement test data
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

  // Variants test data

  dummyVariantDTOs: VariantDTO[] = [
    {
      id: '1', guiId: 'Var1', archived: false, subVariant: [], description: 'Description', title: 'Title', analysisId: '1'
    },
    {
      id: '2', guiId: 'Var2', archived: false, subVariant: [], description: 'Description', title: 'Title', analysisId: '2'
    },
    {
      id: '3', guiId: 'Var3', archived: false, subVariant: [], description: 'Description', title: 'Title', analysisId: '3'
    },
  ];

  dummyVariantDTOsArchived: VariantDTO[] = [
    {
      id: '1', guiId: 'Var1', archived: true, subVariant: [], description: 'Description', title: 'Title', analysisId: '1'
    },
    {
      id: '2', guiId: 'Var2', archived: false, subVariant: [], description: 'Description', title: 'Title', analysisId: '2'
    },
    {
      id: '3', guiId: 'Var3', archived: false, subVariant: [], description: 'Description', title: 'Title', analysisId: '3'
    },
  ];


  readonly dummyVariants: Variant[] = [
    {
      id: '1', guiId: 'Var1', description: 'Description', analysisId: '1', archived: false, editable: false, title: 'Titel 1'
    },
    {
      id: '2', guiId: 'Var2', description: 'Description', analysisId: '1', archived: false, editable: false, title: 'Titel 1'
    },
    {
      id: '3', guiId: 'Var3', description: 'Description', analysisId: '1', archived: false, editable: false, title: 'Titel 1'
    }
  ];

  public dummyDTOS = this.dummyVariantDTOs;

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

  getDummyVariants(): Variant[] {
    return this.dummyVariants;
  }

  getDummyVariant(): Variant {
    return this.dummyVariants[0];
  }

  getDummyVariantDTOs(): VariantDTO[] {
    return this.dummyDTOS;
  }

  getDummyVariantDTO(): VariantDTO {
    return this.dummyVariantDTOs[0];
  }

  setupVariants(): void {
    this.dummyDTOS = this.dummyVariantDTOs;
  }

  readonly dummyValueDtos: ValueDto[] = [
    {
      entityId: '1', valueTitle: 'Feelings'
    },
    {
      entityId: '2', valueTitle: 'Control'
    },
    {
      entityId: '3', valueTitle: 'Finances'
    },
    {
      entityId: '4', valueTitle: 'Safety'
    },
    {
      entityId: '5', valueTitle: 'Care'
    },
    {
      entityId: '6', valueTitle: 'Privacy'
    },
    {
      entityId: '7', valueTitle: 'Self-Conception'
    },
    {
      entityId: '8', valueTitle: 'Participation'
    },
    {
      entityId: '9', valueTitle: 'Autonomy'
    },
  ];

  readonly dummyValues: Value[] = [];

  readonly dummyImpacts: Impact[] = [
    {
      id: '1', uniqueString: 'IMP1', value: 0, description: 'This is the first dummy Impact', valueSystem: this.dummyValueDtos[0]
    },
    {
      id: '2', uniqueString: 'IMP2', value: 0, description: 'This is the second dummy Impact', valueSystem: this.dummyValueDtos[1]
    },
    {
      id: '3', uniqueString: 'IMP3', value: 0, description: 'This is the third dummy Impact', valueSystem: this.dummyValueDtos[2]
    },
    {
      id: '4', uniqueString: 'IMP4', value: 0, description: 'This is the fourth dummy Impact', valueSystem: this.dummyValueDtos[3]
    },
    {
      id: '5', uniqueString: 'IMP5', value: 0, description: 'This is the fifth dummy Impact', valueSystem: this.dummyValueDtos[4]
    },
    {
      id: '6', uniqueString: 'IMP6', value: 0, description: 'This is the sixth dummy Impact', valueSystem: this.dummyValueDtos[5]
    },
    {
      id: '7', uniqueString: 'IMP7', value: 0, description: 'This is the seventh dummy Impact', valueSystem: this.dummyValueDtos[6]
    },
    {
      id: '8', uniqueString: 'IMP8', value: 0, description: 'This is the eighth dummy Impact', valueSystem: this.dummyValueDtos[7]
    },
    {
      id: '9', uniqueString: 'IMP9', value: 0, description: 'This is the ninth dummy Impact', valueSystem: this.dummyValueDtos[8]
    },
    {
      id: '10', uniqueString: 'IMP10', value: 0, description: 'This is the tenth dummy Impact', valueSystem: this.dummyValueDtos[9]
    },
  ];
}



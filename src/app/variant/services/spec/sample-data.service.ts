import {Injectable} from '@angular/core';
import {Variant} from '../../models/Variant';
import {VariantDTO} from '../../models/VariantDTO';


@Injectable({
  providedIn: 'root'
})
export class VariantSampleDataService {

  constructor() {

  }

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

  public dummyDTOS = this.dummyVariantDTOs;

  getDummyVariants(): Variant[] {
    return this.dummyVariants;
  }

  getDummyVariant(): Variant {
    return this.dummyVariants[0];
  }

  update(): void {
    this.dummyDTOS = this.dummyVariantDTOsArchived;
  }

  getDummyVariantDTOs(): VariantDTO[] {
    return this.dummyDTOS;
  }

  getDummyVariantDTO(): VariantDTO {
    return this.dummyVariantDTOs[0];
  }

  delete(): void {
      this.dummyDTOS.pop();
  }

  setup(): void {
    this.dummyDTOS = this.dummyVariantDTOs;
  }
}


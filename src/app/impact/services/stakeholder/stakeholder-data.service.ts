import { StakeholderDto } from './../../dtos/StakeholderDto';
import { StakeholderMapperService } from './stakeholder-mapper.service';
import { StakeholderRestService } from './stakeholder-rest.service';
import { Stakeholder } from './../../models/Stakeholder';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {
  @Output() stakeholdersLoaded: EventEmitter<Stakeholder[]> = new EventEmitter();

  dummyStakeholderDtos: StakeholderDto[] = [
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

  stakeholders: Stakeholder[] = [];

  constructor(private stakeholderRestService: StakeholderRestService) {
    // Load dummy stakeholders.
    this.dummyStakeholderDtos.forEach(stk => {
      this.stakeholders.push(StakeholderMapperService.fromDto(stk));
    });
    this.stakeholdersLoaded.emit(this.stakeholders);
  }

  onInit() {

  }

  getDefaultStakeholder(): Stakeholder {
    return this.stakeholders[0];
  }
}

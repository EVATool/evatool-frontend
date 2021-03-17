import { DataLoader } from '../../settings/DataLoader';
import { StakeholderDto } from './../../dtos/StakeholderDto';
import { StakeholderMapperService } from './stakeholder-mapper.service';
import { StakeholderRestService } from './stakeholder-rest.service';
import { Stakeholder } from './../../models/Stakeholder';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {
  @Output() loadedStakeholders: EventEmitter<Stakeholder[]> = new EventEmitter();

  dummyStakeholderDtos: StakeholderDto[] = [
    {
      id: '1', name: 'Patient'
    },
    {
      id: '2', name: 'Doctor'
    },
    {
      id: '3', name: 'Family'
    },
    {
      id: '4', name: 'Ensurance'
    }
  ];

  stakeholders: Stakeholder[] = [];

  constructor(private stakeholderRestService: StakeholderRestService) {

  }

  onInit() {
    if (DataLoader.useDummyData) {
      // Load dummy stakeholders.
      this.dummyStakeholderDtos.forEach(stk => {
        this.stakeholders.push(StakeholderMapperService.fromDto(stk));
      });
      console.log('Stakeholders loaded.');
      this.loadedStakeholders.emit(this.stakeholders);
    } else {

    }
  }

  invalidate() {
    if (this.stakeholders.length > 0) {
      this.loadedStakeholders.emit(this.stakeholders);
    }
  }

  getDefaultStakeholder(): Stakeholder {
    return this.stakeholders[0];
  }
}

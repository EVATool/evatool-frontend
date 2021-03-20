import { LogServiceService } from '../../settings/log-service.service';
import { DataLoader } from '../../settings/DataLoader';
import { StakeholderMapperService } from './stakeholder-mapper.service';
import { StakeholderRestService } from './stakeholder-rest.service';
import { Stakeholder } from '../../models/Stakeholder';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {
  @Output() loadedStakeholders: EventEmitter<Stakeholder[]> = new EventEmitter();

  stakeholders: Stakeholder[] = [];

  constructor(
    private logger: LogServiceService,
    private stakeholderMapperService: StakeholderMapperService,
    private stakeholderRestService: StakeholderRestService) { }

  onInit(): void {
    if (DataLoader.useDummyData) {
      // Load dummy Stakeholders.
      DataLoader.dummyStakeholderDtos.forEach(stk => {
        this.stakeholders.push(this.stakeholderMapperService.fromDto(stk));
      });
      this.logger.info('Stakeholders loaded.');
      this.loadedStakeholders.emit(this.stakeholders);
    } else {
      // Load stakeholders.
      this.stakeholderRestService.getStakeholders().subscribe(stks => {
        stks.forEach(stk => {
          this.stakeholders.push(this.stakeholderMapperService.fromDto(stk));
        });
        this.logger.info('Stakeholders loaded.');
        this.logger.info(this.stakeholders);
        this.loadedStakeholders.emit(this.stakeholders);
      });
    }
  }

  getDefaultStakeholder(): Stakeholder {
    return this.stakeholders[0];
  }
}

import { LogService } from '../../../shared/services/log.service';
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
    private logger: LogService,
    private stakeholderMapperService: StakeholderMapperService,
    private stakeholderRestService: StakeholderRestService) { }

  onInit(): void {
    // Load stakeholders.
    this.stakeholderRestService.getStakeholders().subscribe(stks => {
      let fromDtos: Stakeholder[] = [];
      stks.forEach(stk => {
        fromDtos.push(this.stakeholderMapperService.fromDto(stk));
        //this.stakeholders.push(this.stakeholderMapperService.fromDto(stk));
      });
      this.stakeholders = fromDtos;
      this.logger.info(this, 'Stakeholders loaded');
      this.loadedStakeholders.emit(this.stakeholders);
    });
  }

  getDefaultStakeholder(): Stakeholder {
    this.logger.debug(this, 'Get Default Stakeholder');
    return this.stakeholders[0];
  }
}

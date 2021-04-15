import {LogService} from '../../../shared/services/log.service';
import {StakeholderMapperService} from './stakeholder-mapper.service';
import {StakeholderRestService} from './stakeholder-rest.service';
import {Stakeholder} from '../../models/Stakeholder';
import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {
  @Output() loadedStakeholders: EventEmitter<Stakeholder[]> = new EventEmitter();

  stakeholders: Stakeholder[] = [];

  constructor(
    private logger: LogService,
    private stakeholderMapperService: StakeholderMapperService,
    private stakeholderRestService: StakeholderRestService) {
  }

  onInit(): void {
    // Load stakeholders.
    this.stakeholderRestService.getStakeholders().subscribe(stks => {
      const fromDtos: Stakeholder[] = [];
      stks.forEach(stk => {
        fromDtos.push(this.stakeholderMapperService.fromDto(stk));
      });
      this.stakeholders = fromDtos;
      this.logger.info(this, 'Stakeholders loaded');
      this.loadedStakeholders.emit(this.stakeholders);
    });
  }

  reload(): void {
    // Reload stakeholders.
    this.stakeholderRestService.getStakeholders().subscribe(stks => {
      const fromDtos: Stakeholder[] = [];
      stks.forEach(stk => {
        fromDtos.push(this.stakeholderMapperService.fromDto(stk));
      });

      fromDtos.forEach(stakeholder => {
        var foundStakeholder = this.stakeholders.find(s => s.id === stakeholder.id);
        if (foundStakeholder !== undefined) { // Update
          foundStakeholder.level = stakeholder.level;
          foundStakeholder.name = stakeholder.name;
        } else {
          // Remove

          // Add

        }
      });
      //this.stakeholders = fromDtos;
      this.logger.info(this, 'Stakeholders loaded');
      //this.loadedStakeholders.emit(this.stakeholders);
    });
  }

  getDefaultStakeholder(): Stakeholder {
    this.logger.debug(this, 'Get Default Stakeholder');
    return this.stakeholders[0];
  }
}

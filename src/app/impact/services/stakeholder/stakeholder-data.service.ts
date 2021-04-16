import {LogService} from '../../../shared/services/log.service';
import {StakeholderMapperService} from './stakeholder-mapper.service';
import {StakeholderRestService} from './stakeholder-rest.service';
import {Stakeholder} from '../../models/Stakeholder';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {AnalysisDataService} from "../analysis/analysis-data.service";

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {
  @Output() loadedStakeholders: EventEmitter<Stakeholder[]> = new EventEmitter();
  @Output() changedStakeholders: EventEmitter<Stakeholder[]> = new EventEmitter();

  stakeholders: Stakeholder[] = [];

  constructor(
    private logger: LogService,
    private stakeholderMapperService: StakeholderMapperService,
    private stakeholderRestService: StakeholderRestService,
    private analysisDataService: AnalysisDataService) {
  }

  onInit(): void {
    // Load stakeholders.
    this.analysisDataService.loadedAnalyses.subscribe(analysis => {
      this.stakeholderRestService.getStakeholders(analysis.id).subscribe(stks => {
        const fromDtos: Stakeholder[] = [];
        stks.forEach(stk => {
          fromDtos.push(this.stakeholderMapperService.fromDto(stk));
        });
        this.stakeholders = fromDtos;
        this.logger.info(this, 'Stakeholders loaded');
        this.loadedStakeholders.emit(this.stakeholders);
      });
    });
  }

  reload(): void {
    // Reload stakeholders.
    this.stakeholderRestService.getStakeholders(this.analysisDataService.getCurrentAnalysis().id).subscribe(stks => {
      const newStakeholders: Stakeholder[] = [];
      stks.forEach(stk => {
        newStakeholders.push(this.stakeholderMapperService.fromDto(stk));
      });
      const oldStakeholders = this.stakeholders;

      newStakeholders.forEach(stakeholder => {
        var foundStakeholder = oldStakeholders.find(s => s.id === stakeholder.id);
        if (foundStakeholder !== undefined) { // Update
          foundStakeholder.level = stakeholder.level;
          foundStakeholder.name = stakeholder.name;
        } else { // Remove
          oldStakeholders.push(stakeholder);
        }
      });

      oldStakeholders.forEach(stakeholder => {
        var foundOldStakeholder = newStakeholders.find(s => s.id === stakeholder.id);
        if (foundOldStakeholder === undefined) { // Add
          var removeStakeholder = oldStakeholders.find(s => s.id === stakeholder.id);
          // @ts-ignore
          const index: number = oldStakeholders.indexOf(removeStakeholder, 0);
          oldStakeholders.splice(index, 1);
        }
      });

      this.logger.info(this, 'Stakeholders loaded');
      this.changedStakeholders.emit(this.stakeholders);
    });
  }

  getDefaultStakeholder(): Stakeholder {
    this.logger.debug(this, 'Get Default Stakeholder');
    return this.stakeholders[0];
  }
}

import {EventEmitter, Injectable, Output} from '@angular/core';
import {DataService} from "../data.service";
import {LogService} from "../log.service";
import {AnalysisDataService} from "./analysis-data.service";
import {StakeholderRestService} from "../rest/stakeholder-rest.service";
import {StakeholderMapperService} from "../mapper/stakeholder-mapper.service";
import {Stakeholder} from "../../model/Stakeholder";
import {Analysis} from "../../model/Analysis";
import {StakeholderDto} from "../../dto/StakeholderDto";

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService extends DataService {
  @Output() loadedStakeholders: EventEmitter<Stakeholder[]> = new EventEmitter();
  @Output() loadedStakeholderPriorities: EventEmitter<string[]> = new EventEmitter();
  @Output() loadedStakeholderLevels: EventEmitter<string[]> = new EventEmitter();
  @Output() createdStakeholder: EventEmitter<Stakeholder> = new EventEmitter();
  @Output() updatedStakeholder: EventEmitter<Stakeholder> = new EventEmitter();
  @Output() deletedStakeholder: EventEmitter<Stakeholder> = new EventEmitter();

  stakeholders: Stakeholder[] = [];
  stakeholderPriorities: string[] = [];
  stakeholderLevels: string[] = [];

  constructor(protected logger: LogService,
              private stakeholderRest: StakeholderRestService,
              private stakeholderMapper: StakeholderMapperService,
              private analysisData: AnalysisDataService) {
    super(logger);
  }

  init(): void {
    // Load Stakeholders.
    this.analysisData.loadedCurrentAnalysis.subscribe((analysis: Analysis) => {
      this.stakeholderRest.getStakeholdersByAnalysisId(analysis.id).subscribe((stakeholderDtoList: StakeholderDto[]) => {
        this.stakeholders = [];
        stakeholderDtoList.forEach(stakeholderDto => {
          this.stakeholders.push(this.stakeholderMapper.fromDto(stakeholderDto, [this.analysisData.currentAnalysis]));
        });
        this.loadedStakeholders.emit(this.stakeholders);
        this.logger.info(this, 'Stakeholders loaded');
      });
    });

    // Load Stakeholder Priorities.
    this.stakeholderRest.getStakeholderPriorities().subscribe((stakeholderPriorities: string[]) => {
      stakeholderPriorities.forEach((stakeholderPriority: string) => this.stakeholderPriorities.push(stakeholderPriority));
      this.loadedStakeholderPriorities.emit(this.stakeholderPriorities);
    });

    // Load Stakeholder Levels.
    this.stakeholderRest.getStakeholderLevels().subscribe((stakeholderLevels: string[]) => {
      stakeholderLevels.forEach((stakeholderLevel: string) => this.stakeholderLevels.push(stakeholderLevel));
      this.loadedStakeholderLevels.emit(this.stakeholderLevels);
    });
  }

  createStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.createStakeholder(this.stakeholderMapper.toDto(stakeholder)).subscribe((stakeholderDto: StakeholderDto) => {
      const createdStakeholder = this.stakeholderMapper.fromDto(stakeholderDto, [this.analysisData.currentAnalysis]);
      this.stakeholders.push(createdStakeholder);
      this.createdStakeholder.emit(createdStakeholder);
      this.logger.info(this, 'Stakeholder created');
    });
  }

  updateStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.updateStakeholder(this.stakeholderMapper.toDto(stakeholder)).subscribe((stakeholderDto: StakeholderDto) => {
      const updatedStakeholder = this.stakeholderMapper.fromDto(stakeholderDto, [this.analysisData.currentAnalysis]);
      this.updatedStakeholder.emit(updatedStakeholder);
      this.logger.info(this, 'Stakeholder updated');
    });
  }

  deleteStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.deleteStakeholder(stakeholder.id).subscribe(() => {
      const index: number = this.stakeholders.indexOf(stakeholder, 0);
      this.stakeholders.splice(index, 1);
      this.deletedStakeholder.emit(stakeholder);
      this.logger.info(this, 'Stakeholder deleted');
    });
  }

  createDefaultStakeholder(analysis: Analysis): Stakeholder {
    const stakeholder = new Stakeholder();

    stakeholder.name = '';
    stakeholder.priority = this.stakeholderPriorities[0];
    stakeholder.level = this.stakeholderLevels[0];
    stakeholder.analysis = analysis; // this.analysisData.currentAnalysis;

    return stakeholder;
  }
}

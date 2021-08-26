import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {DataService} from '../data.service';
import {LogService} from '../log.service';
import {AnalysisDataService} from './analysis-data.service';
import {StakeholderRestService} from '../rest/stakeholder-rest.service';
import {StakeholderMapperService} from '../mapper/stakeholder-mapper.service';
import {Stakeholder} from '../../model/Stakeholder';
import {Analysis} from '../../model/Analysis';
import {StakeholderDto} from '../../dto/StakeholderDto';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() loadedStakeholders: EventEmitter<Stakeholder[]> = new EventEmitter();
  @Output() loadedStakeholderPriorities: EventEmitter<string[]> = new EventEmitter();
  @Output() loadedStakeholderLevels: EventEmitter<string[]> = new EventEmitter();
  @Output() createdStakeholder: EventEmitter<Stakeholder> = new EventEmitter();
  @Output() updatedStakeholder: EventEmitter<Stakeholder> = new EventEmitter();
  @Output() deletedStakeholder: EventEmitter<Stakeholder> = new EventEmitter();

  stakeholdersLoaded = false;
  stakeholders: Stakeholder[] = [];
  stakeholderPriorities: string[] = [];
  stakeholderLevels: string[] = [];

  constructor(protected logger: LogService,
              private stakeholderRest: StakeholderRestService,
              private stakeholderMapper: StakeholderMapperService,
              private analysisData: AnalysisDataService) {
    super(logger);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    // Load Stakeholders.
    this.analysisData.loadedCurrentAnalysis
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysis: Analysis) => {
        this.stakeholdersLoaded = false;
        this.stakeholderRest.getStakeholdersByAnalysisId(analysis.id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((stakeholderDtoList: StakeholderDto[]) => {
            this.stakeholders = [];
            stakeholderDtoList.forEach(stakeholderDto => {
              this.stakeholders.push(this.stakeholderMapper.fromDto(stakeholderDto, [this.analysisData.currentAnalysis]));
            });
            this.stakeholders = this.sortDefault(this.stakeholders);
            this.stakeholdersLoaded = true;
            this.loadedStakeholders.emit(this.stakeholders);
            this.logger.info(this, 'Stakeholders loaded');
          });

        // Load Stakeholder Priorities.
        this.stakeholderRest.getStakeholderPriorities()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((stakeholderPriorities: string[]) => {
            this.stakeholderPriorities = [];
            stakeholderPriorities.forEach((stakeholderPriority: string) => this.stakeholderPriorities.push(stakeholderPriority));
            this.loadedStakeholderPriorities.emit(this.stakeholderPriorities);
          });

        // Load Stakeholder Levels.
        this.stakeholderRest.getStakeholderLevels()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((stakeholderLevels: string[]) => {
            this.stakeholderLevels = [];
            stakeholderLevels.forEach((stakeholderLevel: string) => this.stakeholderLevels.push(stakeholderLevel));
            this.loadedStakeholderLevels.emit(this.stakeholderLevels);
          });
      });
  }

  createStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.createStakeholder(this.stakeholderMapper.toDto(stakeholder))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholderDto: StakeholderDto) => {
        const createdStakeholder = this.stakeholderMapper.fromDto(stakeholderDto, [this.analysisData.currentAnalysis]);
        this.stakeholders.push(createdStakeholder);
        this.createdStakeholder.emit(createdStakeholder);
        this.logger.info(this, 'Stakeholder created');
      });
  }

  updateStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.updateStakeholder(this.stakeholderMapper.toDto(stakeholder))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholderDto: StakeholderDto) => {
        this.stakeholderMapper.updateFromDto(stakeholderDto, stakeholder, [this.analysisData.currentAnalysis]);
        this.updatedStakeholder.emit(stakeholder);
        this.logger.info(this, 'Stakeholder updated');
      });
  }

  deleteStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.deleteStakeholder(stakeholder.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
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
    stakeholder.impacted = null;
    stakeholder.analysis = analysis;

    return stakeholder;
  }
}

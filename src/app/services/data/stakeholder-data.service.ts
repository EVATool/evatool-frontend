import {Injectable, OnDestroy} from '@angular/core';
import {DataService} from './data.service';
import {LogService} from '../log.service';
import {AnalysisDataService} from './analysis-data.service';
import {StakeholderRestService} from '../rest/stakeholder-rest.service';
import {StakeholderMapperService} from '../mapper/stakeholder-mapper.service';
import {Stakeholder} from '../../model/Stakeholder';
import {Analysis} from '../../model/Analysis';
import {StakeholderDto} from '../../dto/StakeholderDto';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  loadedStakeholders: Subject<Stakeholder[]> = new ReplaySubject();
  loadedStakeholderPriorities: Subject<string[]> = new ReplaySubject();
  loadedStakeholderLevels: Subject<string[]> = new ReplaySubject();
  createdStakeholder: Subject<Stakeholder> = new ReplaySubject();
  updatedStakeholder: Subject<Stakeholder> = new ReplaySubject();
  deletedStakeholder: Subject<Stakeholder> = new ReplaySubject();

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
        //this.stakeholdersLoaded = false;
        this.stakeholderRest.getStakeholdersByAnalysisId(analysis.id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((stakeholderDtoList: StakeholderDto[]) => {
            const tempStakeholders: Stakeholder[] = [];
            stakeholderDtoList.forEach(stakeholderDto => {
              tempStakeholders.push(this.stakeholderMapper.fromDto(stakeholderDto, [this.analysisData.currentAnalysis]));
            });
            this.stakeholders = this.sortDefault(tempStakeholders);
            this.stakeholdersLoaded = true;
            this.loadedStakeholders.next(this.stakeholders);
            this.logger.debug(this, 'Stakeholders loaded');
          });

        // Load Stakeholder Priorities.
        this.stakeholderRest.getStakeholderPriorities()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((stakeholderPriorities: string[]) => {
            this.stakeholderPriorities = [];
            stakeholderPriorities.forEach((stakeholderPriority: string) => this.stakeholderPriorities.push(stakeholderPriority));
            this.loadedStakeholderPriorities.next(this.stakeholderPriorities);
          });

        // Load Stakeholder Levels.
        this.stakeholderRest.getStakeholderLevels()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((stakeholderLevels: string[]) => {
            this.stakeholderLevels = [];
            stakeholderLevels.forEach((stakeholderLevel: string) => this.stakeholderLevels.push(stakeholderLevel));
            this.loadedStakeholderLevels.next(this.stakeholderLevels);
          });
      });
  }

  clearData(): void {
    this.stakeholdersLoaded = false;
    this.stakeholders = [];
  }

  createStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.createStakeholder(this.stakeholderMapper.toDto(stakeholder))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholderDto: StakeholderDto) => {
        const createdStakeholder = this.stakeholderMapper.fromDto(stakeholderDto, [this.analysisData.currentAnalysis]);
        this.stakeholders.push(createdStakeholder);
        this.createdStakeholder.next(createdStakeholder);
        this.logger.debug(this, 'Stakeholder created');
      });
  }

  updateStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.updateStakeholder(this.stakeholderMapper.toDto(stakeholder))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholderDto: StakeholderDto) => {
        this.stakeholderMapper.updateFromDto(stakeholderDto, stakeholder, [this.analysisData.currentAnalysis]);
        this.updatedStakeholder.next(stakeholder);
        this.logger.debug(this, 'Stakeholder updated');
      });
  }

  deleteStakeholder(stakeholder: Stakeholder): void {
    this.stakeholderRest.deleteStakeholder(stakeholder.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.stakeholders.indexOf(stakeholder, 0);
        this.stakeholders.splice(index, 1);
        this.deletedStakeholder.next(stakeholder);
        this.logger.debug(this, 'Stakeholder deleted');
      });
  }

  createDefaultStakeholder(analysis: Analysis): Stakeholder {
    const stakeholder = new Stakeholder();

    stakeholder.name = '';
    stakeholder.priority = this.stakeholderPriorities[0];
    stakeholder.level = this.stakeholderLevels[0];
    stakeholder.description = '';
    stakeholder.impacted = null;
    stakeholder.analysis = analysis;

    return stakeholder;
  }
}

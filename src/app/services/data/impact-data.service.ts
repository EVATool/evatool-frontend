import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {DataService} from './data.service';
import {LogService} from '../log.service';
import {AnalysisDataService} from './analysis-data.service';
import {StakeholderDataService} from './stakeholder-data.service';
import {ValueDataService} from './value-data.service';
import {Analysis} from '../../model/Analysis';
import {ImpactMapperService} from '../mapper/impact-mapper.service';
import {ImpactRestService} from '../rest/impact-rest.service';
import {ImpactDto} from '../../dto/ImpactDto';
import {Impact} from '../../model/Impact';
import {Value} from '../../model/Value';
import {Stakeholder} from '../../model/Stakeholder';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService extends DataService implements OnDestroy {

  private ngUnsubscribe = new Subject();

  @Output() loadedImpacts: EventEmitter<Impact[]> = new EventEmitter();
  @Output() createdImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() updatedImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() deletedImpact: EventEmitter<Impact> = new EventEmitter();

  impactsLoaded = false;
  impacts: Impact[] = [];

  constructor(protected logger: LogService,
              private impactRest: ImpactRestService,
              private impactMapper: ImpactMapperService,
              private analysisData: AnalysisDataService,
              private valueData: ValueDataService,
              private stakeholderData: StakeholderDataService) {
    super(logger);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  init(): void {
    // Load Impacts.
    this.analysisData.loadedCurrentAnalysis
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((analysis: Analysis) => {
        this.impactsLoaded = false;
      });
    this.stakeholderData.loadedStakeholders
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
      });
    this.valueData.loadedValues
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.loadIfChildrenLoaded(this.analysisData.currentAnalysis.id);
      });
  }

  loadIfChildrenLoaded(analysisId: string): void {
    if (!this.stakeholderData.stakeholdersLoaded || !this.valueData.valuesLoaded) {
      this.logger.debug(this, 'A child has finished loading but I am still waiting for another child');
      return;
    }
    this.impactRest.getImpactsByAnalysisId(analysisId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impactDtoList: ImpactDto[]) => {
        this.impacts = [];
        impactDtoList.forEach(impactDto => {
          this.impacts.push(this.impactMapper.fromDto(impactDto,
            [this.analysisData.currentAnalysis],
            this.valueData.values,
            this.stakeholderData.stakeholders));
        });
        this.impacts = this.sortDefault(this.impacts);
        this.impactsLoaded = true;
        this.loadedImpacts.emit(this.impacts);
        this.logger.info(this, 'Impacts loaded');
      });
  }

  createImpact(impact: Impact): void {
    this.impactRest.createImpact(this.impactMapper.toDto(impact))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impactDto: ImpactDto) => {
        const createdImpact = this.impactMapper.fromDto(impactDto,
          [this.analysisData.currentAnalysis],
          this.valueData.values,
          this.stakeholderData.stakeholders);
        this.impacts.push(createdImpact);
        this.createdImpact.emit(createdImpact);
        this.logger.info(this, 'Impact created');
      });
  }

  updateImpact(impact: Impact): void {
    this.impactRest.updateImpact(this.impactMapper.toDto(impact))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impactDto: ImpactDto) => {
        this.impactMapper.updateFromDto(impactDto,
          impact,
          [this.analysisData.currentAnalysis],
          this.valueData.values,
          this.stakeholderData.stakeholders);
        this.updatedImpact.emit(impact);
        this.logger.info(this, 'Impact updated');
      });
  }

  deleteImpact(impact: Impact): void {
    this.impactRest.deleteImpact(impact.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const index: number = this.impacts.indexOf(impact, 0);
        this.impacts.splice(index, 1);
        this.deletedImpact.emit(impact);
        this.logger.info(this, 'Impact deleted');
      });
  }

  createDefaultImpact(analysis: Analysis, stakeholder: Stakeholder, value: Value): Impact {
    const impact = new Impact();

    impact.merit = 0;
    impact.description = '';
    impact.analysis = analysis;
    impact.value = value;
    impact.stakeholder = stakeholder;

    return impact;
  }
}

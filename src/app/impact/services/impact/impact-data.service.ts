import {LogService} from '../../../shared/services/log.service';
import {ImpactRestService} from './impact-rest.service';
import {Analysis} from '../../models/Analysis';
import {Value} from '../../models/Value';
import {Stakeholder} from '../../models/Stakeholder';
import {ImpactMapperService} from './impact-mapper.service';
import {AnalysisDataService} from '../analysis/analysis-data.service';
import {ValueDataService} from '../value/value-data.service';
import {StakeholderDataService} from '../stakeholder/stakeholder-data.service';
import {Impact} from '../../models/Impact';
import {Injectable, Output, EventEmitter} from '@angular/core';
import {ImpactDto} from "../../dtos/ImpactDto";

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {
  @Output() loadedImpacts: EventEmitter<Impact[]> = new EventEmitter();
  @Output() addedImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() changedImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() removedImpact: EventEmitter<Impact> = new EventEmitter();
  @Output() changedImpacts: EventEmitter<Impact[]> = new EventEmitter();

  impacts: Impact[] = [];
  public impactsLoaded = false;
  private stakeholdersLoaded = false;
  private valuesLoaded = false;
  private analysesLoaded = false;

  constructor(
    private logger: LogService,
    private impactMapperService: ImpactMapperService,
    private impactRestService: ImpactRestService,
    public stakeholderDataService: StakeholderDataService,
    public valueDataService: ValueDataService,
    public analysisDataService: AnalysisDataService) {
  }

  onInit(): void {
    this.stakeholderDataService.loadedStakeholders.subscribe(stakeholders => {
      this.stakeholdersLoaded = true;
      this.loadIfChildrenAreLoaded();
    });

    this.valueDataService.loadedValues.subscribe(values => {
      this.valuesLoaded = true;
      this.loadIfChildrenAreLoaded();
    });

    this.analysisDataService.loadedAnalyses.subscribe(currentAnalysis => {
      this.analysesLoaded = true;
      this.loadIfChildrenAreLoaded();
    });

    this.stakeholderDataService.onInit();
    this.valueDataService.onInit();
    this.analysisDataService.onInit();
  }

  private loadIfChildrenAreLoaded(): void {
    if (this.getChildrenLoaded() && !this.impactsLoaded) {
      // Load impacts.
      this.impactRestService.getImpactsByAnalysisId(this.analysisDataService.getCurrentAnalysis().id).subscribe(imps => {
        imps.sort((a, b) => this.sortImpactsById(a, b));
        let fromDtos: Impact[] = [];
        imps.forEach(imp => {
          fromDtos.push(this.impactMapperService.fromDto(imp,
            this.valueDataService.values,
            this.stakeholderDataService.stakeholders,
            [this.analysisDataService.getCurrentAnalysis()]));
        });
        this.impacts = fromDtos;
        this.logger.info(this, 'Impacts loaded');
        this.impactsLoaded = true;
        this.loadedImpacts.emit(this.impacts);
      });
    }
  }

  private sortImpactsById(a: ImpactDto, b: ImpactDto): number {
    this.logger.debug(this, 'Sorting Impacts By Id');
    const numberA = +("" + a.uniqueString?.replace("IMP", ""));
    const numberB = +("" + b.uniqueString?.replace("IMP", ""));
    return numberA > numberB ? 1 : -1;
  }

  private getChildrenLoaded(): boolean {
    return this.stakeholdersLoaded && this.valuesLoaded && this.analysesLoaded;
  }

  private createDefaultImpact(): Impact {
    this.logger.debug(this, 'Create Default Impact');
    const impact = new Impact();

    impact.value = 0.0;
    impact.description = '';
    impact.valueEntity = this.valueDataService.getDefaultValue();
    impact.stakeholder = this.stakeholderDataService.getDefaultStakeholder();
    impact.analysis = this.analysisDataService.getCurrentAnalysis();

    return impact;
  }

  createImpact(): void {
    this.logger.info(this, 'Create Impact');
    const impact = this.createDefaultImpact();
    const impactDto = this.impactMapperService.toDto(impact);
    this.impactRestService.createImpact(impactDto).subscribe(impDto => {
      impact.id = impDto.id;
      impact.uniqueString = impDto.uniqueString;
      this.impacts.push(impact);
      this.addedImpact.emit(impact);
      this.changedImpacts.emit(this.impacts);
    });
  }

  updateImpact(impact: Impact): void {
    this.logger.info(this, 'Update Impact');
    const impactDto = this.impactMapperService.toDto(impact);
    this.impactRestService.updateImpact(impactDto).subscribe((newImpact: Impact) => {
      this.changedImpact.emit(newImpact);
      // this.changedImpacts.emit(this.impacts); // The change originated from the UI.
    });
  }

  deleteImpact(impact: Impact): void {
    this.logger.info(this, 'Delete Impact');
    const impactDto = this.impactMapperService.toDto(impact);
    this.impactRestService.deleteImpact(impactDto).subscribe((impDto) => {
      const index: number = this.impacts.indexOf(impact, 0);
      this.impacts.splice(index, 1);
      this.removedImpact.emit(impact);
      this.changedImpacts.emit(this.impacts);
    });
  }
}

import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FilterSliderComponent} from '../filter-impact/filter-slider.component';
import {FilterCategoryComponent} from '../filter-category/filter-category.component';
import {ImpactTableFilterEvent} from './ImpactTableFilterEvent';
import {LogService} from '../../services/log.service';
import {StakeholderDataService} from '../../services/data/stakeholder-data.service';
import {ValueDataService} from '../../services/data/value-data.service';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {Value} from '../../model/Value';
import {Stakeholder} from '../../model/Stakeholder';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-impact-filter-bar',
  templateUrl: './impact-filter-bar.component.html',
  styleUrls: ['./impact-filter-bar.component.scss']
})
export class ImpactFilterBarComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild(FilterSliderComponent) meritFilter!: FilterSliderComponent;
  @ViewChild('stakeholderFilter') stakeholderFilter!: FilterCategoryComponent;
  @ViewChild('valuesFilter') valuesFilter!: FilterCategoryComponent;
  @Output() filterChanged = new EventEmitter<ImpactTableFilterEvent>();

  stakeholderNames: string[] = [];
  valueNames: string[] = [];

  impactTableFilterEvent: ImpactTableFilterEvent;
  suppressChildEvent = false;

  constructor(
    private logger: LogService,
    private stakeholderDataService: StakeholderDataService,
    private valueDataService: ValueDataService,
    private translate: TranslateService) {
    this.impactTableFilterEvent = ImpactTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    this.stakeholderDataService.loadedStakeholders
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholders: Stakeholder[]) => {
        this.updateStakeholders();
      });

    this.stakeholderDataService.createdStakeholder
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholder: Stakeholder) => {
        this.updateStakeholders();
      });

    this.stakeholderDataService.updatedStakeholder
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholder: Stakeholder) => {
        this.updateStakeholders();
      });

    this.stakeholderDataService.deletedStakeholder
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((stakeholder: Stakeholder) => {
        this.updateStakeholders();
      });

    this.updateStakeholders();

    this.valueDataService.loadedValues
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((values: Value[]) => {
        this.updateValues();
      });

    this.valueDataService.createdValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: Value) => {
        this.updateValues();
      });

    this.valueDataService.updatedValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: Value) => {
        this.updateValues();
      });

    this.valueDataService.deletedValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: Value) => {
        this.updateValues();
      });

    this.updateValues();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateStakeholders(): void {
    this.stakeholderNames = this.stakeholderDataService.stakeholders.map(
      stakeholder => stakeholder.name);
  }

  updateValues(): void {
    this.valueNames = this.valueDataService.values.filter(
      value => !value.archived).map(
      value => value.name);
  }

  stakeholderFilterChanged(event: string[]): void {
    this.logger.trace(this, 'Slider Filter Changed (Stakeholder)');
    this.impactTableFilterEvent.stakeholder = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  valueFilterChanged(event: string[]): void {
    this.logger.trace(this, 'Slider Filter Changed (Value)');
    this.impactTableFilterEvent.value = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  meritFilterChanged(event: SliderFilterSettings): void {
    this.logger.trace(this, 'Slider Filter Changed');
    this.impactTableFilterEvent.merit = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.impactTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.logger.trace(this, 'Clearing Filtering');
    this.suppressChildEvent = true;

    this.stakeholderFilter.clearFilter();
    this.valuesFilter.clearFilter();
    this.meritFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }
}

import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FilterSliderComponent} from '../filter-impact/filter-slider.component';
import {FilterCategoryComponent} from '../filter-category/filter-category.component';
import {HighlightSearchComponent} from '../highlight-search/highlight-search.component';
import {Variant} from '../../model/Variant';
import {ValueDataService} from '../../services/data/value-data.service';
import {Value} from '../../model/Value';
import {SliderFilterSettings} from '../impact-slider/SliderFilterSettings';
import {RequirementTableFilterEvent} from './RequirementTableFilterEvent';
import {VariantDataService} from '../../services/data/variant-data.service';
import {ImpactDataService} from '../../services/data/impact-data.service';
import {Impact} from '../../model/Impact';
import {LogService} from '../../services/log.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-requirement-filter-bar',
  templateUrl: './requirement-filter-bar.component.html',
  styleUrls: ['./requirement-filter-bar.component.scss']
})
export class RequirementFilterBarComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild(FilterSliderComponent) sliderFilter!: FilterSliderComponent;
  @ViewChild('variantsFilter') variantsFilter!: FilterCategoryComponent;
  @ViewChild('valueSystemFilter') valueSystemFilter!: FilterCategoryComponent;
  @ViewChild('impactFilter') impactFilter!: FilterCategoryComponent;
  @ViewChild(HighlightSearchComponent) highlightFilter!: HighlightSearchComponent;
  @Output() filterChanged = new EventEmitter<RequirementTableFilterEvent>();

  variantNames: string[] = [];
  valueNames: string[] = [];
  impactPrefixIds: string[] = [];

  requirementTableFilterEvent!: RequirementTableFilterEvent;
  suppressChildEvent = false;

  constructor(
    private logger: LogService,
    private variantData: VariantDataService,
    private valueData: ValueDataService,
    private impactData: ImpactDataService) {
    this.requirementTableFilterEvent = RequirementTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    this.variantData.loadedVariants
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variants: Variant[]) => {
        this.updateVariants();
      });

    this.variantData.createdVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variant: Variant) => {
        this.updateVariants();
      });

    this.variantData.updatedVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variant: Variant) => {
        this.updateVariants();
      });

    this.variantData.deletedVariant
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((variant: Variant) => {
        this.updateVariants();
      });

    this.updateVariants();

    this.valueData.loadedValues
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((values: Value[]) => {
        this.updateValues();
      });

    this.valueData.createdValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: Value) => {
        this.updateValues();
      });

    this.valueData.updatedValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((values: Value) => {
        this.updateValues();
      });

    this.valueData.deletedValue
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((values: Value) => {
        this.updateValues();
      });

    this.updateValues();

    this.impactData.loadedImpacts
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impacts: Impact[]) => {
        this.updateImpacts();
      });

    this.impactData.createdImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impact: Impact) => {
        this.updateImpacts();
      });

    this.impactData.updatedImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impact: Impact) => {
        this.updateImpacts();
      });

    this.impactData.deletedImpact
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((impact: Impact) => {
        this.updateImpacts();
      });

    this.updateImpacts();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateVariants(): void {
    this.variantNames = this.variantData.variants.filter(
      variant => !variant.archived).map(
      variant => variant.name);
  }

  updateValues(): void {
    this.valueNames = this.valueData.values.filter(
      value => !value.archived).map(
      value => value.name);
  }

  updateImpacts(): void {
    this.impactPrefixIds = this.impactData.impacts.map(
      impact => impact.prefixSequenceId);
  }

  variantFilterChanged(event: string[]): void {
    this.requirementTableFilterEvent.variant = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }

  valueFilterChanged(event: string[]): void {
    this.requirementTableFilterEvent.value = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }

  impactFilterChanged(event: string[]): void {
    this.requirementTableFilterEvent.impact = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }

  meritFilterChanged(event: SliderFilterSettings): void {
    this.requirementTableFilterEvent.merit = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.suppressChildEvent = true;

    this.highlightFilter.clearFilter();
    this.sliderFilter.clearFilter();
    this.variantsFilter.clearFilter();
    this.valueSystemFilter.clearFilter();
    this.impactFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.requirementTableFilterEvent);
  }
}

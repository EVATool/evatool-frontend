import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ColumnSliderFilterComponent} from '../column-slider-filter/column-slider-filter.component';
import {ColumnCategoryFilterComponent} from '../column-category-filter/column-category-filter.component';
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

@Component({
  selector: 'app-requirements-filter-bar',
  templateUrl: './requirements-filter-bar.component.html',
  styleUrls: ['./requirements-filter-bar.component.scss']
})
export class RequirementsFilterBarComponent implements OnInit {
  @ViewChild(ColumnSliderFilterComponent) sliderFilter!: ColumnSliderFilterComponent;
  @ViewChild('variantsFilter') variantsFilter!: ColumnCategoryFilterComponent;
  @ViewChild('valueSystemFilter') valueSystemFilter!: ColumnCategoryFilterComponent;
  @ViewChild('impactFilter') impactFilter!: ColumnCategoryFilterComponent;
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
    this.variantData.loadedVariants.subscribe((variants: Variant[]) => {
      this.updateVariants();
    });

    this.variantData.createdVariant.subscribe((variant: Variant) => {
      this.updateVariants();
    });

    this.variantData.updatedVariant.subscribe((variant: Variant) => {
      this.updateVariants();
    });

    this.variantData.deletedVariant.subscribe((variant: Variant) => {
      this.updateVariants();
    });

    this.updateVariants();

    this.valueData.loadedValues.subscribe((values: Value[]) => {
      this.updateValues();
    });

    this.valueData.createdValue.subscribe((value: Value) => {
      this.updateValues();
    });

    this.valueData.updatedValue.subscribe((values: Value) => {
      this.updateValues();
    });

    this.valueData.deletedValue.subscribe((values: Value) => {
      this.updateValues();
    });

    this.updateValues();

    this.impactData.loadedImpacts.subscribe((impacts: Impact[]) => {
      this.updateImpacts();
    });

    this.impactData.createdImpact.subscribe((impact: Impact) => {
      this.updateImpacts();
    });

    this.impactData.updatedImpact.subscribe((impact: Impact) => {
      this.updateImpacts();
    });

    this.impactData.deletedImpact.subscribe((impact: Impact) => {
      this.updateImpacts();
    });

    this.updateImpacts();
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

  highlightTextChange(event: string): void {
    this.logger.info(this, 'Highlight Text Changed');
    this.requirementTableFilterEvent.highlight = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
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

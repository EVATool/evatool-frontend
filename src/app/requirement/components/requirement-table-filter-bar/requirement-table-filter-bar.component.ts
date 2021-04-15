import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ColumnCategoryFilterComponent} from '../../../shared/components/column-category-filter/column-category-filter.component';
import {RequirementTableFilterEvent} from '../../../requirement/components/requirement-table-filter-bar/RequirementTableFilterEvent';
import {SliderFilterSettings} from '../../../shared/components/impact-slider/SliderFilterSettings';
import {ColumnSliderFilterComponent} from '../../../shared/components/column-slider-filter/column-slider-filter.component';
import {HighlightSearchComponent} from '../../../shared/components/search-bar/highlight-search.component';
import {ValueDataService} from '../../../impact/services/value/value-data.service';
import {Value} from '../../../impact/models/Value';
import {Variants} from '../../models/Variants';
import {RequirementsRestService} from '../../services/requirements/requirements-rest.service';
import {RequirementsDataService} from "../../services/requirements/requirements-data.service";

@Component({
  selector: 'app-requirement-table-filter-bar',
  templateUrl: './requirement-table-filter-bar.component.html',
  styleUrls: ['./requirement-table-filter-bar.component.scss']
})
export class RequirementTableFilterBarComponent implements OnInit {
  @ViewChild(ColumnSliderFilterComponent) sliderFilter!: ColumnSliderFilterComponent;
  @ViewChild('variantsFilter') variantsFilter!: ColumnCategoryFilterComponent;
  @ViewChild('valueSystemFilter') valueSystemFilter!: ColumnCategoryFilterComponent;
  @ViewChild(HighlightSearchComponent) highlightFilter!: HighlightSearchComponent;
  @Output() filterChanged = new EventEmitter<RequirementTableFilterEvent>();
  variantsNames: string[] = [];
  valueSystemNames: string[] = [];

  requirementTableFilterEvent!: RequirementTableFilterEvent;
  suppressChildEvent = false;
  constructor(
    private valueDataService: ValueDataService,
    private requirementsRestService: RequirementsRestService,
    private requirementsDataService: RequirementsDataService) {
    this.requirementTableFilterEvent = RequirementTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    // this.variantsDataService.onCreateVariants.subscribe((variants) =>  {
    //   this.variantsChanged(variants);
    // });

    {
        this.requirementsRestService.getVariants().subscribe((result: any) => {
          this.variantsNames = [];
          result.forEach((variantsRest: Variants) => {
            const variants: Variants = {
              entityId: variantsRest.id,
              description: variantsRest.description,
              variantsTitle: variantsRest.title,
              archived: variantsRest.archived
            };
            this.variantsNames.push(variants.variantsTitle);
          });
        });
    }

    // this.requirementsDataService.loadedRequirements.subscribe((variants) =>  {
    //   this.variantsChanged(variants);
    // });
    this.valueDataService.loadedValues.subscribe((values) => {
      this.valuesChanged(values);
    });
  }

  valuesChanged(values: Value[]) {
    this.valueSystemNames = values.filter(value => !value.disable).map(value => value.name);
  }

  variantsChanged(variants: Variants[]){
    this.variantsNames = variants.map(value => value.variantsTitle);
  }

  variantsFilterChanged(event: string[]): void {
    this.requirementTableFilterEvent.variantsFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }

  valueSystemFilterChanged(event: string[]): void {
    this.requirementTableFilterEvent.valueSystemFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }
  valueFilterChanged(event: SliderFilterSettings): void {
    this.requirementTableFilterEvent.valueFilter = event;
    if (!this.suppressChildEvent) {
      this.filterChanged.emit(this.requirementTableFilterEvent);
    }
  }

  clearFilter(): void {
    this.suppressChildEvent = true;

    this.sliderFilter.clearFilter();
    this.variantsFilter.clearFilter();
    this.valueSystemFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.requirementTableFilterEvent);
  }
  clearHighlight() {
    this.suppressChildEvent = true;

    this.highlightFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.requirementTableFilterEvent);
  }

  setHighlightText($event: string): void {
    this.requirementsDataService.setSearchText(event);
  }
}

import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ColumnCategoryFilterComponent} from '../../../shared/components/column-category-filter/column-category-filter.component';
import {RequirementTableFilterEvent} from './RequirementTableFilterEvent';
import {SliderFilterSettings} from '../../../shared/components/impact-slider/SliderFilterSettings';
import {ColumnSliderFilterComponent} from '../../../shared/components/column-slider-filter/column-slider-filter.component';
import {HighlightSearchComponent} from '../../../shared/components/search-bar/highlight-search.component';
import {ValueDataService} from '../../../impact/services/value/value-data.service';
import {Value} from '../../../impact/models/Value';
import {Variants} from '../../models/Variants';
import {RequirementsRestService} from '../../services/requirements/requirements-rest.service';
import {RequirementsDataService} from '../../services/requirements/requirements-data.service';
import {VariantsDataService} from '../../services/variants/variants-data.service';
import {Impact} from '../../models/Impact';
import {Router} from '@angular/router';
import {VariantsRestService} from "../../services/variants/variants-rest.service";
import {ImpactRestService} from "../../services/impact/impact-rest.service";

@Component({
  selector: 'app-requirement-table-filter-bar',
  templateUrl: './requirement-table-filter-bar.component.html',
  styleUrls: ['./requirement-table-filter-bar.component.scss']
})
export class RequirementTableFilterBarComponent implements OnInit {
  @ViewChild(ColumnSliderFilterComponent) sliderFilter!: ColumnSliderFilterComponent;
  @ViewChild('variantsFilter') variantsFilter!: ColumnCategoryFilterComponent;
  @ViewChild('valueSystemFilter') valueSystemFilter!: ColumnCategoryFilterComponent;
  @ViewChild('impactFilter') impactFilter!: ColumnCategoryFilterComponent;
  @ViewChild(HighlightSearchComponent) highlightFilter!: HighlightSearchComponent;
  @Output() filterChanged = new EventEmitter<RequirementTableFilterEvent>();
  variantsNames: string[] = [];
  variantsTest: Variants[] = [];
  valueSystemNames: string[] = [];
  impacts: string[] = [];

  requirementTableFilterEvent!: RequirementTableFilterEvent;
  suppressChildEvent = false;
  constructor(
    private valueDataService: ValueDataService,
    private requirementsDataService: RequirementsDataService,
    private variantsRestService: VariantsRestService,
    private impactRestService: ImpactRestService,
    private router: Router) {
    this.requirementTableFilterEvent = RequirementTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    {
      this.router.routerState.root.queryParams.subscribe(params => {
        this.variantsRestService.getVariants(params.id).subscribe((result: any) => {
          this.variantsTest = [];
          result.forEach((variantsRest: Variants) => {
            const variants: Variants = {
              entityId: variantsRest.id,
              description: variantsRest.description,
              variantsTitle: variantsRest.title,
              archived: variantsRest.archived
            };
            this.variantsTest.push(variants);
          });
          this.variantsChanged(this.variantsTest);
        });
        this.impactRestService.getImpacts(params.id).subscribe((result: any) => {
        this.impacts = [];
        result.forEach((impactRest: Impact) => {
          this.impacts.push(impactRest.uniqueString);
        });
      });
      });
    }
    this.valueDataService.loadedValues.subscribe((values) => {
      this.valuesChanged(values);
    });
  }

  valuesChanged(values: Value[]): void {
    this.valueSystemNames = values.filter(value => !value.disable).map(value => value.name);
  }

  variantsChanged(variants: Variants[]): void{
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

  impactFilterChanged(event: string[]): void {
    this.requirementTableFilterEvent.impactFilter = event;
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
    this.impactFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.requirementTableFilterEvent);
  }
  clearHighlight(): void {
    this.suppressChildEvent = true;

    this.highlightFilter.clearFilter();

    this.suppressChildEvent = false;
    this.filterChanged.emit(this.requirementTableFilterEvent);
  }

  setHighlightText($event: string): void {
    this.requirementsDataService.setSearchText($event);
  }
}

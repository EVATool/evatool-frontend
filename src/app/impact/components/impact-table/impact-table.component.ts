import {ValueDialogComponent} from './components/value-dialog/value-dialog.component';
import {ImpactTableFilterEvent} from '../impact-table-filter-bar/ImpactTableFilterEvent';
import {MatSliderChange} from '@angular/material/slider';
import {ValueDataService} from '../../services/value/value-data.service';
import {MatDialog} from '@angular/material/dialog';
import {ImpactDataService} from '../../services/impact/impact-data.service';
import {Impact} from '../../models/Impact';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {LogService} from '../../../shared/services/log.service';
import {SliderFilterBoundary, SliderFilterType} from '../../../shared/components/impact-slider/SliderFilterSettings';
import {StakeholderDataService} from '../../services/stakeholder/stakeholder-data.service';
import {AnalysisDataService} from '../../services/analysis/analysis-data.service';
import {NgScrollbar} from 'ngx-scrollbar';
import {RequirementRestService} from '../../services/requirement/requirement-rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-impact-table',
  templateUrl: './impact-table.component.html',
  styleUrls: ['./impact-table.component.scss', '../../../layout/style/style.scss']
})
export class ImpactTableComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  // Used by table.
  displayedColumns: string[] = ['uniqueString', 'stakeholder', 'valueEntity', 'value', 'description'];
  tableDataSource: MatTableDataSource<Impact> = new MatTableDataSource<Impact>();
  windowScrolled = false;

  filterValues: any = {
    id: '',
    stakeholder: [],
    values: [],
    value: '',
    description: '',
    highlight: ''
  };

  constructor(
    private logger: LogService,
    public impactDataService: ImpactDataService,
    public valueDataService: ValueDataService,
    public stakeholderDataService: StakeholderDataService,
    public analysisDataService: AnalysisDataService,
    private requirementRestService: RequirementRestService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.scrollbarRef?.scrolled.subscribe(e => {
      this.logger.info(this, 'Event \'scrolled\' received from Scrollbar');
      this.windowScrolled = e.target.scrollTop !== 0;
    });

    this.impactDataService.loadedImpacts.subscribe((impacts: Impact[]) => {
      this.logger.info(this, 'Event \'loadedImpacts\' received from ImpactDataService');
      this.tableDataSource = new MatTableDataSource<Impact>(impacts);
      this.initSorting();
      this.initFiltering();
    });

    this.impactDataService.changedImpacts.subscribe((impacts: Impact[]) => {
      this.logger.info(this, 'Event \'changedImpacts\' received from ImpactDataService');
      if (this.tableDataSource.data.length === 0) {
        this.tableDataSource = new MatTableDataSource<Impact>(impacts);
        this.initSorting();
        this.initFiltering();
      } else {
        this.tableDataSource.data = impacts;
      }
    });

    this.impactDataService.addedImpact.subscribe((impact: Impact) => {
      this.logger.info(this, 'Event \'addedImpact\' received from ImpactDataService');
      const options = {bottom: -100, duration: 250};
      this.scrollbarRef.scrollTo(options);
    });

    this.impactDataService.changedImpact.subscribe((impact: Impact) => {
      this.logger.info(this, 'Event \'changedImpact\' received from ImpactDataService');
    });

    this.impactDataService.removedImpact.subscribe((impact: Impact) => {
      this.logger.info(this, 'Event \'removedImpact\' received from ImpactDataService');
    });

    // this.impactDataService.onInit();
  }

  ngAfterViewInit(): void {

  }

  reload(): void {
    this.logger.info(this, 'Reload');
    this.impactDataService.reload();
  }

  scrollToTop(): void {
    this.logger.info(this, 'Scroll To Top');
    const options = {top: 0, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  private initSorting(): void {
    this.logger.info(this, 'Init Sorting');
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (impact, property) => {
      switch (property) {
        case 'stakeholder':
          return impact.stakeholder.name;
        case 'valueEntity':
          return impact.valueEntity.name;
        default:
          return impact[property];
      }
    };
  }

  public updateFilter(): void {
    this.logger.info(this, 'Update Filter');
    this.tableDataSource.filter = JSON.stringify(this.filterValues);
  }

  private initFiltering(): void {
    this.logger.info(this, 'Init Filtering');
    this.tableDataSource.filterPredicate = this.createFilter();
  }

  private createFilter(): (data: any, filter: string) => boolean {
    this.logger.info(this, 'Create Filter');
    return (data: Impact, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const stakeholderFilter = searchTerms.stakeholder.length === 0 || searchTerms.stakeholder.indexOf(data.stakeholder.name) !== -1;

      const valuesFilter = searchTerms.values.length === 0 || searchTerms.values.indexOf(data.valueEntity.name) !== -1;

      let valueFilter = false;
      switch (searchTerms.value.sliderFilterType) {
        case SliderFilterType.Off:
          valueFilter = true;
          break;

        case SliderFilterType.LessThan:
          if (searchTerms.value.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
            valueFilter = data.value < searchTerms.value.sliderFilterValues[0];
          } else {
            valueFilter = data.value <= searchTerms.value.sliderFilterValues[0];
          }
          break;

        case SliderFilterType.GreaterThan:
          if (searchTerms.value.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
            valueFilter = data.value > searchTerms.value.sliderFilterValues[0];
          } else {
            valueFilter = data.value >= searchTerms.value.sliderFilterValues[0];
          }
          break;

        case SliderFilterType.Equality:
          valueFilter = data.value === searchTerms.value.sliderFilterValues[0];
          break;

        case SliderFilterType.Between:
          const minValue = Math.min(searchTerms.value.sliderFilterValues[0], searchTerms.value.sliderFilterValues[1]);
          const maxValue = Math.max(searchTerms.value.sliderFilterValues[0], searchTerms.value.sliderFilterValues[1]);
          if (searchTerms.value.sliderFilterBoundary === SliderFilterBoundary.Exclude) {
            valueFilter = data.value > minValue && data.value < maxValue;
          } else {
            valueFilter = data.value >= minValue && data.value <= maxValue;
          }
          break;

        default:
          valueFilter = true;
          break;
      }

      return stakeholderFilter && valuesFilter && valueFilter;
    };
  }

  clearSort(): void {
    this.sort.sort({id: '', start: 'desc', disableClear: false});
  }

  filterChange(event: ImpactTableFilterEvent): void {
    this.logger.info(this, 'Filter Changed');
    this.filterValues.value = event.valueFilter;
    this.filterValues.stakeholder = event.stakeholderFilter;
    this.filterValues.values = event.valuesFilter;
    this.filterValues.highlight = event.highlightFilter;
    this.updateFilter();
  }

  updateImpact(impact: Impact): void {
    this.logger.info(this, 'Update Impact');
    this.impactDataService.updateImpact(impact);
  }

  deleteImpact(impact: Impact): void {
    this.logger.info(this, 'Delete Impact');
    this.requirementRestService.getRequirementsReferencedByImpactId("" + impact.id).subscribe(referenced => {
      if (!referenced) {
        this.impactDataService.deleteImpact(impact);
      } else {
        this.snackBar.open('This impact is still being referenced by one or more impacts.', '', {duration: 5000})
      }
    });
  }

  stakeholderChange(impact: Impact, event: MatSelectChange): void {
    this.logger.info(this, 'Stakeholder changed');
    this.updateImpact(impact);
  }

  valueEntityChange(impact: Impact, event: MatSelectChange): void {
    this.logger.info(this, 'Value changed');
    impact.highlight = false;
    this.updateImpact(impact);
  }

  valueChange(impact: Impact, event: MatSliderChange): void {
    this.logger.info(this, 'Value changed');
    if (event.value !== null) {
      impact.value = event.value;
    }
    this.updateImpact(impact);
  }

  descriptionChange(impact: Impact, event: Event): void {
    this.logger.info(this, 'Description changed');
    this.updateImpact(impact);
  }

  openValueModal(): void {
    this.logger.info(this, 'Opening Value Modal Dialog');
    const dialogRef = this.dialog.open(ValueDialogComponent, {
      height: '80%',
      width: '50%',
      data: {parameter: 'I left this here because maybe we will need it c:'}
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.logger.info(this, 'Closing Value Modal Dialog');

      // Highlighting of impacts referencing value.
      if (data?.showReferencedImpacts) {
        this.impactDataService.impacts.forEach(impact => {
          impact.highlight = impact.valueEntity === data.value;
        });
      }
    });
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

  addButtonClicked(): void {
    this.logger.info(this, 'Add Button Clicked');
    const impact = this.createDefaultImpact();
    this.impactDataService.createImpact(impact);
  }
}

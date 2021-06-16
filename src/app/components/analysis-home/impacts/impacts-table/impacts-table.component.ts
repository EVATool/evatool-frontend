import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {NgScrollbar} from 'ngx-scrollbar';
import {MatSort} from '@angular/material/sort';
import {Impact} from '../../../../model/Impact';
import {LogService} from '../../../../services/log.service';
import {ImpactDataService} from '../../../../services/data/impact-data.service';
import {ValueDataService} from '../../../../services/data/value-data.service';
import {StakeholderDataService} from '../../../../services/data/stakeholder-data.service';
import {AnalysisDataService} from '../../../../services/data/analysis-data.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SliderFilterBoundary, SliderFilterSettings, SliderFilterType} from '../../../impact-slider/SliderFilterSettings';
import {ImpactTableFilterEvent} from '../impacts-filter-bar/ImpactTableFilterEvent';
import {ValuesDialogComponent} from '../values-dialog/values-dialog.component';

@Component({
  selector: 'app-impacts-table',
  templateUrl: './impacts-table.component.html',
  styleUrls: ['./impacts-table.component.scss']
})
export class ImpactsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<Impact>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns = ['prefixSequenceId', 'stakeholder', 'value', 'merit', 'description'];
  tableDataSource = new MatTableDataSource<Impact>();
  windowScrolled = false;
  highlightFilter = '';

  constructor(
    private logger: LogService,
    public impactDataService: ImpactDataService,
    public valueDataService: ValueDataService,
    public stakeholderDataService: StakeholderDataService,
    public analysisDataService: AnalysisDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.impactDataService.loadedImpacts.subscribe((impacts: Impact[]) => {
      this.updateTableDataSource();
    });

    this.impactDataService.createdImpact.subscribe((impact: Impact) => {
      this.updateTableDataSource();
    });

    this.impactDataService.deletedImpact.subscribe((impact: Impact) => {
      this.updateTableDataSource();
    });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    this.scrollbarRef?.scrolled.subscribe(e => {
      this.windowScrolled = e.target.scrollTop !== 0;
    });

    this.initSorting();
    this.initFiltering();
  }

  updateTableDataSource(): void {
    this.tableDataSource.data = this.impactDataService.impacts;
  }

  scrollToTop(): void {
    this.logger.info(this, 'Scroll To Top');
    const options = {top: 0, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  initSorting(): void {
    this.logger.info(this, 'Init Sorting');
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (impact, property) => {
      switch (property) {
        case 'stakeholder':
          return impact.stakeholder.name;
        case 'value':
          return impact.value.name;
        default:
          return impact[property];
      }
    };
  }

  initFiltering(): void {
    this.logger.info(this, 'Init Filtering');
    this.tableDataSource.filterPredicate = this.createFilterPredicate();
  }

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: Impact, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      const stakeholderFilter = searchTerms.stakeholder.length === 0 || searchTerms.stakeholder.indexOf(data.stakeholder.name) !== -1;

      const valueFilter = searchTerms.value.length === 0 || searchTerms.value.indexOf(data.value.name) !== -1;

      const meritFilter = SliderFilterSettings.filter(searchTerms.merit, data.merit);

      return stakeholderFilter && valueFilter && meritFilter;
    };
  }

  updateFilter(event: ImpactTableFilterEvent): void {
    this.logger.info(this, 'Filter Changed');
    this.highlightFilter = event.highlight;
    this.tableDataSource.filter = JSON.stringify(event);
  }

  createImpact(): void {
    const impact = this.impactDataService.createDefaultImpact(
      this.analysisDataService.currentAnalysis,
      this.stakeholderDataService.stakeholders[0],
      this.valueDataService.values[0]);
    this.impactDataService.createImpact(impact);
  }

  updateImpact(impact: Impact): void {
    this.logger.info(this, 'Update Impact');
    this.impactDataService.updateImpact(impact);
  }

  deleteImpact(impact: Impact): void {
    this.logger.info(this, 'Delete Impact');
    this.impactDataService.deleteImpact(impact);
  }

  openValueModal(): void {
    this.logger.info(this, 'Opening Value Modal Dialog');

    const dialogRef = this.dialog.open(ValuesDialogComponent, {
      height: '80%',
      width: '50%',
      data: {parameter: 'I left this here because maybe we will need it c:'}
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.logger.info(this, 'Closing Value Modal Dialog');

      // Highlighting of impacts referencing value.
      if (data?.showReferencedImpacts) {
        this.impactDataService.impacts.forEach(impact => {
          impact.highlight = impact.value === data.value;
        });
      }
    });
  }
}

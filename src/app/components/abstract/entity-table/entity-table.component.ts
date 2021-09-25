import {Component, QueryList, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {LogService} from '../../../services/log.service';
import {Subject} from 'rxjs';
import {MatRow, MatTable, MatTableDataSource} from '@angular/material/table';
import {NgScrollbar} from 'ngx-scrollbar';
import {takeUntil} from 'rxjs/operators';
import {Stakeholder} from '../../../model/Stakeholder';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent {

  protected ngUnsubscribe = new Subject();

  // Properties that must be in the template of the child
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;
  @ViewChild(MatTable) table!: MatTable<Stakeholder>;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChildren(MatRow, {read: ViewContainerRef}) rows!: QueryList<ViewContainerRef>;

  // Properties that must be assigned by the child.
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>();
  filterEvent!: any;

  // Properties that must be left unchanged by the child.
  windowScrolled = false;
  highlightFilter = '';

  constructor(protected logger: LogService) {

  }

  // Lifecycle events.
  onInit(): void {

  }

  afterViewInit(): void {
    this.scrollbarRef?.scrolled
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(e => {
        this.windowScrolled = e.target.scrollTop !== 0;
      });

    this.initSorting();
    this.initFiltering();
  }

  onDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Abstract methods (they are not abstract, because a base component cannot be abstract).
  updateTableDataSource(): void {
  }

  createDataAccessor(): (stakeholder: any, property: string) => any {
    return (stakeholder: any, property: string) => null;
  }

  createFilterPredicate(): (data: any, filter: string) => boolean {
    return (data: any, filter: string) => true;
  }

  // Methods.
  initSorting(): void {
    this.logger.trace(this, 'Init Sorting');
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = this.createDataAccessor();
  }

  initFiltering(): void {
    this.logger.trace(this, 'Init Filtering');
    this.tableDataSource.filterPredicate = this.createFilterPredicate();
  }


  scrollToTop(): void {
    this.logger.trace(this, 'Scroll To Top');
    const options = {top: 0, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  scrollToBottom(): void {
    this.logger.trace(this, 'Scroll To Bottom');
    const options = {bottom: -100, duration: 250};
    this.scrollbarRef.scrollTo(options);
  }

  scrollToIndex(index: number): void {
    index--;
    const row = this.rows.find(r => r.element.nativeElement.rowIndex === index);
    if (row) {
      const options = {duration: 250}; // TODO get options into scroll call.
      row.element.nativeElement.scrollIntoView(true);
    } else {
      console.log('Row at index ' + (index) + ' not found');
    }
  }

  // TODO return index more reliable. This sometimes fails to scroll (when changing the sorting and adding a new row).
  getRowIndex(stakeholder: Stakeholder): number {
    const row = this.rows.get(this.rows.length - 1);
    if (row) {
      return row.element.nativeElement.sectionRowIndex;
    } else {
      return 0;
    }
  }

  updateFilter(event: any): void {
    this.logger.trace(this, 'Filter Changed');
    this.filterEvent = event;
    this.tableDataSource.filter = JSON.stringify(event);
  }
}

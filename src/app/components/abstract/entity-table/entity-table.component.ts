import {Component, ViewChild} from '@angular/core';
import {LogService} from '../../../services/log.service';
import {Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {NgScrollbar} from 'ngx-scrollbar';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent {

  protected ngUnsubscribe = new Subject();

  // Properties that must be in the template of the child
  @ViewChild(NgScrollbar) scrollbarRef!: NgScrollbar;

  // Properties that must be assigned by the child.
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>();
  filterEvent!: any;

  // Properties that must be left unchanged by the child.
  windowScrolled = false;
  highlightFilter = '';

  constructor(protected logger: LogService) {

  }

  onInit(): void {

  }

  afterViewInit(): void {
    this.scrollbarRef?.scrolled
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(e => {
        this.windowScrolled = e.target.scrollTop !== 0;
      });

    //this.initSorting();
    //this.initFiltering();
  }
}

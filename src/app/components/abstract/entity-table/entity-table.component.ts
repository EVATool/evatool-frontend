import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LogService} from '../../../services/log.service';
import {Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent implements OnInit, AfterViewInit {

  protected ngUnsubscribe = new Subject();

  // Properties that must be in the template of the child

  // Properties that must be assigned by the child.
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>();
  filterEvent!: any;

  // Properties that must be left unchanged by the child.
  windowScrolled = false;
  highlightFilter = '';

  constructor(protected logger: LogService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }
}

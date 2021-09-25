import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LogService} from '../../../services/log.service';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent implements OnInit, AfterViewInit {

  constructor(protected logger: LogService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }
}

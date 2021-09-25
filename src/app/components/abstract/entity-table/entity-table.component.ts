import {Component, OnInit} from '@angular/core';
import {LogService} from '../../../services/log.service';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export abstract class EntityTableComponent implements OnInit {

  protected constructor(protected logger: LogService) {

  }

  ngOnInit(): void {

  }
}

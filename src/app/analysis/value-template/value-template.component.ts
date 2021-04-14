import {Component, OnInit, AfterViewInit, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ValueDataService} from '../services/value/value-data.service';
import {Analysis} from '../model/Analysis';
import {LogService} from '../../shared/services/log.service';

@Component({
  selector: 'app-value-template',
  templateUrl: './value-template.component.html',
  styleUrls: ['./value-template.component.css']
})
export class ValueTemplateComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() template: Analysis = new Analysis();

  constructor(
    public logger: LogService,
    public valueDataService: ValueDataService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
    ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.valueDataService.onInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.template === undefined) { return; }
    this.logger.info(this, 'template available');
    this.valueDataService.loadValuesByAnalysisId(this.template.rootEntityID);
  }
}

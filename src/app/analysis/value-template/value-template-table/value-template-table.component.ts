import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Value} from '../../model/Value';
import {LogService} from '../../../shared/services/log.service';
import {ValueDataService} from '../../services/value/value-data.service';
import {Analysis} from '../../model/Analysis';


@Component({
  selector: 'app-value-template-table',
  templateUrl: './value-template-table.component.html',
  styleUrls: ['./value-template-table.component.scss']
})
export class ValueTemplateTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() type!: string;
  @Input() template: Analysis = new Analysis();

  tableDataSource: MatTableDataSource<Value> = new MatTableDataSource<Value>();
  displayedColumns = ['disable', 'name', 'description'];

  constructor(private logger: LogService,
              private valueDataService: ValueDataService,
  ) {
  }

  ngOnInit(): void {
    this.logger.info(this, 'Manually initializing ValueTable (type=' + this.type + ')');
    this.tableDataSource = new MatTableDataSource<Value>(this.filterValues());
    this.initSorting();

    this.valueDataService.loadedValues.subscribe(() => {
      this.logger.info(this, 'Event \'loadedValues\' received from ValueTableComponent');
      this.tableDataSource.data = this.filterValues();
    });

    // this.valueDataService.changedValues.subscribe(() => { // TODO implement
    //   this.logger.info(this, 'Event \'changedValues\' received from ValueTableComponent');
    //   const newFilteredValues: Value[] = this.filterValues();
    //   this.tableDataSource.data = newFilteredValues;
    // });
  }

  filterValues(): Value[] {
    return this.valueDataService.values.filter(val => val.type === this.type);
  }

  ngAfterViewInit(): void {
  }

  private initSorting(): void {
    this.tableDataSource.sort = this.sort;
  }

  createDefaultValue(): Value {
    const value = new Value();

    value.type = this.type;
    value.description = '';
    value.analysis = this.template; // this.analysisDataService.getCurrentAnalysis(); // TODO get analysis via event

    return value;
  }

  createValue(): void {
    this.logger.info(this, 'Create Value');
    this.valueDataService.createValue(this.createDefaultValue());
  }

  updateValue(value: Value): void {
    this.logger.info(this, 'Update Value');
    this.valueDataService.updateValue(value);
  }

  deleteValue(value: Value): void {
    this.logger.info(this, 'Delete Value');
    this.valueDataService.deleteValue(value);
  }

  nameChange(value: Value): void {
    this.logger.info(this, 'Name changed');
    this.updateValue(value);
  }

  descriptionChange(value: Value): void {
    this.logger.info(this, 'Description changed');
    this.updateValue(value);
  }
}

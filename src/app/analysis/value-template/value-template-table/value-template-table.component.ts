import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Value} from '../../model/Value';
import {LogService} from '../../../shared/services/log.service';
import {ValueDataService} from '../../services/value/value-data.service';


@Component({
  selector: 'app-value-template-table',
  templateUrl: './value-template-table.component.html',
  styleUrls: ['./value-template-table.component.scss']
})
export class ValueTemplateTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() type!: string;

  tableDataSource: MatTableDataSource<Value> = new MatTableDataSource<Value>();
  displayedColumns = ['disable', 'name', 'description'];

  constructor(private logger: LogService,
              private valueDataService: ValueDataService,
  ) {
    this.initSorting();
  }

  dummyValue(): Value {
    const value = new Value();
    value.name = 'valName';
    value.description = 'description';
    value.type = 'SOCIAL';
    value.archived = false;
    value.editable = true;
    value.id = 'UUID';
    return value;
  }

  ngOnInit(): void {
    this.logger.info(this, 'Manually initializing ValueTable (type=' + this.type + ')');
    this.tableDataSource = new MatTableDataSource<Value>(this.filterValues(this.valueDataService.values));
    this.initSorting();

    this.valueDataService.loadedValues.subscribe((newValues: Value[]) => {
      this.logger.info(this, 'Event \'loadedValues\' received from ValueTableComponent');
      this.tableDataSource = new MatTableDataSource<Value>(this.filterValues(newValues));
      this.initSorting();
    });

    this.valueDataService.changedValues.subscribe((newValues: Value[]) => {
      this.logger.info(this, 'Event \'changedValues\' received from ValueTableComponent');
      this.tableDataSource.data = this.filterValues(newValues);
    });
  }

  filterValues(values: Value[]): Value[] {
    values.forEach(it => {
      this.logger.info(this, 'VALUE: ' + it.name + ', TYPE: ' + it.type);
      this.logger.info(this, it.description);
    });
    return values.filter(val => val.type === this.type);
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
    // value.analysis = this.analysisDataService.getCurrentAnalysis(); // TODO get analysis via event

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

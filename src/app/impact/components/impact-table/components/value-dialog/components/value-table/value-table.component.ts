import {ValueDataService} from '../../../../../../services/value/value-data.service';
import {Value} from '../../../../../../models/Value';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ImpactDataService} from "../../../../../../services/impact/impact-data.service";
import {LogService} from "../../../../../../../shared/services/log.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnalysisDataService} from "../../../../../../services/analysis/analysis-data.service";
import {Impact} from "../../../../../../models/Impact";

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss', '../../../../../../../layout/style/style.scss']
})
export class ValueTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() type!: string;
  @Output() userWantsToSeeReferencedImpacts: EventEmitter<Value> = new EventEmitter();

  tableDataSource: MatTableDataSource<Value> = new MatTableDataSource<Value>();
  displayedColumns = ['archived', 'name', 'description'];

  constructor(
    private logger: LogService,
    private valueDataService: ValueDataService,
    private impactDataService: ImpactDataService,
    private analysisDataService: AnalysisDataService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.logger.info(this, 'Manually initializing ValueTalbe (type=' + this.type + ')');
    const filteredValues: Value[] = this.filterValues();
    this.tableDataSource = new MatTableDataSource<Value>(filteredValues);
    this.initSorting();

    this.valueDataService.loadedValues.subscribe(vals => {
      this.logger.info(this, 'Event \'loadedValues\' received from ValueTableComponent');
      const filteredValues: Value[] = this.filterValues();
      this.tableDataSource = new MatTableDataSource<Value>(filteredValues);
      this.initSorting();
    });

    this.valueDataService.changedValues.subscribe(vals => {
      this.logger.info(this, 'Event \'changedValues\' received from ValueTableComponent');
      const filteredValues: Value[] = this.filterValues();
      this.tableDataSource = new MatTableDataSource<Value>(filteredValues); // Why does this not work like in impact table?
      this.initSorting();
    });
  }

  filterValues(): Value[] {
    return this.valueDataService.values.filter(val => val.type === this.type);
  }

  ngAfterViewInit(): void {

  }

  private initSorting(): void {
    this.tableDataSource.sort = this.sort;
  }

  createDefaultValue() {
    const value = new Value();

    value.type = this.type
    value.description = ''
    value.analysis = this.analysisDataService.getCurrentAnalysis();

    return value;
  }

  createValue() {
    this.logger.info(this, 'Create Value');
    this.valueDataService.createValue(this.createDefaultValue());

  }

  updateValue(value: Value) {
    this.logger.info(this, 'Update Value');
    this.valueDataService.updateValue(value);
  }

  deleteValue(value: Value) {
    this.logger.info(this, 'Delete Value');
    const numImpactsUseValue = this.getReferencesImpacts(value);
    if (numImpactsUseValue > 0) {
      this.thwartValueOperation(value, numImpactsUseValue);
    } else {
      this.valueDataService.deleteValue(value);
    }
  }

  nameChange(value: Value): void {
    this.logger.info(this, 'Name changed');
    this.updateValue(value);
  }

  descriptionChange(value: Value): void {
    this.logger.info(this, 'Description changed');
    this.updateValue(value);
  }

  toggleValueArchived(event: Event, value: Value) {
    const numImpactsUseValue = this.getReferencesImpacts(value);
    if (numImpactsUseValue > 0) {
      this.thwartValueOperation(value, numImpactsUseValue);
    } else {
      value.archived = !value.archived;
      this.updateValue(value);
      this.valueDataService.updateValue(value); // This will remove the disabled value from the filter bar dropdown.
    }
  }

  getReferencesImpacts(value: Value): number {
    let numImpactsUseValue = 0;
    this.impactDataService.impacts.forEach(impact => {
      if (impact.valueEntity === value) {
        numImpactsUseValue++;
      }
    });
    return numImpactsUseValue;
  }

  thwartValueOperation(value: Value, numImpactsUseValue: number) {
    this.logger.warn(this, 'This value is still being used by ' + numImpactsUseValue + ' impacts');
    const message = 'This value cannot be excluded from the available selection. It is still being used by '
      + numImpactsUseValue + ' impact' + (numImpactsUseValue === 1 ? '' : 's') + '.';
    const action = 'show'
    const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
    snackBarRef.onAction().subscribe(() => {
      this.logger.info(this, 'User wants to see the impacts referencing the value');
      this.userWantsToSeeReferencedImpacts.emit(value);
    });
  }
}

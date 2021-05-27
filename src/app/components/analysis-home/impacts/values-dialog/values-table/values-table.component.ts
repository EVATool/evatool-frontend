import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Value} from '../../../../../model/Value';
import {LogService} from '../../../../../services/log.service';
import {ValueDataService} from '../../../../../services/data/value-data.service';
import {ImpactDataService} from '../../../../../services/data/impact-data.service';
import {AnalysisDataService} from '../../../../../services/data/analysis-data.service';
import {Impact} from '../../../../../model/Impact';

@Component({
  selector: 'app-values-table',
  templateUrl: './values-table.component.html',
  styleUrls: ['./values-table.component.scss']
})
export class ValuesTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() valueType!: string;
  @Output() userWantsToSeeReferencedImpacts: EventEmitter<Value> = new EventEmitter();

  displayedColumns = ['archived', 'name', 'description'];
  tableDataSource: MatTableDataSource<Value> = new MatTableDataSource<Value>();

  constructor(
    private logger: LogService,
    private valueDataService: ValueDataService,
    private impactDataService: ImpactDataService,
    private analysisDataService: AnalysisDataService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.valueDataService.loadedValues.subscribe((values: Value[]) => {
      this.updateTableDataSource();
    });

    this.valueDataService.createdValue.subscribe((value: Value) => {
      this.updateTableDataSource();
      //const options = {bottom: -100, duration: 250};
      //this.scrollbarRef.scrollTo(options);
      // Flash newly created impact.
    });

    this.valueDataService.deletedValue.subscribe((value: Value) => {
      this.updateTableDataSource();
    });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    this.initSorting();
    //this.initFiltering();
  }

  updateTableDataSource(): void {
    this.tableDataSource.data = this.valueDataService.values.filter(val => val.type === this.valueType);
  }

  initSorting(): void {
    this.tableDataSource.sort = this.sort;
  }

  createValue() {
    const value = this.valueDataService.createDefaultValue(
      this.analysisDataService.currentAnalysis);
    value.type = this.valueType
    this.valueDataService.createValue(value);
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

  toggleValueArchived(event: Event, value: Value) {
    const numImpactsUseValue = this.getReferencesImpacts(value);
    if (numImpactsUseValue > 0) {
      this.thwartValueOperation(value, numImpactsUseValue);
    } else {
      value.archived = !value.archived;
      this.updateValue(value);
    }
  }

  getReferencesImpacts(value: Value): number {
    let numImpactsUseValue = 0;
    this.impactDataService.impacts.forEach((impact: Impact) => {
      if (impact.value === value) {
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

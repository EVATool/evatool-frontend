import {ValueDataService} from '../../../../../../services/value/value-data.service';
import {Value} from '../../../../../../models/Value';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Component, Input, OnInit, AfterViewInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {ImpactDataService} from "../../../../../../services/impact/impact-data.service";
import {LogService} from "../../../../../../../shared/services/log.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss', '../../../../../../../layout/style/style.css']
})
export class ValueTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() type!: string;
  @Output() userWantsToSeeReferencedImpacts: EventEmitter<Value> = new EventEmitter();

  tableDataSource: MatTableDataSource<Value> = new MatTableDataSource<Value>();
  displayedColumns = ['disable', 'name', 'description'];

  constructor(
    private logger: LogService,
    private valueDataService: ValueDataService,
    private impactDataService: ImpactDataService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const values: Value[] = this.valueDataService.values.filter(dim => dim.type === this.type);
    this.tableDataSource = new MatTableDataSource<Value>(values);
    this.initSorting();
  }

  private initSorting(): void {
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.sortingDataAccessor = (impact, property) => {
      switch (property) {
        case 'stakeholder':
          return impact.stakeholder.name;
        case 'valueEntity':
          return impact.value.name;
        default:
          return impact[property];
      }
    };
  }

  toggleValueDisable(event: Event, value: Value) {
    let numImpactsUseValue = 0;
    this.impactDataService.impacts.forEach(impact => {
      if (impact.valueEntity === value) {
        numImpactsUseValue++;
      }
    });
    if (numImpactsUseValue > 0) {
      this.logger.warn(this, 'This value is still being used by ' + numImpactsUseValue + ' impacts');
      const message = 'This value cannot be excluded from the available selection. It is still being used by ' + numImpactsUseValue + ' impacts.';
      const action = 'show me'
      const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
      snackBarRef.onAction().subscribe(() => {
        this.logger.info(this, 'User wants to see the impacts referencing the value');
        this.userWantsToSeeReferencedImpacts.emit(value);
      });
    } else {
      value.disable = !value.disable;
    }
  }
}

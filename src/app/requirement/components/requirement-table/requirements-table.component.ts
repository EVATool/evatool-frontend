
import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Requirements} from '../../models/Requirements';
import {Dimension} from '../../models/Dimension';
import {Impact} from '../../models/Impact';
import {MatTableDataSource} from '@angular/material/table';
import {RequirementsRestService} from '../../services/requirements/requirements-rest.service';
import {MatSort, Sort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {RequirementsDataService} from '../../services/requirements/requirements-data.service';
import {VariantDialogComponent} from '../../../variant/components/variant-dialog/variant-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-requirement-table',
  templateUrl: './requirements-table.component.html',
  styleUrls: ['./requirements-table.component.css', '../../../layout/style/style.css']
})
export class RequirementsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns: string[] = ['uniqueString', 'requirementDescription', 'variantsTitle', 'values'];
  requirementsSource: Requirements[] = [];
  impactSoureces: Impact[] = [];
  tableDatasource: MatTableDataSource<Requirements> = new MatTableDataSource<Requirements>();
  idForProject = '';
  columnDefinitions = [
    { def: 'uniqueString', hide: true },
    { def: 'requirementDescription', hide: true },
    { def: 'variantsTitle', hide: true },
    { def: 'values', hide: true }
  ];
  private selectedRequirements: Requirements = new Requirements();
  constructor(private requirementsRestService: RequirementsRestService,
              private requirementsDataService: RequirementsDataService,
              private router: Router,
              private dialog: MatDialog){
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.requirementsDataService.loadedRequirements.subscribe((requirements: Requirements[]) => {
      this.tableDatasource = new MatTableDataSource<Requirements>(requirements);
      this.initSorting();
    });
    this.requirementsDataService.changedRequirements.subscribe((requirements: Requirements[]) => {
      this.tableDatasource.data = requirements;
    });
    this.requirementsRestService.getImpacts().subscribe((result: any) => {
      this.impactSoureces = [];
      result.forEach((impactRest: Impact) => {
        const impact: Impact = {
          id: impactRest.id,
          description: impactRest.description,
          value: impactRest.value,
          dimension: impactRest.dimension
        };
        this.impactSoureces.push(impact);
      });
      let impactIdList: string[] = [];
      this.impactSoureces.forEach(value => {
        impactIdList = impactIdList.concat(value.id);
        this.columnDefinitions.push({def: value.id, hide: true });
      });
      this.displayedColumns = this.displayedColumns.concat(impactIdList);
    });
    this.tableDatasource.data = this.requirementsSource;
    this.requirementsDataService.onInit();
  }

  getDisplayedColumns(): string[] {
    this.randomFilter();
    return this.columnDefinitions
      .filter(cd => cd.hide)
      .map(cd => cd.def);
  }
  private initSorting(): void {
    this.tableDatasource.sort = this.sort;
    // const sortState: Sort = {active: 'Requirements', direction: 'asc'};
    // this.sort.active = sortState.active;
    // this.sort.direction = sortState.direction;
    // this.sort.sortChange.emit(sortState);
  }
  concatDimension(parameter: any): string {
    let value = '';
    const dimension: Dimension[] = parameter.values;
    if (dimension == null){ return value; }
    dimension.forEach(value1 => value = value.concat(value1.valueTitle, '\n'));
    return value;
  }

  concatVariants(element: any): string {
    let value = '';
    const variants: any = element.variantsTitle;
    if (variants == null) { return value; }
    Object.keys(variants).forEach(value1 => value = value.concat(variants[value1].variantsTitle, '\n'));
    return value;
  }

  checkValue(element: Requirements, impact: Impact): string {
    let value = '';
    if (element.requirementImpactPoints == null) { return value; }
    if (element.requirementImpactPoints[impact.id] != null) {
      const points: number | undefined = element.requirementImpactPoints[impact.id].points;
      if (points && 0 < points) {
        value = '' + points;
      } else {
        value = '' + points;
      }
    }
    return value;
  }

  isPositiv(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints == null) { return false; }
    if (element.requirementImpactPoints[impact.id] != null) {
      const points: number | undefined = element.requirementImpactPoints[impact.id].points;
      if (points && 0 < points) {
        return true;
      }
    }
    return false;
  }

  isNegativ(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints == null) { return false; }
    if (element.requirementImpactPoints[impact.id] != null) {
      const points: number | undefined = element.requirementImpactPoints[impact.id].points;
      if (points && 0 > points) {
        return true;
      }
    }
    return false;
  }

  clickFunction(element: Requirements, impact: Impact): void {
    if (element.requirementImpactPoints == null) { element.requirementImpactPoints = {}; }
    if (element.requirementImpactPoints[impact.id] == null) {
      element.requirementImpactPoints[impact.id] = {
        entityId: impact.id,
        impactDescription: impact.description,
        points: 1
      };
      element.requirementImpactPoints[impact.id].points = 1;
    } else if (element.requirementImpactPoints[impact.id].points === 1) {
      element.requirementImpactPoints[impact.id].points = -1;
    } else {
      delete element.requirementImpactPoints[impact.id];
    }
    if (element.rootEntityId != null) {
      this.requirementsRestService.updateRequirements(element).subscribe(value => {
      });
    } else {
      this.requirementsRestService.createRequirements(element).subscribe(value => {
        this.requirementsSource.pop();
        this.requirementsSource.push(value);
        this.tableDatasource.data = this.requirementsSource;
      });
    }
  }

  addRequirements(): void {
    const requirementNew: Requirements = new Requirements();
    requirementNew.projectID = this.idForProject;
    requirementNew.requirementDescription = 'generated requirement';
    this.requirementsRestService.createRequirements(requirementNew).subscribe(value => {
      this.requirementsSource.push(value);
      this.tableDatasource.data = this.requirementsSource;
    });
  }

  descriptionChange(requirements: Requirements, event: Event): void {
    this.updateImpact(requirements);
  }

  deleteImpact(requirements: Requirements): void {
    this.requirementsDataService.deleteRequirement(requirements);
  }

  updateImpact(requirements: Requirements): void {
    this.requirementsRestService.updateRequirements(requirements).subscribe();
  }

  private randomFilter(): void{
    const end = this.getRandomInt(10);
    this.columnDefinitions.forEach(cd => {
      if (cd.def.endsWith('' + end)){
        cd.hide = false;
      }
    });
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  testKeyPress(event: any): void{
    if (event.ctrlKey && event.keyCode === 10){
      this.requirementsDataService.copyRequirement(this.selectedRequirements);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VariantDialogComponent, { data : {id: ''}});
  }
  public getSelectedRequirment(requirements: Requirements): void{
    this.selectedRequirements = requirements;
  }
}

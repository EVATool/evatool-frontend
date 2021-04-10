
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
import {Variants} from '../../models/Variants';

@Component({
  selector: 'app-requirement-table',
  templateUrl: './requirements-table.component.html',
  styleUrls: ['./requirements-table.component.scss', '../../../layout/style/style.css']
})
export class RequirementsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns: string[] = ['uniqueString', 'requirementDescription', 'variantsTitle', 'values'];
  requirementsSource: Requirements[] = [];
  impactSoureces: Impact[] = [];
  variantsSoureces: Variants[] = [];
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
    this.requirementsRestService.getVariants().subscribe((result: any) => {
      this.variantsSoureces = [];
      result.forEach((variantsRest: Variants) => {
        const variants: Variants = {
          entityId: variantsRest.id,
          description: variantsRest.description,
          variantsTitle: variantsRest.title,
          archived: variantsRest.archived
        };
        this.variantsSoureces.push(variants);
      });
    });
    this.tableDatasource.data = this.requirementsSource;
    this.requirementsDataService.onInit();
  }

  getDisplayedColumns(): string[] {
    // this.randomFilter();
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

  isPositiv(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints == null || element.requirementImpactPoints.length === 0) { return false; }
    let retValue = false;
    element.requirementImpactPoints.forEach(value => {
      if (value.entityId === impact.id){
        const points: number | undefined = value.points;
        if (points && 0 < points) {
          retValue = true;
        }
      }
    });
    return retValue;
  }

  isNegativ(element: Requirements, impact: Impact): boolean {
    if (element.requirementImpactPoints == null || element.requirementImpactPoints.length === 0) { return false; }
    let retValue = false;
    element.requirementImpactPoints.forEach(value => {
      if (value.entityId === impact.id){
        const points: number | undefined = value.points;
        if (points && 0 > points) {
          retValue = true;
        }
      }
    });
    return retValue;
  }

  clickFunction(element: Requirements, impact: Impact): void {
  }

  descriptionChange(requirements: Requirements, event: Event): void {
    this.updateRequirement(requirements);
  }

  deleteImpact(requirements: Requirements): void {
    this.requirementsDataService.deleteRequirement(requirements);
  }

  updateRequirement(requirements: Requirements): void {
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

  variantsChange(element: Requirements, $event: any): void {
    console.log($event);
    const variantId: string = $event.value;
    const variantArray: Variants[] = [];
    const variant: Variants = new Variants();
    variant.entityId = variantId;
    variantArray.push(variant);
    element.variantsTitle = variantArray;
    this.updateRequirement(element);
  }

  checkAchrived(variantsTitleElement: Variants[]): void {
    if (variantsTitleElement.length > 0 && variantsTitleElement[0].archived){
      const dialogRef = this.dialog.open(VariantDialogComponent, { data : {id: '' + variantsTitleElement[0].entityId}});
    }
  }
}

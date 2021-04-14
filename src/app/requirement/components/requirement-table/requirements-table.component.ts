
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
import {MatSliderChange} from '@angular/material/slider';
import {RequirementImpactPoints} from '../../models/RequirementImpactPoints';

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
  showElement = [
    {req: '', imp: ''}
  ];
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
    this.router.routerState.root.queryParams.subscribe(params => {
      this.requirementsDataService.loadedRequirements.subscribe((requirements: Requirements[]) => {
        this.tableDatasource = new MatTableDataSource<Requirements>(requirements);
        this.initSorting();
      });
      this.requirementsDataService.changedRequirements.subscribe((requirements: Requirements[]) => {
        this.tableDatasource.data = requirements;
      });
      this.requirementsDataService.addedRequirement.subscribe((requirements: Requirements) => {
        this.showElement = [];
        this.impactSoureces.forEach(imp => {
          this.showElement.push({req: requirements.rootEntityId, imp: imp.id});
        });
      });
      this.requirementsRestService.getImpacts(params.id).subscribe((result: any) => {
        this.impactSoureces = [];
        result.forEach((impactRest: Impact) => {
          const impact: Impact = {
            id: impactRest.id,
            uniqueString: impactRest.uniqueString,
            description: impactRest.description,
            value: impactRest.value,
            dimension: impactRest.dimension
          };
          this.impactSoureces.push(impact);
        });
        let impactIdList: string[] = [];
        this.impactSoureces.forEach(value => {
          impactIdList = impactIdList.concat(value.id);
          this.columnDefinitions.push({def: value.id, hide: true});
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
        const points: number | null = value.points;
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
        const points: number | null = value.points;
        if (points && 0 > points) {
          retValue = true;
        }
      }
    });
    return retValue;
  }

  clickFunction(element: Requirements, impact: Impact): void {
    let exist = false;
    let toDelete;
    this.showElement.forEach(se => {
      if (se.req === element.rootEntityId && se.imp === impact.id){
        exist =  true;
        toDelete = se;
      }
    });
    if (exist && toDelete != null){
      const index = this.showElement.indexOf(toDelete, 0);
      if (index > -1) {
        this.showElement.splice(index, 1);
      }
    }else{
      this.showElement.push({req: element.rootEntityId, imp: impact.id});
    }
  }

  valueChange(element: Requirements, impact: Impact, event: MatSliderChange): void {
    console.log(event.value);
    if (event.value !== null) {
      if (event.value === 0.0) {
        let toDelete: null | RequirementImpactPoints = null;
        element.requirementImpactPoints.forEach(value => {
          if (value.entityId === impact.id) {
            toDelete = value;
          }
        });
        if (toDelete != null){
          const index = element.requirementImpactPoints.indexOf(toDelete, 0);
          if (index > -1) {
            element.requirementImpactPoints.splice(index, 1);
          }
        }
      } else {
        let found = false;
        element.requirementImpactPoints.forEach(value => {
          if (value.entityId === impact.id) {
            value.points = event.value;
            found = true;
          }
        });
        if (!found) {
          const newPoint: RequirementImpactPoints = {
            points: event.value,
            entityId: impact.id,
            impactDescription: impact.description,
          };
          element.requirementImpactPoints.push(newPoint);
        }
      }
    }
    this.updateRequirement(element);
  }

  descriptionChange(requirements: Requirements, event: Event): void {
    this.updateRequirement(requirements);
  }

  deleteImpact(requirements: Requirements): void {
    this.requirementsDataService.deleteRequirement(requirements);
  }

  updateRequirement(requirements: Requirements): void {
    this.requirementsDataService.updateRequirements(requirements);
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
  getSelectedRequirment(requirements: Requirements): void{
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

  valueForCell(element: Requirements, impact: Impact): number {
    let retValue: number | null = 0;
    element.requirementImpactPoints.forEach(value => {
      if (value.entityId === impact.id) {
        retValue = value.points;
      }
    });
    return retValue;
  }

  show(element: Requirements, impact: Impact): boolean {
    let retValue = false;
    this.showElement.forEach(se => {
      if (se.req === element.rootEntityId && se.imp === impact.id){
        retValue =  true;
      }
    });
    return retValue;
  }
}

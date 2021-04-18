import {EventEmitter, Injectable, Output} from '@angular/core';
import {Requirements} from '../../models/Requirements';
import {RequirementsRestService} from './requirements-rest.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../../../variant/models/Variant';

@Injectable({
  providedIn: 'root'
})
export class RequirementsDataService {
  @Output() loadedRequirements: EventEmitter<Requirements[]> = new EventEmitter();
  @Output() addedRequirement: EventEmitter<Requirements> = new EventEmitter();
  @Output() changedRequirement: EventEmitter<Requirements> = new EventEmitter();
  @Output() removedRequirement: EventEmitter<Requirements> = new EventEmitter();
  @Output() changedRequirements: EventEmitter<Requirements[]> = new EventEmitter();
  matDataSource = new MatTableDataSource<Requirements>();



  requirements: Requirements[] = [];
  requirementsSource: Requirements[] = [];
  public searchtext = '';

  constructor(private requirementsRestService: RequirementsRestService,
              private router: Router) {
  }
  onInit(): void {
    this.router.routerState.root.queryParams.subscribe(params => {
      this.requirementsRestService.getRequirements(params.id).subscribe(result => {
        this.requirementsSource = [];
        result.forEach((requirementRest: Requirements) => {
          const requirement: Requirements = {
            rootEntityId : requirementRest.rootEntityId,
            projectID : requirementRest.projectID,
            uniqueString : requirementRest.uniqueString,
            requirementDescription : requirementRest.requirementDescription,
            values : requirementRest.values,
            requirementImpactPoints : requirementRest.requirementImpactPoints,
            variantsTitle : requirementRest.variantsTitle
          };
          this.requirementsSource.push(requirement);
        });
        this.matDataSource = new MatTableDataSource<Requirements>(this.requirements);
        this.requirements = this.requirementsSource;
        this.loadedRequirements.emit(this.requirements);
      });
    });
  }

  loadRequirements(): void{
    this.onInit();
  }

  getMatDataSource(): MatTableDataSource<Requirements>{
    this.onInit();
    return this.matDataSource;
  }

  createRequirement(idForProject: string): void {
    const requirementNew: Requirements = new Requirements();
    requirementNew.projectID = idForProject;
    requirementNew.requirementDescription = 'generated requirement';
    this.requirementsRestService.createRequirements(requirementNew).subscribe(value => {
      this.requirements.push(value);
      this.addedRequirement.emit(value);
      this.changedRequirements.emit(this.requirements);
    });
  }

  createRequirementt(): void {
    const requirement = this.createDefaultRequirement();
    this.requirements.push(requirement);
    this.matDataSource = new MatTableDataSource<Requirements>(this.requirements);
  }

  deleteRequirement(requirements: Requirements): void {
    this.requirementsRestService.deleteRequirements(requirements).subscribe(value => {
      const index = this.requirements.indexOf(requirements, 0);
      this.requirements.splice(index, 1);
      this.removedRequirement.emit(value);
      this.changedRequirements.emit(this.requirements);
    });
  }

  copyRequirement(selectedQuestion: Requirements): void {
    if (selectedQuestion.projectID != null) {
      const requirementNew: Requirements = new Requirements();
      requirementNew.requirementImpactPoints = selectedQuestion.requirementImpactPoints;
      requirementNew.variantsTitle = selectedQuestion.variantsTitle;
      requirementNew.projectID = selectedQuestion.projectID;
      requirementNew.requirementDescription = selectedQuestion.requirementDescription;
      requirementNew.values = selectedQuestion.values;
      this.requirementsRestService.createRequirements(requirementNew).subscribe(value => {
        this.requirements.push(value);
        this.addedRequirement.emit(value);
        this.changedRequirements.emit(this.requirements);
      });
    }
  }

  updateRequirements(element: Requirements): void {
    this.requirementsRestService.updateRequirements(element).subscribe(value => {
      element.values = value.values;
      element.requirementDescription = value.requirementDescription;
      element.variantsTitle = value.variantsTitle;
      element.requirementImpactPoints = value.requirementImpactPoints;
      this.changedRequirement.emit(element);
      this.changedRequirements.emit(this.requirements);
    });
  }

  setSearchText(text: string): void{
    this.searchtext = text;
  }

  private createDefaultRequirement(): Requirements {
    const requirement = new Requirements();
    requirement.editable = true;
    return requirement;
  }

}

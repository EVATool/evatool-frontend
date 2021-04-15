import { Injectable, Output, EventEmitter } from '@angular/core';
import {Requirements} from '../../models/Requirements';
import {RequirementsRestService} from './requirements-rest.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequirementsDataService {
  @Output() loadedRequirements: EventEmitter<Requirements[]> = new EventEmitter();
  @Output() addedRequirement: EventEmitter<Requirements> = new EventEmitter();
  @Output() changedRequirement: EventEmitter<Requirements> = new EventEmitter();
  @Output() removedRequirement: EventEmitter<Requirements> = new EventEmitter();
  @Output() changedRequirements: EventEmitter<Requirements[]> = new EventEmitter();



  requirements: Requirements[] = [];
  requirementsSource: Requirements[] = [];

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
        this.requirements = this.requirementsSource;
        this.loadedRequirements.emit(this.requirements);
      });
    });
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
}

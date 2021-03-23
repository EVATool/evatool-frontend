import { Injectable, Output, EventEmitter } from '@angular/core';
import {Requirements} from '../../models/Requirements';
import {Dimension} from '../../models/Dimension';
import {RequirementsRestService} from './requirements-rest.service';
import {MatTableDataSource} from "@angular/material/table";

@Injectable({
  providedIn: 'root'
})
export class RequirementsDataService {
  @Output() onCreateRequirement: EventEmitter<Requirements> = new EventEmitter();



  requirements: Requirements[] = [];

  constructor(requirementsRestService: RequirementsRestService) {
    requirementsRestService.getRequirements().subscribe((result: any) => {
      this.requirements = [];
      result.forEach((requirementRest: Requirements) => {
        const requirement: Requirements = {
          rootEntityId : requirementRest.rootEntityId,
          projectID : requirementRest.projectID,
          requirementTitle : requirementRest.requirementTitle,
          requirementDescription : requirementRest.requirementDescription,
          dimensions : requirementRest.dimensions,
          impactDescription : requirementRest.impactDescription,
          // requirementImpactPoints : new Map(Object.entries(requirementRest.requirementImpactPoints)),
          requirementImpactPoints : requirementRest.requirementImpactPoints,
          variantsTitle : requirementRest.variantsTitle
        };
        this.requirements.push(requirement);
      });
    });
  }

  getRequirements(): Requirements[] {
    return this.requirements;
  }

  private createDefaultRequirement(): Requirements {
    /*let impact = new Requirements();

    impact.id = 'TEST';
    impact.value = -0.9;
    impact.description = "Dieser Impact wurde erstellt";
    impact.dimension = this.dimensionDataService.getDefaultDimension();

    return impact;*/
    return new Requirements();
  }

  createImpact(): Requirements {
    const requirement = this.createDefaultRequirement();
    this.requirements.push(requirement);
    this.onCreateRequirement.emit(requirement);
    return requirement;
  }

}

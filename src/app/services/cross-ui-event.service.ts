import {HttpLoaderService} from './http-loader.service';
import {HttpInfo} from './HttpInfo';
import {FunctionalErrorCodeService} from './functional-error-code.service';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Impact} from '../model/Impact';
import {RequirementDelta} from '../model/RequirementDelta';
import {ImpactDataService} from './data/impact-data.service';
import {RequirementDeltaDataService} from './data/requirement-delta-data.service';

@Injectable({
  providedIn: 'root'
})
export class CrossUiEventService { // TODO use this instead of routing events manually through UI screens
  @Output() impactReferencedByRequirement: EventEmitter<ImpactReferencedByRequirementEvent> = new EventEmitter();
  @Output() userWantsToSeeImpactReferencedByRequirement: EventEmitter<ImpactReferencedByRequirementEvent> = new EventEmitter();

  constructor(private httpLoader: HttpLoaderService,
              private impactData: ImpactDataService,
              private requirementDeltaData: RequirementDeltaDataService) {
  }

  init(): void {
    this.httpLoader.httpError.subscribe((httpInfo: HttpInfo) => {
      switch (httpInfo.functionalErrorCode) {
        case FunctionalErrorCodeService.IMPACT_REFERENCED_BY_REQUIREMENT:
          const impact = this.impactData.impacts.find(i => i.id = httpInfo.tag.impactId);
          const deltas = this.requirementDeltaData.requirementDeltas.filter(rd => httpInfo.tag.requirementDeltaIds.includes(rd.id));
          if (impact && deltas) {
            this.impactReferencedByRequirement.emit(new ImpactReferencedByRequirementEvent(impact, deltas));
          }
          break;

        default:
          // no functional error.
          break;
      }
    });
  }
}

export class ImpactReferencedByRequirementEvent {

  impact!: Impact;
  deltas!: RequirementDelta[];

  constructor(impact: Impact, deltas: RequirementDelta[]) {
    this.impact = impact;
    this.deltas = deltas;
  }
}

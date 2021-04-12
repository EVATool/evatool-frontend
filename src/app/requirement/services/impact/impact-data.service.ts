import { DimensionDataService } from '../dimension/dimension-data.service';
import { Impact } from '../../models/Impact';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {
  @Output() onCreateImpact: EventEmitter<Impact> = new EventEmitter();

  dummyImpacts: Impact[] = [];

  impacts: Impact[] = this.dummyImpacts;

  constructor(
    private dimensionDataService: DimensionDataService) {
    for (let impact of this.impacts) {
      impact.dimension = this.dimensionDataService.getDimensions()[Math.floor(Math.random() * Math.floor(4))];
    }
  }

  getImpacts(): Impact[] {
    return this.impacts;
  }

  private createDefaultImpact(): Impact {
    let impact = new Impact();

    impact.id = 'TEST';
    impact.value = -0.9;
    impact.dimension = this.dimensionDataService.getDefaultDimension();

    return impact;
  }

  createImpact(): Impact {
    let impact = this.createDefaultImpact();
    this.impacts.push(impact);
    this.onCreateImpact.emit(impact);
    return impact;
  }
}

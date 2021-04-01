import { DimensionDataService } from '../dimension/dimension-data.service';
import { Impact } from '../../models/Impact';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {
  @Output() onCreateImpact: EventEmitter<Impact> = new EventEmitter();

  dummyImpacts: Impact[] = [
    {
      id: '1',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { entityId: '21', dimensionTitle: 'Feelings'},
      analysis: { id: '7' }
    },
    {
      id: '2',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { entityId: '22', dimensionTitle: 'Control' },
      analysis: { id: '7' }
    },
    {
      id: '3',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { entityId: '23', dimensionTitle: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { entityId: '24', dimensionTitle: 'Safety'},
      analysis: { id: '7' }
    }
  ];

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
    impact.description = "Dieser Impact wurde erstellt";
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

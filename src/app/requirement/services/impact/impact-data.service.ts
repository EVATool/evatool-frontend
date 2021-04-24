import {ValueDataService} from '../value/value-data.service';
import {Impact} from '../../models/Impact';
import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImpactDataService {
  @Output() onCreateImpact: EventEmitter<Impact> = new EventEmitter();

  dummyImpacts: Impact[] = [];

  impacts: Impact[] = this.dummyImpacts;

  constructor(
    private valueDataService: ValueDataService) {
    for (const impact of this.impacts) {
      impact.valueSystem = this.valueDataService.getValues()[Math.floor(Math.random() * Math.floor(4))];
    }
  }

  getImpacts(): Impact[] {
    return this.impacts;
  }

  private createDefaultImpact(): Impact {
    const impact = new Impact();

    impact.id = 'TEST';
    impact.value = -0.9;
    impact.valueSystem = this.valueDataService.getDefaultValue();

    return impact;
  }

  createImpact(): Impact {
    const impact = this.createDefaultImpact();
    this.impacts.push(impact);
    this.onCreateImpact.emit(impact);
    return impact;
  }
}

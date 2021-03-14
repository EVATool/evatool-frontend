import {Injectable} from '@angular/core';
import {Requirements} from '../models/Requirements';
import {Dimension} from '../models/Dimension';

@Injectable({
  providedIn: 'root'
})
export class Datagenerator {
  requirements: Requirements[] = this.createDumyyRequirements();

  constructor() {
  }

  getRequirements(): Requirements[] {
    return this.requirements;
  }

  private createDumyyRequirements(): Requirements[] {
    const requirement1: Requirements = new Requirements();
    requirement1.rootid = '100';
    requirement1.projetid = '1';
    requirement1.requirementTitle = 'RE01';
    requirement1.requirementDescription = 'This is the first read-only requirement';
    requirement1.dimensions = new Set<Dimension>();
    requirement1.dimensions.add({id: '21', name: 'Feelings'});
    requirement1.impactDescription = new Map<string, string>();
    requirement1.impactDescription.set('1', 'This is the first read-only impact');
    requirement1.requirementImpactPoints = new Map<string, number>();
    requirement1.requirementImpactPoints.set('1', 1);
    requirement1.variantsTitle = new Map<string, string>();
    const requirement2: Requirements = new Requirements();
    requirement2.rootid = '101';
    requirement2.projetid = '1';
    requirement2.requirementTitle = 'RE02';
    requirement2.requirementDescription = 'This is the second read-only requirement';
    requirement2.dimensions = new Set<Dimension>();
    requirement2.dimensions.add({id: '22', name: 'Control'});
    requirement2.dimensions.add({id: '21', name: 'Feelings'});
    requirement2.impactDescription = new Map<string, string>();
    requirement2.impactDescription.set('1', 'This is the first read-only impact');
    requirement2.impactDescription.set('2', 'This is the second read-only impact');
    requirement2.requirementImpactPoints = new Map<string, number>();
    requirement2.requirementImpactPoints.set('1', 1);
    requirement2.requirementImpactPoints.set('2', -1);
    requirement2.variantsTitle = new Map<string, string>();
    requirement2.variantsTitle.set('2', 'Variants2');

    const array: Requirements[] = [requirement1, requirement2];
    return array;
  }
}

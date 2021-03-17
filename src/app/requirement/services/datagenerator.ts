import {EventEmitter, Injectable, Output} from '@angular/core';
import {Requirements} from '../models/Requirements';
import {Dimension} from '../models/Dimension';
import {Impact} from '../models/Impact';

@Injectable({
  providedIn: 'root'
})
export class Datagenerator {
  @Output() onCreateImpact: EventEmitter<Requirements> = new EventEmitter();

  requirements: Requirements[] = this.createDumyyRequirements();
  impacts: Impact[] = [
    {
      id: '1',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { id: '21', name: 'Feelings'},
      analysis: { id: '7' }
    },
    {
      id: '2',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '22', name: 'Control' },
      analysis: { id: '7' }
    },
    {
      id: '3',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '4',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety'},
      analysis: { id: '7' }
    },
    {
      id: '5',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { id: '21', name: 'Feelings'},
      analysis: { id: '7' }
    },
    {
      id: '6',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '22', name: 'Control' },
      analysis: { id: '7' }
    },
    {
      id: '7',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '8',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety'},
      analysis: { id: '7' }
    },
    {
      id: '9',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { id: '21', name: 'Feelings'},
      analysis: { id: '7' }
    },
    {
      id: '10',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '22', name: 'Control' },
      analysis: { id: '7' }
    },
    {
      id: '11',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '12',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety'},
      analysis: { id: '7' }
    },
    {
      id: '13',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { id: '21', name: 'Feelings'},
      analysis: { id: '7' }
    },
    {
      id: '14',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '22', name: 'Control' },
      analysis: { id: '7' }
    },
    {
      id: '15',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '16',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety'},
      analysis: { id: '7' }
    },
    {
      id: '17',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '18',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety'},
      analysis: { id: '7' }
    },
    {
      id: '19',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { id: '21', name: 'Feelings'},
      analysis: { id: '7' }
    },
    {
      id: '20',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '22', name: 'Control' },
      analysis: { id: '7' }
    },
    {
      id: '21',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '22',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety'},
      analysis: { id: '7' }
    },
    {
      id: '23',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { id: '21', name: 'Feelings'},
      analysis: { id: '7' }
    },
    {
      id: '24',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '22', name: 'Control' },
      analysis: { id: '7' }
    },
    {
      id: '25',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '26',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety'},
      analysis: { id: '7' }
    },
    {
      id: '27',
      value: -0.3,
      description: 'This is the first read-only impact',
      dimension: { id: '21', name: 'Feelings'},
      analysis: { id: '7' }
    },
    {
      id: '28',
      value: 0.5,
      description: 'This is the second read-only impact',
      dimension: { id: '22', name: 'Control' },
      analysis: { id: '7' }
    },
    {
      id: '29',
      value: 0.9,
      description: 'This is the third read-only impact',
      dimension: { id: '23', name: 'Finances'},
      analysis: { id: '7' }
    },
    {
      id: '30',
      value: 0.2,
      description: 'This is the fourth read-only impact',
      dimension: { id: '24', name: 'Safety'},
      analysis: { id: '7' }
    }
  ];

  constructor() {
  }

  getRequirements(): Requirements[] {
    return this.requirements;
  }
  getImpacts(): Impact[] {
    return this.impacts;
  }

  private createDumyyRequirements(): Requirements[] {
    // const requirement1: Requirements = new Requirements();
    // requirement1.rootid = '100';
    // requirement1.projetid = '1';
    // requirement1.requirementTitle = 'RE01';
    // requirement1.requirementDescription = 'This is the first read-only requirement';
    // requirement1.dimensions = new Set<Dimension>();
    // requirement1.dimensions.add({id: '21', name: 'Feelings'});
    // requirement1.impactDescription = new Map<string, string>();
    // requirement1.impactDescription.set('1', 'This is the first read-only impact');
    // requirement1.requirementImpactPoints = new Map<string, number>();
    // requirement1.requirementImpactPoints.set('1', 1);
    // requirement1.variantsTitle = new Map<string, string>();
    // const requirement2: Requirements = new Requirements();
    // requirement2.rootid = '101';
    // requirement2.projetid = '1';
    // requirement2.requirementTitle = 'RE02';
    // requirement2.requirementDescription = 'This is the second read-only requirement';
    // requirement2.dimensions = new Set<Dimension>();
    // requirement2.dimensions.add({id: '22', name: 'Control'});
    // requirement2.dimensions.add({id: '21', name: 'Feelings'});
    // requirement2.impactDescription = new Map<string, string>();
    // requirement2.impactDescription.set('1', 'This is the first read-only impact');
    // requirement2.impactDescription.set('2', 'This is the second read-only impact');
    // requirement2.requirementImpactPoints = new Map<string, number>();
    // requirement2.requirementImpactPoints.set('1', 1);
    // requirement2.requirementImpactPoints.set('2', -1);
    // requirement2.variantsTitle = new Map<string, string>();
    // requirement2.variantsTitle.set('2', 'Variants2');
    // const requirement3: Requirements = new Requirements();
    // requirement3.rootid = '100';
    // requirement3.projetid = '1';
    // requirement3.requirementTitle = 'RE03';
    // requirement3.requirementDescription = 'This is the third read-only requirement';
    // requirement3.dimensions = new Set<Dimension>();
    // requirement3.dimensions.add({id: '21', name: 'Feelings'});
    // requirement3.impactDescription = new Map<string, string>();
    // requirement3.impactDescription.set('1', 'This is the first read-only impact');
    // requirement3.requirementImpactPoints = new Map<string, number>();
    // requirement3.requirementImpactPoints.set('1', 1);
    // requirement3.variantsTitle = new Map<string, string>();
    // const requirement4: Requirements = new Requirements();
    // requirement4.rootid = '101';
    // requirement4.projetid = '1';
    // requirement4.requirementTitle = 'RE04';
    // requirement4.requirementDescription = 'This is the fourth read-only requirement';
    // requirement4.dimensions = new Set<Dimension>();
    // requirement4.dimensions.add({id: '22', name: 'Control'});
    // requirement4.dimensions.add({id: '21', name: 'Feelings'});
    // requirement4.impactDescription = new Map<string, string>();
    // requirement4.impactDescription.set('1', 'This is the first read-only impact');
    // requirement4.impactDescription.set('2', 'This is the second read-only impact');
    // requirement4.requirementImpactPoints = new Map<string, number>();
    // requirement4.requirementImpactPoints.set('1', 1);
    // requirement4.requirementImpactPoints.set('2', -1);
    // requirement4.variantsTitle = new Map<string, string>();
    // requirement4.variantsTitle.set('2', 'Variants2');
    //
    // const array: Requirements[] = [requirement1, requirement2, requirement3, requirement4];
    return [];
  }

  public addRequirement(): void {
    const requirement1: Requirements = new Requirements();
    requirement1.rootid = ( Math.random() * 16 ) + '';
    requirement1.projetid = '1';
    if (this.requirements.length < 10){
      requirement1.requirementTitle = 'RE0' + (this.requirements.length + 1);
    }else{
      requirement1.requirementTitle = 'RE' + (this.requirements.length + 1);
    }
    let randomID: number = Math.round(Math.random() * 16);
    requirement1.requirementDescription = 'This is a random created requirement';
    requirement1.dimensions = [];
    requirement1.dimensions.push({id: '21', name: 'Feelings'});
    requirement1.impactDescription = new Map<string, string>();
    requirement1.impactDescription.set('' + randomID, 'This is the first read-only impact');
    requirement1.requirementImpactPoints = new Map<string, number>();
    requirement1.requirementImpactPoints.set('' + randomID, 1);
    requirement1.variantsTitle = new Map<string, string>();
    // this.requirements = this.requirements.concat(requirement1);

    this.requirements.push(requirement1);
    this.onCreateImpact.emit(requirement1);
  }

}

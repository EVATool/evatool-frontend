
import { Injectable, EventEmitter } from '@angular/core';
import {Stakeholder} from '../model/Stakeholder';
import {Observable} from 'rxjs';
import {StakeholderRestService} from './stakeholder-rest.service';
import {StakeholderDTO} from '../model/StakeholderDTO';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {
 onCreateStakeholder: EventEmitter<Stakeholder> = new EventEmitter();


  stakeholders: Stakeholder[] = [];

  constructor( private stakeholderRestService: StakeholderRestService){
    this.getStakeholdersFromServer();
  }

  getStakeholders(): Stakeholder[]{
    return this.stakeholders;
  }

  getStakeholdersFromServer(): Observable<any> {
    console.log('methode getStakeholder');
    return this.stakeholderRestService.getStakeholders();
  }

  private createDefaultstakeholder(): Stakeholder {
    const stakeholder = new Stakeholder();
    stakeholder.editable = true;
    return stakeholder;
  }

  createStakeholder(): Stakeholder {
    const stakeholder = this.createDefaultstakeholder();
    this.stakeholders.push(stakeholder);
    this.onCreateStakeholder.emit(stakeholder);
    return stakeholder;
  }

  save(stakeholder: Stakeholder): void{
    console.log(stakeholder.name);
    stakeholder.editable = false;
    const stakeholderDto = new StakeholderDTO();
    stakeholderDto.guiId = '';
    stakeholderDto.id = '';

    // this.stakeholderRestService.save(stakeholder);
  }

}

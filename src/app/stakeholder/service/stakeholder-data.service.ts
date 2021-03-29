
import { Injectable } from '@angular/core';
import {Stakeholder} from '../model/Stakeholder';
import {StakeholderRestService} from './stakeholder-rest.service';
import {StakeholderDTO} from '../model/StakeholderDTO';
import {MatTableDataSource} from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {

  stakeholders: Stakeholder[] = [];
  matDataSource = new MatTableDataSource<Stakeholder>();

  constructor( private stakeholderRestService: StakeholderRestService){
    this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
    this.loadStakeholder();
  }

  loadStakeholder(): void{
    this.stakeholderRestService.getStakeholders().subscribe((result: any) => {
      this.stakeholders = [];
      result.forEach((stakeholderDTO: StakeholderDTO) => {
        const stakeholder: Stakeholder = {
          id: stakeholderDTO.rootEntityID,
          guiId: stakeholderDTO.guiId,
          level: stakeholderDTO.stakeholderLevel,
          priority: stakeholderDTO.priority,
          name: stakeholderDTO.stakeholderName,
          impact: stakeholderDTO.impact
        };
        this.stakeholders.push(stakeholder);
      });
      this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
    });
  }


  createStakeholder(): void{
    const stakeholder = this.createDefaultStakeholder();
    this.stakeholders.push(stakeholder);
    this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
  }

  save(stakeholder: Stakeholder): void{
    console.log(stakeholder.name);
    this.stakeholderRestService.createStakeholder({
      rootEntityID: '',
      guiId: '',
      stakeholderName: stakeholder.name,
      priority: stakeholder.priority,
      impact: [],
      stakeholderLevel: stakeholder.level
    }).subscribe(() => {
      this.loadStakeholder();
    });
  }

  createDefaultStakeholder(): Stakeholder{
    const stakeholder = new Stakeholder();
    stakeholder.editable = true;
    stakeholder.priority = 0;
    stakeholder.level = '';
    stakeholder.created = true;
    return stakeholder;
  }

  filterPrio(prio: number): void {

    this.resetFilter();
    this.matDataSource.filterPredicate = (data: Stakeholder, filter) => {
      return data.priority === prio;
    };

    this.matDataSource.filter = String(prio);
  }

  filterLevel(level: string): void {

    this.resetFilter();
    this.matDataSource.filterPredicate = (data: Stakeholder, filter) => {
      return data.level === level;
    };

    this.matDataSource.filter = level;
  }

  resetFilter(): void{
    this.matDataSource.filterPredicate = (data: Stakeholder, filter) => {
      return true;
    };
    this.matDataSource.filter = '';
  }

}

import {Injectable, AfterViewInit} from '@angular/core';
import {Stakeholder} from '../model/Stakeholder';
import {StakeholderRestService} from './stakeholder-rest.service';
import {StakeholderDTO} from '../model/StakeholderDTO';
import {MatTableDataSource} from '@angular/material/table';
import {StakeholderImpact} from '../model/StakeholderImpact';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StakeholderDataService {

  stakeholders: Stakeholder[] = [];
  matDataSource = new MatTableDataSource<Stakeholder>();
  public searchtext = '';
  private analysisid: string | null = '';

  constructor(private stakeholderRestService: StakeholderRestService,
              private router: Router) {
    this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
    this.loadAnalysisIDFromRouter();
    this.loadStakeholder();

  }

  loadStakeholder(): void {
    this.stakeholderRestService.getStakeholdersByAnalysisId(this.analysisid).subscribe((result: any) => {
      this.stakeholders = [];
      console.log(result);
      result.forEach((stakeholderDTO: StakeholderDTO) => {
        let negativeImpacts = 0;
        let postiveImpacts = 0;
        stakeholderDTO.impactList.forEach((impact: StakeholderImpact) => {
          if (impact.value > 0) {
            postiveImpacts += impact.value;
          } else {
            negativeImpacts += Math.abs(impact.value);
          }
        });
        const stakeholder: Stakeholder = {
          id: stakeholderDTO.rootEntityID,
          guiId: stakeholderDTO.guiId,
          level: stakeholderDTO.stakeholderLevel,
          priority: stakeholderDTO.priority,
          name: stakeholderDTO.stakeholderName,
          positiveImpact: postiveImpacts,
          negativeImpact: negativeImpacts,
          analysisId: stakeholderDTO.analysisId

        };
        this.stakeholders.push(stakeholder);
      });
      this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
    });
  }


  createStakeholder(): void {
    const stakeholder = this.createDefaultStakeholder();
    this.stakeholders.push(stakeholder);
    this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
  }

  save(stakeholder: Stakeholder): void {
    console.log(this.analysisid);
    this.stakeholderRestService.createStakeholder({
      rootEntityID: '',
      guiId: '',
      stakeholderName: stakeholder.name,
      priority: stakeholder.priority,
      impactList: [],
      stakeholderLevel: stakeholder.level,
      analysisId: this.analysisid
    }).subscribe(() => {
      this.loadStakeholder();
    });
  }

  createDefaultStakeholder(): Stakeholder {
    const stakeholder = new Stakeholder();
    stakeholder.editable = true;
    stakeholder.priority = 1;
    stakeholder.level = 'NATURAL_PERSON';
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

  resetFilter(): void {
    this.matDataSource.filterPredicate = (data: Stakeholder, filter) => {
      return true;
    };
    this.matDataSource.filter = '';
  }

  filterImpact(value: any): void {
    this.resetFilter();
    this.matDataSource.filterPredicate = (data: Stakeholder, filter) => {
      const totalimpact = data.negativeImpact + data.positiveImpact;
      if (totalimpact === 0) {
        return true;
      }
      console.log((data.negativeImpact / totalimpact));
      return (data.negativeImpact / totalimpact) < value;
    };

    this.matDataSource.filter = value;
  }

  setSearchText(event: string): void {
    this.searchtext = event;
  }

  update(stakeholder: Stakeholder): void {
    this.stakeholderRestService.updateStakeholder({
      rootEntityID: stakeholder.id,
      guiId: stakeholder.guiId,
      stakeholderName: stakeholder.name,
      priority: stakeholder.priority,
      stakeholderLevel: stakeholder.level,
      analysisId: this.analysisid
    }).subscribe(() => {
      this.loadStakeholder();
    });
  }

  loadAnalysisIDFromRouter(): void{
    this.router.routerState.root.queryParams.subscribe((paramMap) => {
      this.analysisid = paramMap.id;
    });
  }
}

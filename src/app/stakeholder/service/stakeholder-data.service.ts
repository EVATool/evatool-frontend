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

  constructor(private stakeholderRestService: StakeholderRestService,
              private router: Router) {
    this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
    this.loadAnalysisIDFromRouter();
    this.loadStakeholder();

  }

  stakeholders: Stakeholder[] = [];
  matDataSource = new MatTableDataSource<Stakeholder>();
  public searchtext = '';
  private analysisid: string | null = '';


  stakeholderFilter: Stakeholder = {
    id: '',
    guiId: '',
    name: '',
    level: '',
    priority: 0,
    negativeImpact: 0,
    positiveImpact: 0,
    editable: false,
    created: false,
    analysisId: '',
  };

   static checkImpactFilter(data: Stakeholder, value: any): boolean{
    const totalimpact = data.negativeImpact + data.positiveImpact;
    if (totalimpact === 0) {
      return true;
    }
    return (data.negativeImpact / totalimpact) < value;
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
      this.matDataSource.filterPredicate = this.customFilterPredicate;
    });
  }


  createStakeholder(): void {
    const stakeholder = this.createDefaultStakeholder();
    this.stakeholders.push(stakeholder);
    this.matDataSource = new MatTableDataSource<Stakeholder>(this.stakeholders);
    this.matDataSource.filterPredicate = this.customFilterPredicate;
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

//////

  customFilterPredicate(data: Stakeholder, filters: string): boolean {
    const searchTerms = JSON.parse(filters);

    if (searchTerms.level !== '' && searchTerms.priority > 0) {
      return (data.priority === searchTerms.priority && data.level === searchTerms.level
        && StakeholderDataService.checkImpactFilter(data, searchTerms.negativeImpact));
    }else if (searchTerms.level !== '' && searchTerms.priority === 0) {
      return (data.level === searchTerms.level
        && StakeholderDataService.checkImpactFilter(data, searchTerms.negativeImpact));
    }else if (searchTerms.level === '' && searchTerms.priority > 0){
      return (data.priority === searchTerms.priority && StakeholderDataService.checkImpactFilter(data, searchTerms.negativeImpact));
    }else {
      return true;
    }

    /*
    const priorität

    if (searchTerms.level !== '')
    {

    }

    if(searchTerms.le)



    isStakeholder:Stakeholder ;
    if(data.level === searchTerms.level)
    {

    }
    */
  }

  filterSetFilter(): void {
    this.matDataSource.filter = JSON.stringify(this.stakeholderFilter);
  }

/////


  filterPrio(prio: number): void {
    this.stakeholderFilter.priority = prio;
    this.filterSetFilter();
  }

  filterLevel(level: string): void {
    this.stakeholderFilter.level = level;
    this.filterSetFilter();
  }

  resetFilter(): void {
    this.stakeholderFilter.level = '';
    this.stakeholderFilter.priority = 0;
    this.stakeholderFilter.negativeImpact = 0;
    this.filterSetFilter();
  }

  filterImpact(value: any): void {
    this.stakeholderFilter.negativeImpact = value;
    this.filterSetFilter();
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

  loadAnalysisIDFromRouter(): void {
    this.router.routerState.root.queryParams.subscribe((paramMap) => {
      this.analysisid = paramMap.id;
    });
  }
}

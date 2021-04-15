import {EventEmitter, Injectable, Output} from '@angular/core';
import {AnalysisRestService} from './analysis-rest.service';
import {Analysis} from '../../model/Analysis';
import {AnalysisDTO} from '../../model/AnalysisDTO';

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {

  constructor(private analysisRestService: AnalysisRestService) {
  }

  @Output() analysisSaved: EventEmitter<Analysis> = new EventEmitter<Analysis>();
  public analysisArray: Analysis[] = [];
  public templateAnalyses: Analysis[] = [];
  public analyses: Analysis[] = [];
  private currentAnalysis!: Analysis;

  static fromDto(analysisDTO: AnalysisDTO): Analysis {
    const analysis = new Analysis();

    analysis.rootEntityID = analysisDTO.rootEntityID;
    analysis.analysisName = analysisDTO.analysisName;
    analysis.analysisDescription = analysisDTO.analysisDescription;
    analysis.lastUpdate = analysisDTO.lastUpdate;
    analysis.image = analysisDTO.image;
    analysis.isTemplate = analysisDTO.isTemplate;
    analysis.uniqueString = analysisDTO.uniqueString;
    analysis.date = analysisDTO.date;

    return analysis;
  }

  static toDto(analysis: Analysis): AnalysisDTO {
    const analysisDTO = new AnalysisDTO();

    analysisDTO.rootEntityID = analysis.rootEntityID;
    analysisDTO.analysisName = analysis.analysisName;
    analysisDTO.analysisDescription = analysis.analysisDescription;
    analysisDTO.lastUpdate = analysis.lastUpdate;
    analysisDTO.image = analysis.image;
    analysisDTO.isTemplate = analysis.isTemplate;
    analysisDTO.uniqueString = analysis.uniqueString;
    analysisDTO.date = analysis.date;

    return analysisDTO;
  }

  save(analysis: Analysis): void {
    this.analysisRestService.createAnalysis({
        analysisName: analysis.analysisName,
        analysisDescription: analysis.analysisDescription,
        rootEntityID: analysis.rootEntityID,
        lastUpdate: null,
        isTemplate: analysis.isTemplate,
        image: analysis.image,
        uniqueString: '',
        date: ''

      }
    ).subscribe();
  }

  update(analysis: Analysis): void {
    this.analysisRestService.updateAnalysis({
      analysisName: analysis.analysisName,
      analysisDescription: analysis.analysisDescription,
      lastUpdate: analysis.lastUpdate,
      isTemplate: analysis.isTemplate,
      rootEntityID: analysis.rootEntityID,
      uniqueString: analysis.uniqueString,
      image: analysis.image,
      date: analysis.date
    }).subscribe(() => {
      this.loadAllAnalysis();
    });
  }

  loadAnalysis(id: string): void {
    this.analysisRestService.getAnalysisById(id).subscribe((analysisDto: AnalysisDTO) => {
      this.currentAnalysis = AnalysisDataService.fromDto(analysisDto);
    });
  }

  loadAllAnalysis(): void {
    this.analysisRestService.getAnalysis().subscribe((result: any) => {
      this.analysisArray = [];
      result.forEach((analysisDTO: AnalysisDTO) => {
        const analysis: Analysis = {
          rootEntityID: analysisDTO.rootEntityID,
          analysisDescription: analysisDTO.analysisDescription,
          analysisName: analysisDTO.analysisName,
          lastUpdate: '',
          image: analysisDTO.image,
          editImage: false,
          isTemplate: analysisDTO.isTemplate,
          uniqueString: analysisDTO.uniqueString,
          TitleIsEditable: false,
          DescriptionIsEditable: false,
          date: analysisDTO.date
        };
        this.analysisArray.push(analysis);
      });

      this.templateAnalyses = this.analysisArray.filter(ana => ana.isTemplate);
      this.analyses = this.analysisArray.filter(ana => !ana.isTemplate);
    });
  }

  getCurrentAnalysis(): Analysis {
    return this.currentAnalysis;
  }
}

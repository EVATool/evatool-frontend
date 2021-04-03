import {LogService} from '../../../shared/services/log.service';
import {RestSettings} from '../../settings/RestSettings';
import {Observable} from 'rxjs';
import {AnalysisDto} from '../../dtos/AnalysisDto';
import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AnalysisRestService {
  @Output() urlIdExtracted: EventEmitter<string> = new EventEmitter();

  constructor(
    private logger: LogService,
    private http: HttpClient,
    private router: Router) {

  }

  onInit(): void {
    this.router.routerState.root.queryParams.subscribe(params => {
      // TODO Error handling.
      this.logger.info(this, 'Extracted analysisId from Router: ' + params.id)
      this.urlIdExtracted.emit(params.id);
    });
  }

  getAnalysisById(id: string): Observable<AnalysisDto> {
    this.logger.info(this, 'Get Analysis by Id');
    return this.http.get<AnalysisDto>(RestSettings.analysesUrl + "/" + id);
  }
}

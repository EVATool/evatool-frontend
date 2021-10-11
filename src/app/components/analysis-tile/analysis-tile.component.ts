import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Analysis} from '../../model/Analysis';
import {AnalysisDialogComponent} from '../analysis-dialog/analysis-dialog.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {ROUTES} from '../../app-routes';
import {MatDialog} from '@angular/material/dialog';
import {LogService} from '../../services/log.service';
import {Router} from '@angular/router';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AnalysisDeletionFailedEvent} from '../../services/event/events/DeletionFailedEvents';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-analysis-tile',
  templateUrl: './analysis-tile.component.html',
  styleUrls: ['./analysis-tile.component.scss']
})
export class AnalysisTileComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @Input() analysis!: Analysis;
  @Input() inSelectionMode!: boolean;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private dialog: MatDialog,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.crossUI.analysisDeletionFailed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: AnalysisDeletionFailedEvent) => {
        event.entity.deletionFlagged = false;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openAnalysisDialog(analysis: Analysis): void {
    this.dialog.open(AnalysisDialogComponent, {
      height: '40%',
      width: '40%',
      data: {analysis}
    });
  }

  deleteAnalysis(analysis: Analysis): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.translate.get('ANALYSIS_TILE.DELETE_ANALYSIS_CONFIRMATION', {value: 'world'}).subscribe((res: string) => {
      dialogRef.componentInstance.confirmMessage = res;
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(dialogResult => {
        if (dialogResult) {
          analysis.deletionFlagged = true;
          this.analysisData.deleteAnalysis(analysis);
        }
      });
  }

  clickAnalysisTile(analysis: Analysis, event: MouseEvent): void {
    if (this.inSelectionMode) {
      this.analysis.selected = !this.analysis.selected;
    } else { // Open analysis.
      const commands = this.getAnalysisCommands(analysis);
      if (event.ctrlKey) {
        this.openAnalysisInNewTab(commands);
      } else {
        this.router.navigate(commands);
      }
    }
  }

  auxClickAnalysisTile(analysis: Analysis, event: MouseEvent): void {
    if (event.button === 1) { // Middle Mouse Button.
      const commands = this.getAnalysisCommands(analysis);
      this.openAnalysisInNewTab(commands);
    }
  }

  openAnalysisInNewTab(commands: string[]): void {
    const url = this.router.serializeUrl(this.router.createUrlTree(commands));
    console.log(url);
    window.open(url, '_blank');
  }

  getAnalysisCommands(analysis: Analysis): string[] {
    return [ROUTES.analysis, analysis.id];
  }
}

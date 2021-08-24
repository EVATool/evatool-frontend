import {Component, HostListener, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {AnalysisDataService} from '../../services/data/analysis-data.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Analysis} from '../../model/Analysis';
import {AnalysisDialogComponent} from '../analysis-dialog/analysis-dialog.component';
import {CrossUiEventService} from '../../services/cross-ui-event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  analyses: Analysis[] = [];
  analysisNameFilter = '';
  showAnalyses = true;
  showTemplates = true;
  sortByIsTemplateAsc = true;
  sortByLastEditedAsc = true;
  inSelectionMode = false;

  constructor(private logger: LogService,
              public analysisData: AnalysisDataService,
              private crossUI: CrossUiEventService,
              private router: Router,
              private dialog: MatDialog,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.analysisData.loadedAnalyses.subscribe(() => {
      this.updateData(this.analysisData.analyses);
    });

    this.analysisData.createdAnalysis.subscribe(() => {
      this.updateData(this.analysisData.analyses);
    });

    this.analysisData.deletedAnalysis.subscribe(() => {
      this.updateData(this.analysisData.analyses);
    });

    this.analysisData.exportedAnalysis.subscribe((exportAnalyses: object) => {
      // TODO the json is prettified on the server, but its all one line in the file.
      //  This is work-around in the next line, but should not be necessary, because it is already done on the backend (angular object loses that information).
      //  Also, the download should work without manually saving the object. Accessing the backend url via the browser directly instantly causes download to start (should also be like this here).
      //  Now, all of a sudden the file is being downloaded two times  (services get injected multiple times? Or are called multiple times from multiple UI components?).
      const blob = new Blob([JSON.stringify(exportAnalyses, null, 4)]);
      saveAs(blob, 'Analysis-Export.json');
      this.inSelectionMode = false;
    });

    this.crossUI.initComplete.subscribe(() => {
      this.analysisData.loadAnalyses();
    });

    if (this.crossUI.initialized) {
      this.analysisData.loadAnalyses();
    }
  }

  updateData(analyses: Analysis[]): void {
    this.analyses = analyses.sort(this.sortByIsTemplate());
  }

  sortByIsTemplate(): (a: Analysis, b: Analysis) => number {
    const reverseByIsTemplate = this.sortByIsTemplateAsc ? 1 : -1;
    const reverseByLastUpdated = this.sortByLastEditedAsc ? 1 : -1;

    return (a: Analysis, b: Analysis): number => {
      if (a.isTemplate === b.isTemplate) {
        if (a.lastUpdated === b.lastUpdated) {
          return 0;
        } else if (a.lastUpdated < b.lastUpdated) {
          return 1 * reverseByLastUpdated;
        } else {
          return -1 * reverseByLastUpdated;
        }
      } else if (a.isTemplate && !b.isTemplate) {
        return 1 * reverseByIsTemplate;
      } else {
        return -1 * reverseByIsTemplate;
      }
    };
  }

  sortByLastUpdated(a: Analysis, b: Analysis): number {
    if (a.lastUpdated === b.lastUpdated) {
      return 0;
    } else if (a.lastUpdated < b.lastUpdated) {
      return 1;
    } else {
      return -1;
    }
  }

  openAnalysisDialog(analysis: Analysis): void {
    this.dialog.open(AnalysisDialogComponent, {
      height: '40%',
      width: '40%',
      data: {analysis}
    });
  }

  openImportDialog(target: any): void {
    const files = target.files;
    document.getElementById('select-file')?.click();
    if (files?.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const importString = reader.result as string;
        console.log(importString);
        this.importAnalyses(importString);
      };
      reader.readAsText(files[0]);
    }
  }

  importAnalyses(importString: string): void {
    this.analysisData.importAnalyses(importString);
  }

  exportAnalyses(): void {
    if (this.inSelectionMode) {
      this.commitExport();
    } else {
      for (const analysis of this.analysisData.analyses) {
        analysis.selected = false;
      }

      this.inSelectionMode = !this.inSelectionMode;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    this.abortExport();
  }

  abortExport(): void {
    this.inSelectionMode = false;
  }

  commitExport(): void {
    const exportAnalyses = [];
    for (const analysis of this.analysisData.analyses) {
      if (analysis.selected) {
        exportAnalyses.push(analysis);
      }
    }

    if (exportAnalyses.length === 0) {
      this.snackbar.open('At least one analysis must be selected.', '', {duration: 5000});
      return;
    }

    this.analysisData.exportAnalyses(exportAnalyses.map(a => a.id), 'Analysis-Export');
  }
}

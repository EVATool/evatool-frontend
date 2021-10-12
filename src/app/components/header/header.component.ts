import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {LogService} from '../../services/log.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';
import {HighlightSearchComponent} from '../highlight-search/highlight-search.component';
import {TranslateService} from '@ngx-translate/core';
import {ROUTES} from '../../app-routes';
import {Router} from '@angular/router';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild(HighlightSearchComponent) highlightSearchComponent!: HighlightSearchComponent;

  showHighlightSearch = false;

  constructor(public authService: AuthService,
              private logger: LogService,
              public crossUI: CrossUiEventService,
              private translate: TranslateService,
              private router: Router,
              public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.crossUI.userNavigatedToAnalysis.subscribe(() => {
      this.showHighlightSearch = true;
      this.highlightSearchComponent?.clearFilter();
    });

    this.crossUI.userLeftCurrentAnalysisEdit.subscribe(() => {
      this.showHighlightSearch = false;
      this.highlightSearchComponent?.clearFilter();
    });
  }

  highlightTextChange(event: string): void {
    this.logger.debug(this, 'Highlight Text Changed');
    this.crossUI.highlightTextChanged.emit(event);
  }

  navigateToSettings(): void {
    this.router.navigate([ROUTES.settings]);
  }
}

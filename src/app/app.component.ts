import {Component} from '@angular/core';
import {MasterService} from './services/master.service';
import {LogService} from './services/log.service';
import {LanguageService} from './services/language.service';
import {outletTabAnimation} from './animations/OutletTabAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private master: MasterService,
              private languageService: LanguageService,
              private logger: LogService) {
    // Language service init.
    this.languageService.init();

    // Master service init.
    this.master.init();
  }
}

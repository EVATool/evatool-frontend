import {Component} from '@angular/core';
import {MasterService} from './services/master.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'evatool-frontend';

  constructor(private master: MasterService,
              public translate: TranslateService) {
    this.master.init();

    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    const defaultLang = 'en'; // TODO env var
    const useDefaultOverBrowserLang = false; // TODO env var

    if (useDefaultOverBrowserLang) {
      translate.use(defaultLang);
    } else {
      translate.use(browserLang);
    }
  }
}

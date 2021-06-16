import {Component} from '@angular/core';
import {MasterService} from './services/master.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';

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
    const defaultLang = environment.defaultLang;
    const useDefaultOverBrowserLang = environment.useDefaultOverBrowserLang;

    if (useDefaultOverBrowserLang === 'true') {
      translate.use(defaultLang);
    } else {
      translate.use(browserLang);
    }
  }
}

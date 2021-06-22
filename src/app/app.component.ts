import {Component} from '@angular/core';
import {MasterService} from './services/master.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {Title} from '@angular/platform-browser';
import enLanguage from './../assets/i18n/en.json';
import deLanguage from './../assets/i18n/de.json';
import {LogService} from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private titleService: Title,
              private master: MasterService,
              public translate: TranslateService,
              private logger: LogService) {
    // Language settings.
    translate.setTranslation('en', enLanguage);
    translate.addLangs(['en', 'de']);

    const browserLang = translate.getBrowserLang();
    const defaultLang = environment.defaultLang;
    const useDefaultOverBrowserLang = environment.useDefaultOverBrowserLang;

    if (useDefaultOverBrowserLang === 'true') {
      translate.setTranslation(defaultLang, this.getLangJson(defaultLang));
      translate.setDefaultLang(defaultLang);
    } else {
      translate.setTranslation(browserLang, this.getLangJson(browserLang));
      translate.setDefaultLang(browserLang);
    }

    this.translate.get('TITLE').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });

    // Master service init.
    this.master.init();
  }

  private getLangJson(lang: string): any {
    if (lang === 'en') {
      return enLanguage;
    } else if (lang === 'de') {
      return deLanguage;
    } else {
      this.logger.error(this, 'Language "' + lang + '" not supported. Using en language.');
      return enLanguage;
    }
  }
}

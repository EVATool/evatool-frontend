import {Injectable} from '@angular/core';
import enLanguage from '../../assets/i18n/en.json';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import deLanguage from '../../assets/i18n/de.json';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly USER_LANGUAGE_LOCAL_STORAGE_KEY = 'user_setting_preferred_language';

  public languages = ['en', 'de'];

  constructor(public translate: TranslateService,
              private titleService: Title,
              private logger: LogService) {
  }

  init(): void {
    // Language settings.
    this.translate.setTranslation('en', enLanguage);
    this.translate.addLangs(this.languages);

    const browserLang = this.translate.getBrowserLang();
    const defaultLang = environment.defaultLang;
    const useDefaultOverBrowserLang = environment.useDefaultOverBrowserLang;

    const preferredLanguage = localStorage.getItem(this.USER_LANGUAGE_LOCAL_STORAGE_KEY);
    if (preferredLanguage) {
      this.changeLanguage(preferredLanguage);
    } else if (useDefaultOverBrowserLang) {
      this.changeLanguage(defaultLang);
    } else {
      this.changeLanguage(browserLang);
    }

    this.titleService.setTitle('EvaTool');
    this.translate.get('TITLE').subscribe((title: string) => {
      this.titleService.setTitle(title);
    });
  }

  private getLangJson(lang: string): any {
    if (lang === 'en') {
      return enLanguage;
    } else if (lang === 'de') {
      return deLanguage;
    } else {
      this.logger.error(this, 'Language "' + lang + '" not supported. Using en language as default');
      return enLanguage;
    }
  }

  public getLanguageName(lang: string): string {
    switch (lang) {

      case 'de':
        return 'Deutsch';

      case 'en':
        return 'English';

      default:
        this.logger.error(this, 'Unknown language: ' + lang);
        return '';
    }
  }

  public changeLanguage(lang: string, persistToLocalStorage?: boolean): void {
    this.translate.setTranslation(lang, this.getLangJson(lang));
    this.translate.setDefaultLang(lang);
    if (persistToLocalStorage) {
      localStorage.setItem(this.USER_LANGUAGE_LOCAL_STORAGE_KEY, lang);
    }
    this.logger.info(this, 'Changed language to ' + lang);
  }
}

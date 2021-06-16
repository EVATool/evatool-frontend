import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {SpecService} from './services/spec.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: SpecService.imports.concat([
        RouterTestingModule
      ]),
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'evatool-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('evatool-frontend');
  });

  // https://stackblitz.com/github/ngx-translate/example?file=src%2Fapp%2Fapp.component.spec.ts
  // it('should load translations', async(() => {
  //   spyOn(translate, 'getBrowserLang').and.returnValue('en');
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const compiled = fixture.debugElement.nativeElement;
  //
  //   // the DOM should be empty for now since the translations haven't been rendered yet
  //   expect(compiled.querySelector('h2').textContent).toEqual('');
  //
  //   http.expectOne('/assets/i18n/en.json').flush(TRANSLATIONS_EN);
  //   http.expectNone('/assets/i18n/fr.json');
  //
  //   // Finally, assert that there are no outstanding requests.
  //   http.verify();
  //
  //   fixture.detectChanges();
  //   // the content should be translated to english now
  //   expect(compiled.querySelector('h2').textContent).toEqual(TRANSLATIONS_EN.HOME.TITLE);
  //
  //   translate.use('fr');
  //   http.expectOne('/assets/i18n/fr.json').flush(TRANSLATIONS_FR);
  //
  //   // Finally, assert that there are no outstanding requests.
  //   http.verify();
  //
  //   // the content has not changed yet
  //   expect(compiled.querySelector('h2').textContent).toEqual(TRANSLATIONS_EN.HOME.TITLE);
  //
  //   fixture.detectChanges();
  //   // the content should be translated to french now
  //   expect(compiled.querySelector('h2').textContent).toEqual(TRANSLATIONS_FR.HOME.TITLE);
  // }));
});

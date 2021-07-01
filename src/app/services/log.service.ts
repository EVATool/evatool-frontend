import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

/*
Features:

Create template realm for new tenant (how to easily import multiple times?)

Disable keycloak in backend settings! (IMPOSSIBLE)
Use env vars for auth in backend and frontend
Production (env vars and docker) [single tenant mode (auth but only one realm -> no tenant option in login screen)]
- Ignore existing realm json docker (https://stackoverflow.com/questions/61184888/how-to-import-multiple-realm-in-keycloak)


Add flyway [only setup, do not migrate from this point onward!] (special migrate test profile in backend?)

Tasks aus Jira (UID)

Backlog:
git fetch causes permission error in deploy GitHub Actions
Localization (Use values from jsons everywhere, translate them, change lang in frontend [localStorage] and overwrite the useDefaultOverBrowserLang option) [languageService, saves all available languages for selection, use it in selection and AppComponent]
Catch 404 in login form when realm does not exist (why does 404 not appear in frontend but in postman?)
Make UI work in firefix/Chrome
Only purge data script (ONLY database with main data, DELETE FROM ANALYSIS)
Better 404 page (information about what might have been misinputted)
Filtering: And/Or, what is the default filtering? (how does this apply to deltas?)
All Tables: How to deal with filter when adding new row? Remove filter? Display message if new row is hidden by filter? scroll to new row? Flash new row?
Rework impact slider (arrow keys supported) and filtering (drag middle bar and change borders) and appear on tab, focus in requirement table, mat-slider has an ABSOLUTE min width...
Sample Data (API calls to backend, separate from deployment!) -> [Create export Postman(??) script from UI inserted stuff] Postman script should not be used, use own json format for backend rest calls (import + export)
Cashe login credentials locally (at least refresh token) and load when page is refreshed
Single user: reload data when tab changes? (how to update references?)
Multi user: concurrency... (PWA?)
Angular e2e tests
rework material forms (validation)
Log to file (frontend and backend container)
Determine convention for html tag order and enforce (e.g. matInput, [input], (output), ([bind]))
control click (or middle click) on analysis tile -> new tab
redirect to unknown error page if http status code is 0 in error case?
Huge styling refactor (Zooming, mobile, resizing)
make Sonarcloud Github Action work even if tests fail (front [] and backend [-Dmaven.test.failure.ignore=true])
SonarCloud Status not shown in backend

Bugs:
Visuals of ValueModal changes when there is no entry in impact table. Mat form required to load??
Strange bug when negative impact was only slidable like a positive in requirements table
Strange bug where requirement table contained requirements with same prefixSequenceId. How can this happen? Was that the fault of the updateFromDto method?
BUGGED: dialog analysis opens analysis when checkbox is not selected

*/

export enum LogLevel {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public static readonly logLevel: LogLevel = environment.production ? LogLevel.Error : LogLevel.Info;

  public shouldLog(logLevel: LogLevel): boolean {
    return LogService.logLevel <= logLevel;
  }

  public getClassName(object: any): string {
    return object.constructor.name;
  }

  public getLogLevel(logLevel: LogLevel): string {
    return LogLevel[logLevel].toString().toUpperCase();
  }

  public formatMessage(sender: string, msg: string, logLevel: LogLevel): string {
    return '[' + this.getLogLevel(logLevel) + '] ' + this.getClassName(sender) + ': ' + msg;
  }

  trace(sender: any, msg: string): void {
    const logLevel = LogLevel.Trace;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  debug(sender: any, msg: string): void {
    const logLevel = LogLevel.Debug;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  info(sender: any, msg: string): void {
    const logLevel = LogLevel.Info;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  warn(sender: any, msg: string): void {
    const logLevel = LogLevel.Warn;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  error(sender: any, msg: string): void {
    const logLevel = LogLevel.Error;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  fatal(sender: any, msg: string): void {
    const logLevel = LogLevel.Fatal;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }
}

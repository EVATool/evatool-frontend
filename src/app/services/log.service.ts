import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

/*
TODO:
Delete requirement button in req table is in the middle??
Tasks aus Jira (UID) [remove duplicates, ]

better documentation in repos for how to start aux docker containers
add mock-prod profile to front and backend (partial docker compose that starts all containers except backend and frontend)
Documentation of docker-compose env vars
More extensive useage of env vars (default realm, container names, etc...)
git fetch causes permission error in deploy GitHub Actions
Standalone flag for public version? Uses can register and have their own realm?
Redirect to home from login component when auth is disabled?
docker: rework networks (add auth network?) networks only required for inter-container communication
Only purge data script (ONLY database with main data, DELETE FROM ANALYSIS)
All Tables: How to deal with filter when adding new row? Remove filter? Display message if new row is hidden by filter? scroll to new row? Flash new row?
How to deal with http status code 0? Ignore it? and hide the snackbar when the status is 0 (only in prod)?
Sample Data (API calls to backend, separate from deployment!) -> [Create export Postman(??) script from UI inserted stuff] Postman script should not be used, use own json format for backend rest calls (import + export)
Filtering: And/Or, what is the default filtering? (how does this apply to deltas?)

BACKLOG:
Localization (Use values from jsons everywhere, translate them, change lang in frontend [localStorage] and overwrite the useDefaultOverBrowserLang option) [languageService, saves all available languages for selection, use it in selection and AppComponent]
Catch 404 in login form when realm does not exist (why does 404 not appear in frontend but in postman?)
Make UI work in firefix/Chrome
keycloak is not configured properly yet (loging redirecting not working, /h2-console and /swagger are not reachable)
keycloak docker container can auth from frontend, but access from backend to keycloak container always causes 401 in prod
keycloak login on non-existent realm causes CORS error, only in prod?) [snackBar at bottom, status 0]
keycloak How to make default realm export file reuseable to create a new standard realm (or even n realms) with a set name
keycloak Test changing users of default realm and restarting docker-compose. Does re-import overwrite changes?
Better 404 page (information about what might have been misinputted)
Log to file (frontend and backend container)
Rework impact slider (arrow keys supported) and filtering (drag middle bar and change borders) and appear on tab, focus in requirement table, mat-slider has an ABSOLUTE min width...
Cashe login credentials locally (at least refresh token) and load when page is refreshed

BUGS:
Visuals of ValueModal changes when there is no entry in impact table. Mat form required to load??
Strange bug when negative impact was only slidable like a positive in requirements table
Strange bug where requirement table contained requirements with same prefixSequenceId. How can this happen? Was that the fault of the updateFromDto method?
BUGGED: dialog analysis opens analysis when checkbox is not selected

MISC:
Single user: reload data when tab changes? (how to update references?)
Multi user: concurrency... (PWA?)
Angular e2e tests
Huge styling refactor (Zooming, mobile, resizing)
SonarCloud Status not shown in backend
make Sonarcloud Github Action work even if tests fail (front [] and backend [-Dmaven.test.failure.ignore=true])
control click (or middle click) on analysis tile -> new tab
Determine convention for html tag order and enforce (e.g. matInput, [input], (output), ([bind]))
rework material forms (validation)
docker container of mysql takes very long to start, this backend container fails (docker desktop on windows) [workaournd: wait 5 minutes for mysql database, then restart backend] (use postgres instead of mysql??)

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

import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

/*
Features:

How to archive? What happens? Difference between values and variants? -> (allow, highlight)
How should be deleted? -> (warn when references, forbid)

Unify EVERYTHING (Functions, style, no local shit, scrollbar, move modal height/width to scss of modal) [split into tooltip/table/etc-theme?]
HUGE refactor: Rename + folder structure
Localization (figure out angular localization, error codes in backend, change lang in frontend [localStorage]) https://stackblitz.com/github/ngx-translate/example?file=src%2Fapp%2Fapp.component.ts



Tasks aus Jira (UID) -> das Jira public machen?

Update values that come from backend in local object, e.g. Stakeholder PrefixId in frontend should update directly
Highlight (mark-textarea) TODO text not instantly highlighted when typing (and wrongly updated) solution: manually set selection?, placeholder disappears when typing not already when focussing, placeholder color
Category filter: select all, none, invert options
Analysis TODO Complete rework, Analysis-Tile component, template like normal analysis, filter/search analyses
Meaningful errors (e.g. when trying to add impact but there is no value or no stakeholder) - HTTP Interceptor (Datenbanki xD) (PWA?)
Filtering: And/Or, what is the default filtering? (how does this apply to deltas)

MISC:
Add keycloak (enable/disable with flag in .env docker-compose)
Add flyway (special migrate test profile in backend)
Deep copy: copy everything?

Backlog:
Visuals of ValueModal changes when there is no entry in impact table. Mat form required to load??
The default sorting method caused IMP1, IMP3, IMP2 once. Does this happend again?
Strange bug when negative impact was only slidable like a positive in requirements table
How to deal with impacts going horizontal in requirement table
merit Color backend lookup table for possible values
Sample Data (API calls to backend, separate from deployment!) -> [Create export Postman script from UI inserted stuff]
  -> ExportController
  -> how to deal with keycloak auth?
Only purge data script (ONLY database with main data, what about flyway?)
Single user: reload data (how to update references?)
BUG: horizontal lines between rows randomly went missing (impact and req table, but not in stakeholder table???)
Multi user: concurrency...
SonarCloud Status not shown in backend
make Sonarcloud Github Action work even if tests fail (front [] and backend [-Dmaven.test.failure.ignore=true])
Angular e2e tests
Rework impact slider (arrow keys supported) and filtering (drag middle bar and change borders) and appear on tab, focus in requirement table

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

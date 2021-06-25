import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

/*
Features:

Tasks aus Jira (UID) -> das Jira public machen?

Highlight (mark-textarea) TODO text not instantly highlighted when typing (and wrongly updated) solution: manually set selection?, placeholder disappears when typing not already when focussing, placeholder color
Category filter: select all, none, invert options
Deep copy: copy everything?
Add keycloak [wait for https] (enable/disable with flag in .env docker-compose AND enable/disable in special backend/frontend env for easy testing/developing)
Add flyway [only setup, do not migrate from this point onward!] (special migrate test profile in backend?)

Backlog:
Visuals of ValueModal changes when there is no entry in impact table. Mat form required to load??
Strange bug when negative impact was only slidable like a positive in requirements table
Strange bug where requirement table contained requirements with same prefixSequenceId. How can this happen? Was that the fault of the updateFromDto method?
How to deal with impacts going horizontal in requirement table
merit Color backend lookup table for possible values
Sample Data (API calls to backend, separate from deployment!) -> [Create export Postman(??) script from UI inserted stuff] Postman script should not be used, use own json format for backend rest calls (import + export)
  -> ExportController
  -> how to deal with keycloak auth?
Only purge data script (ONLY database with main data, what about flyway?)
Single user: reload data when tab changes? (how to update references?)
Multi user: concurrency... (PWA?)
SonarCloud Status not shown in backend
make Sonarcloud Github Action work even if tests fail (front [] and backend [-Dmaven.test.failure.ignore=true])
Angular e2e tests
Better 404 page (information about what might have been misinputted)
Rework impact slider (arrow keys supported) and filtering (drag middle bar and change borders) and appear on tab, focus in requirement table, mat-slider has an ABSOLUTE min width...
BUGGED: dialog analysis opens analysis when checkbox is not selected
Localization (Use values from jsons everywhere, translate them, change lang in frontend [localStorage] and overwrite the useDefaultOverBrowserLang option) [languageService, saves all available languages for selection, use it in selection and AppComponent]
Impact slider in delta is completely bugged
All Tables: How to deal with filter when adding new row? Remove filter? Display message if new row is hidden by filter? scroll to new row? Flash new row?
Filtering: And/Or, what is the default filtering? (how does this apply to deltas?)
Determine convention for html tag order and enforce (e.g. matInput, [input], (output), ([bind]))

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

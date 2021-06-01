import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

/*
Features:
Sample Data (API calls to backend, separate from deployment!)
Only purge data script (data and flyway, NOT keycloak!)
Only filter selected/active impacts/deltas
Highlight (mark-textarea) TODO text not instantly highlighted when typing (and wrongly updated) solution: manually set selection?, placeholder disappears when typing not already when focussing, placeholder color
Visuals of ValueModal changes when there is no entry in impact table. Mat form required to load??
Category filter: select all, none, invert options
Analysis TODO Complete rework, Analysis-Tile component, template like normal analysis, filter/search analyses
Table row mousehover/focus highlight
Meaningful errors (e.g. when trying to add impact but there is no value or no stakeholder)
RequirementDelta color, minValue, maxValue in DTO (?)
RequirementDelta in Requirements table (slider should appear on tab)
Use Impact slider also for stakeholder.impacted (column and filter)? Current filter makes no sense

HTTP Interceptor (Datenbanki xD) (PWA?)

Rework impact slider (arrow keys supported) and filtering (drag middle bar and change borders)

How to archive? What happens? Difference between values and variants?
How should be cascaded??
Filtering: And/Or, what is the default filtering?

Localization (figure out angular localization, error codes in backend, put language in docker [environment variable])
Use username and passwords in docker-compose from github secrets (set env vars in docker-compose command)

Single user: reload data (how to update references?)
Multi user: concurrency...
Deep copy: copy everything?

Code Quality:
Coverage auf ~100%, nicht nur positive tests und die Fehlerbehandlung testen
Angular e2e tests
make Sonarcloud Github Action work even if tests fail (front [] and backend [-Dmaven.test.failure.ignore=true])
Unify EVERYTHING (Functions, style, no local shit, scrollbar, move modal height/width to scss of modal) [styles folder with exports, and then import required stuff (?)]
HUGE refactor: Rename + folder structure
SonarCloud Status not shown in backend

MISC:
Update dependencies in docker compose every 3/4/6 months?
Add simple keycloak
Add Flyway (special migrate test profile in backend)
Dark Mode

Backlog:
The default sorting method caused IMP1, IMP3, IMP2 once. Does this happend again?
Strange bug when negative impact was only slidable like a positive in requirements table
How to deal with impacts going horizontal in requirement table

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

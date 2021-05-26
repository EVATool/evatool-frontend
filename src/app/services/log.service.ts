import {Injectable} from '@angular/core';

/*
TODO List

Log Level in prod settings at least warn
Highlight (mark-textarea) TODO text not instantly highlighted when typing (and wrongly updated) solution: manually set selection?, placeholder disappears when typing not already when focussing, placeholder color
Analysis TODO Complete rework, Analysis-Tile component, template like normal analysis, filter/search analyses
Visuals of ValueModal changes when there is no entry in impact table. Mat form required to load??
Use default sorting (prefixId) in all data services...
Variant modal: textarea alignment, option button vertical alignment (bugs also true for value dialog?), textboxes sometimes let scrollbar appear
New Stakeholder filter components (priority: toggle every priority separately)
-> Use Impact slider also for stakeholder.impacted (column and filter)?
Category filter: select all, none, invert options
sort arrows rendered ugly!
Meaningful errors (e.g. when trying to add impact but there is no value or no stakeholder)
How to deal with impacts going horizontal in requirement table
Table row mousehover/focus highlight
RequirementDelta color, minValue, maxValue in DTO (?)
RequirementDelta in Requirements table (slider should appear on tab)
make Sonarcloud work even if tests fail (front and backend)

Unify EVERYTHING (Functions, style, no local shit, scrollbar, move modal height/width to scss of modal) [styles folder with exports, and then import required stuff (?)]
HTTP Interceptor (Datenbanki xD) (PWA?)

HUGE refactor: Rename + folder structure

Rework impact slider (arrow keys supported) and filtering (drag middle bar and change borders)

How to archive? What happens? Difference between values and variants?
How should be cascaded??
Filtering: And/Or, what is the default filtering?

Localization (figure out angular localization, error codes in backend, put language in docker [environment variable])
Use username and passwords in docker-compose from github secrets (set env vars in docker-compose command)

Single user: reload data (how to update references?)
Multi user: concurrency...
Deep copy: copy everything?

Dark Mode



Infrastructure:
Deploy to UID server in both main deploy GitHub Actions
Deploy to dockerhub on dev (do not test, let failures pass!)

Add simple keycloak
Frontend and Backend should have envs: test, dev, prod?
Add Flyway
SonarCloud Status not shown in backend

Update dependencies in docker compose every 3/4/6 months?
Coverage auf ~100%, nicht nur positive tests und die Fehlerbehandlung testen (frontend e2e and unit tests)

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

  public static readonly logLevel: LogLevel = LogLevel.Info;

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

  trace(sender: any, msg: any) {
    const logLevel = LogLevel.Trace;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  debug(sender: any, msg: any) {
    const logLevel = LogLevel.Debug;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  info(sender: any, msg: any) {
    const logLevel = LogLevel.Info;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  warn(sender: any, msg: any) {
    const logLevel = LogLevel.Warn;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  error(sender: any, msg: any) {
    const logLevel = LogLevel.Error;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  fatal(sender: any, msg: any) {
    const logLevel = LogLevel.Fatal;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }
}

import { Injectable } from '@angular/core';

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

  public static shouldLog(logLevel: LogLevel): boolean {
    return LogService.logLevel <= logLevel;
  }

  trace(msg: any) {
    if (LogService.shouldLog(LogLevel.Trace)) {
      console.log(msg);
    }
  }

  debug(msg: any) {
    if (LogService.shouldLog(LogLevel.Debug)) {
      console.log(msg);
    }
  }

  info(msg: any) {
    if (LogService.shouldLog(LogLevel.Info)) {
      console.log(msg);
    }
  }

  warn(msg: any) {
    if (LogService.shouldLog(LogLevel.Warn)) {
      console.log(msg);
    }
  }

  error(msg: any) {
    if (LogService.shouldLog(LogLevel.Error)) {
      console.log(msg);
    }
  }

  fatal(msg: any) {
    if (LogService.shouldLog(LogLevel.Fatal)) {
      console.log(msg);
    }
  }
}

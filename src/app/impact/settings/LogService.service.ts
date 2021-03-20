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
export class LogServiceService {

  public static readonly logLevel: LogLevel = LogLevel.Info;

  trace(msg: any) {
    if (LogServiceService.logLevel <= LogLevel.Trace) {
      console.log(msg);
    }
  }

  debug(msg: any) {
    if (LogServiceService.logLevel <= LogLevel.Debug) {
      console.log(msg);
    }
  }

  info(msg: any) {
    if (LogServiceService.logLevel <= LogLevel.Info) {
      console.log(msg);
    }
  }

  warn(msg: any) {
    if (LogServiceService.logLevel <= LogLevel.Warn) {
      console.log(msg);
    }
  }

  error(msg: any) {
    if (LogServiceService.logLevel <= LogLevel.Error) {
      console.log(msg);
    }
  }

  fatal(msg: any) {
    if (LogServiceService.logLevel <= LogLevel.Fatal) {
      console.log(msg);
    }
  }
}

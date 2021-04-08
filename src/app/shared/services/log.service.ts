import {Injectable} from '@angular/core';

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
  // TODO add level to print
  public static readonly logLevel: LogLevel = LogLevel.Info;

  public static shouldLog(logLevel: LogLevel): boolean {
    return LogService.logLevel <= logLevel;
  }

  public static getClassName(object: any): string {
    return object.constructor.name;
  }

  public static formatMessage(prefix: string, msg: string): string {
    return prefix + ": " + msg;
  }

  trace(sender: any, msg: any) {
    if (LogService.shouldLog(LogLevel.Trace)) {
      console.log(LogService.formatMessage(LogService.getClassName(sender), msg));
    }
  }

  debug(sender: any, msg: any) {
    if (LogService.shouldLog(LogLevel.Debug)) {
      console.log(LogService.formatMessage(LogService.getClassName(sender), msg));
    }
  }

  info(sender: any, msg: any) {
    if (LogService.shouldLog(LogLevel.Info)) {
      console.log(LogService.formatMessage(LogService.getClassName(sender), msg));
    }
  }

  warn(sender: any, msg: any) {
    if (LogService.shouldLog(LogLevel.Warn)) {
      console.log(LogService.formatMessage(LogService.getClassName(sender), msg));
    }
  }

  error(sender: any, msg: any) {
    if (LogService.shouldLog(LogLevel.Error)) {
      console.log(LogService.formatMessage(LogService.getClassName(sender), msg));
    }
  }

  fatal(sender: any, msg: any) {
    if (LogService.shouldLog(LogLevel.Fatal)) {
      console.log(LogService.formatMessage(LogService.getClassName(sender), msg));
    }
  }
}

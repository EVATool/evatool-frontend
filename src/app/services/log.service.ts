import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {DatePipe} from '@angular/common';

export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5,
  OFF = 6
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public static readonly logLevel: LogLevel = (LogLevel as any)[environment.logLevel];

  datePipe = new DatePipe('en-US');

  public shouldLog(logLevel: LogLevel): boolean {
    return LogService.logLevel <= logLevel;
  }

  public getCurrentTime(): string {
    return this.datePipe.transform(new Date(), 'HH:mm:ss') || 'TIME FORMATTING ERROR';
  }

  public getClassName(object: any): string {
    return object.constructor.name;
  }

  public getLogLevel(logLevel: LogLevel): string {
    return LogLevel[logLevel].toString().toUpperCase();
  }

  public formatMessage(sender: string, msg: string, logLevel: LogLevel): string {
    return this.getCurrentTime() +
      ' ' + this.getLogLevel(logLevel).padStart(5, ' ') +
      ' [' + this.getClassName(sender).padEnd(30, ' ') + ']' +
      ': ' + msg;
  }

  trace(sender: any, msg: string): void {
    const logLevel = LogLevel.TRACE;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  debug(sender: any, msg: string): void {
    const logLevel = LogLevel.DEBUG;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  info(sender: any, msg: string): void {
    const logLevel = LogLevel.INFO;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  warn(sender: any, msg: string): void {
    const logLevel = LogLevel.WARN;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  error(sender: any, msg: string): void {
    const logLevel = LogLevel.ERROR;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }

  fatal(sender: any, msg: string): void {
    const logLevel = LogLevel.FATAL;
    if (this.shouldLog(logLevel)) {
      console.log(this.formatMessage(sender, msg, logLevel));
    }
  }
}

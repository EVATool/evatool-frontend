export class HttpInfo { // TODO Split into 3 events for: next, complete, error?

  timestamp = 0;
  path!: string;
  method!: string;
  httpStatusCode!: number;
  type!: HttpInfoType;
  functionalErrorCode?: number;
  tag?: any;

}

export enum HttpInfoType {
  Next = 0,
  Error = 1,
  Complete = 2
}


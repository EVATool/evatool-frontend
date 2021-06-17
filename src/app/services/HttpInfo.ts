export class HttpInfo {

  timestamp = 0;
  type!: HttpInfoType;
  functionalErrorCode?: number;

}

export enum HttpInfoType {
  Next = 0,
  Error = 1,
  Complete = 2
}


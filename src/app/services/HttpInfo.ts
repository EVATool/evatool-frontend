export class HttpInfo {

  timestamp = 0;
  type!: HttpInfoType;
  message = '';

}

export enum HttpInfoType {
  Next = 0,
  Error = 1,
  Complete = 2
}


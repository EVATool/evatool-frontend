export class HttpInfo {

  timestamp = 0;
  type!: HttpEventType;
  message = '';

}

export enum HttpEventType {
  Next = 0,
  Error = 1,
  Complete = 2
}


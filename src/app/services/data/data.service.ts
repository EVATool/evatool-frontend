import {Injectable} from '@angular/core';
import {LogService} from '../log.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {

  protected constructor(protected logger: LogService) {
  }

  abstract init(): void;

  protected sortDefault(array: any[]): any[] {
    if (array && array.length > 0 && array[0]?.prefixSequenceId) {
      return array.sort(this.comparePrefixId);
    } else {
      return array;
    }
  }

  private comparePrefixId(a: any, b: any): number {
    const aSequenceId = +a.prefixSequenceId.replace(/[^0-9]/g, '');
    const bSequenceId = +b.prefixSequenceId.replace(/[^0-9]/g, '');
    console.log(aSequenceId, bSequenceId);
    if (aSequenceId > bSequenceId) {
      return 1;
    } else if (a.prefixSequenceId < b.prefixSequenceId) {
      return -1;
    } else {
      return 0;
    }
  }
}

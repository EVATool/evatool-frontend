import {Injectable} from '@angular/core';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {

  protected constructor(protected logger: LogService) {
  }

  abstract init(): void;

}

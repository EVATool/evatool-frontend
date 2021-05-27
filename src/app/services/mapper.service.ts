import {Injectable} from '@angular/core';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export abstract class MapperService {

  protected constructor(protected logger: LogService) {
  }

}

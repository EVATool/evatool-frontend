import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pluck'
})
export class PluckPipe implements PipeTransform { // TODO add tests
  transform (input: any[], key: string): any {
    return input.map(value => value[key]);
  }
}

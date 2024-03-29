import {Pipe, PipeTransform} from '@angular/core';
import {stringFormat} from '../extensions/string.extensions';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return stringFormat(value, ...args);
  }
}

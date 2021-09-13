import {Pipe, PipeTransform} from '@angular/core';
import {stringFormat} from '../extensions/string.extensions';

@Pipe({
  name: 'format'
})
export class StringFormatPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return stringFormat(value, ...args);
  }
}

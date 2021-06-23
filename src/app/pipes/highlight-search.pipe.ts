import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: string, args: string): string {
    if (!args) {
      return value;
    }

    if (!value) {
      return value;
    }

    const regex = new RegExp('(' + args + ')', 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    return value.replace(regex, `<span class="highlighted-text">$1</span>`);
  }
}

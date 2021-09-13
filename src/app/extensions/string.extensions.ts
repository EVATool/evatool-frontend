export function stringf(s: string, ...args: string[]): string {

  for (let i = 0; i <= args.length; i++) {
    s = s.replace('${' + i + '}', args[i]);
  }
  return s;
}


// TODO try to make this work. It would be more elegant.
// interface String {
//   format(...replacements: string[]): string;
// }
//
// if (!String.prototype.format) {
//   String.prototype.format = function(): string {
//     const args = arguments;
//     // tslint:disable-next-line:only-arrow-functions
//     return this.replace(/{(d+)}/g, function(match: string, index: number): string {
//       return typeof args[index] !== 'undefined'
//         ? args[index] : match;
//     });
//   };
// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bid'
})
export class BoldItalicsPipe implements PipeTransform {
  transform(value: String, ...args: any[]) {
    if (value == null || value == '') {
      return;
    }

    let newString: String = value.bold();
    newString = value.italics();
    return newString;
  }
}

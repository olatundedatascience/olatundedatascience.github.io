import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multi'
})
export class MultiCasePipe implements PipeTransform {
  transform(value: string, ...args: any[]) {
    let strValue = value.split(' ');
    let newStr = '';
    for (let i = 0; i < strValue.length; i++) {
      newStr += (strValue[i][0]).toLocaleUpperCase();
    }

    return newStr;
  }
}

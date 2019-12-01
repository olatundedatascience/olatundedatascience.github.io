import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string ): any {
    if (value) {
      const word2Change = value.split(' ');
      let ik = '';
      for (let i = 0; i < word2Change.length; i++) {
        ik += (word2Change[i].substring(0, 1)).toUpperCase()  + (word2Change[i].substring(1)).toLowerCase() + ' ';
      }

      return ik;
    } else {
      return ;
    }

  }

}

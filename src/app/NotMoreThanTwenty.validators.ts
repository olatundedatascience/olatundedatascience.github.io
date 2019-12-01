import { ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';


export class TwentyWordsValidator {
    static isGreaterThanTwenty(c: AbstractControl): ValidationErrors | null {
        let curentWords = ((c.value as string).split(' ')).length;

        if (curentWords > 12) {
            return {isGreaterThanTwenty: true};
        }
        return null;
    }
}

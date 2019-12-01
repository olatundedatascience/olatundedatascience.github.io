import { AbstractControl, ValidationErrors } from '@angular/forms';


export class ShouldNotStartWithVowels  {
    vowels: Array<String> = ['a', 'e', '0', 'i', 'u'];


        static noVowels(c: AbstractControl): Promise<ValidationErrors | null>  {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    ['a', 'e', '0', 'i', 'u'].forEach((v) => {
                        if ((c.value as string).indexOf(v) > -1) {
                            resolve({noVowels: true});
                        } else {
                            resolve(null);
                        }
                    });
                }, 2000);


            });
        }

}

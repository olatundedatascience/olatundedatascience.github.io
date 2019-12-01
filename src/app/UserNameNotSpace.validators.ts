import {AbstractControl, ValidationErrors} from '@angular/forms';


export class UserNameCannotContainSpace {
    static NoSpace(c: AbstractControl): ValidationErrors | null {

        setTimeout(function() {
            if ((c.value as string).indexOf(' ') >= 0) {
                return {NoSpace: true};
            }
        }, 5000);



        return null;
    }
}

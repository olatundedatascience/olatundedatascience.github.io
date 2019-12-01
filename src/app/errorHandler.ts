import { ErrorHandler } from '@angular/core';

export class eError implements ErrorHandler {
    handleError(error) {
        alert(error);
    }
}

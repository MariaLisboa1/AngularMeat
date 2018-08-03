import { HttpErrorResponse } from "@angular/common/http";
import 'rxjs/add/observable/throw';
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";

import { NotificationService } from './shared/messages/snackbar/notification.service';
import { LoginService } from "./security/login/login.service";

@Injectable()

export class ApplicationErrorHandler extends ErrorHandler {

    constructor(
        private ns: NotificationService,
        private injector: Injector,
        private zone: NgZone) {
        super()
    }

    handlerError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message:string = errorResponse.error.message
            this.zone.run(() => {
                if (errorResponse.status) {
                    console.log('teste');
                    
                }
                switch (errorResponse.status) {
                    case 401:
                        this.injector.get(LoginService).handleLogin()
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado')
                    case 404:
                        this.ns.notify(message || 'Recurso não autorizado')
                        break;
                }
            })
        }
        super.handleError(errorResponse)
    }
}
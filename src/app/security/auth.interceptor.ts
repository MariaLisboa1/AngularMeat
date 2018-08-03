import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

//melhor forma de usar o token para login
@Injectable()
export class authInterceptor implements HttpInterceptor {

    constructor(private injector: Injector){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const loginService = this.injector.get(LoginService)
        if (loginService.isLoggedIn()) {
            const authRequest = request.clone(
                {setHeaders:{'Authorization': `Bearer ${loginService.user.accessToken}`}})
            return next.handle(authRequest)
        }else{
            return next.handle(request)
        }
    }
}
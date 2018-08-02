import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()

//isso é um provider
export class LoggedInGaurd implements CanLoad, CanActivate {

    constructor(private loginService: LoginService){}

    //checa a autenticação dele (dados corretos para entrar no site)
    checkAuthentication(path: string): boolean{
        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`) 
        }
        return loggedIn
    }

    //checa se ta online e joga o parametro da url certa caso esteja
    canLoad(route: Route): boolean {
        console.log('canLoad');
        
        return this.checkAuthentication(route.path) 
    }
    //segurança a mais pro usuario quando acessar (pra os modulos de login nao ficar ja carregado quando ele acessar de novo o site)
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        console.log('canActivate');
        return this.checkAuthentication(activatedRoute.routeConfig.path) 
    }
}
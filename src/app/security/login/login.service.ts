import { MEAT_API } from "../../app.api";
import { Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { User } from "./user.model";
import 'rxjs/add/operator/do'
import { Router, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/filter'

@Injectable()
export class LoginService {

    user: User 
    lastUrl: string //se o site nao passar nenhum parametro, isso faz a url ir pra ultima

    constructor (private http: HttpClient, private router: Router){
        this.router.events.filter(e => e instanceof NavigationEnd) //faz a navegação ficar coerente
                        .subscribe((e: NavigationEnd)=> this.lastUrl = e.url)
    }

    isLoggedIn():boolean { //metodo pra saber se o usuario está logado
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${MEAT_API}/login`,
                {email: email, password: password})
            .do(user=> this.user = user)
    }

    handleLogin(path: string = this.lastUrl){
        this.router.navigate(['/login',btoa(path)]) //btoa => para a url nao ficar feia, ele encolda a url. Depois tem que colocar tbm no login.component.ts
    }

    //deslogar o usuario
    logout(){
        this.user = undefined
    }
}
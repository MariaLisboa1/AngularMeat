import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/login/login.service';
import { User } from '../../security/login/user.model';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  user() : User {
    return this.loginService.user
  }

  isLoggedIn() : boolean{
    return this.loginService.isLoggedIn() //verifica se o usuario ta logado ou nao
  }

  login(){
    this.loginService.handleLogin() //fazer login
  }

  logout(){
    this.loginService.logout() //fazer logout
  }
}

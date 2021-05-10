import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

export interface User {
  initial:string
  name:string
  role:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  USER_FULL_NAME_SESSION_ATTRIBUTE_NAME = 'name'
  BASE_PATH: string =  'https://seu-class-attencence-system.herokuapp.com'
  public username: string;
  public password: string;
  public userFulName: string;
  constructor(private http: HttpClient) { }

  authService(username: string, password: string){
    return this.http.get<User>(this.BASE_PATH,
      {headers:{ authorization: this.creatBasicAuthToken(username,password) }}).pipe(map((res)=>{
         this.username = username;
         this.password = password;
         this.userFulName = res.name;
         this.registerSeccessfullLogin(username,this.userFulName);
    }));
  }

  private creatBasicAuthToken(username: string, password: string) {
    return 'Basic '+window.btoa(username+":"+password);
  }

  private registerSeccessfullLogin(username: string, fullName: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME,username);
    sessionStorage.setItem(this.USER_FULL_NAME_SESSION_ATTRIBUTE_NAME,fullName);
  }
  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }
  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
  getLoggedInUserFullName() {
    let user = sessionStorage.getItem(this.USER_FULL_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}

import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../servicess/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  constructor(private auth: AuthService,
              private router: Router,
              public  notifications: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.auth.logout();
  }

  onLogin(loginfrom: NgForm) {
    if (!loginfrom.valid) {
      this.showLoginMassge("Username and password ", "Required");
    }else {
      this.auth.authService(this.userName, this.password)
        .subscribe(res => {
            console.log("from log in : "+res);
            this.invalidLogin = false;
            this.loginSuccess = true;
            this.showLoginMassge("Login Successfully","")
            this.router.navigate(['/dashboard'])

        },
          (error) => {
          console.log(error);
            this.showLoginMassge("Invalid Username Or Password","Bad Credential")
            this.invalidLogin = true;
            this.loginSuccess = false;
          }
        )

    }


  }
  showLoginMassge(massge: string, action: string){
     this.notifications.open(massge, action,{
        duration: 3000
     })
  }
}

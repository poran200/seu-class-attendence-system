import { Component } from '@angular/core';
import {AuthService} from "./servicess/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  isLoggedIn = false;
  sideBarOpen: boolean = true
  constructor(private auth: AuthService) {
  }

  sideBarToggler($event: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../servicess/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
   userIsLoggedIn = false;
  username: string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.userIsLoggedIn= this.auth.isUserLoggedIn()
    this.username = this.auth.getLoggedInUserFullName();

  }

}

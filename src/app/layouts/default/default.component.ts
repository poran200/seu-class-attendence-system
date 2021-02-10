import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../servicess/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  isLoggedIn =  false;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    if (!this.isLoggedIn) {
       this.router.navigate(['/'])
    }
  }


  sideBarToggler($event: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}

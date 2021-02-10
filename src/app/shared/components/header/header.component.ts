import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from "../../../servicess/auth.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../servicess/loader.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  isUserLoggedIn:boolean = false;
  constructor(private auth: AuthService,private router: Router,public loaderService:LoaderService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logoutHandle($event: MouseEvent) {
     this.auth.logout();
     this.router.navigate(['/'])

  }
}

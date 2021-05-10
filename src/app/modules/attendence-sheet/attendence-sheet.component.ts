import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../servicess/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-attendence-sheet',
  templateUrl: './attendence-sheet.component.html',
  styleUrls: ['./attendence-sheet.component.scss']
})
export class AttendenceSheetComponent implements OnInit {
  isLoggedIn = false
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    if (!this.isLoggedIn){
      this.router.navigateByUrl("/");
    }
  }

}

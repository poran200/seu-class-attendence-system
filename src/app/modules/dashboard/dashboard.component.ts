import { Component, OnInit} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource} from '@angular/material';
import {AuthService} from "../../servicess/auth.service";
import {Router} from "@angular/router";

export interface ClassLogSummary {
  sectionId: string;
  courseTitle: string;
  scheduled: number;
  logged:number;
  durationToBeTaken:number;
  durationTaken:number;
  attendanceRate:number;

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  displayedColumns: string[] = ['sectionId', 'courseTitle', 'scheduled','logged','duration','attendanceRate'];
  username: string;
  ELEMENT_DATA: ClassLogSummary[] = [];
  dataSource: MatTableDataSource<ClassLogSummary>;
  startDate: Date;
  endDate: Date;
  sections: number;
  regStudents: number;
  classLogged:number;
  scheduled: number;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              public auth: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    if (!this.isLoggedIn) {
         this.auth.logout();
        this.router.navigate(['/']);
    }else {
      this.username = this.auth.getLoggedInUserFullName();
      this.dashboardService.getClassLogSummary().subscribe(res => {
        this.sections = res.totalSections;
        this.regStudents = res.registerStudents;
        this.classLogged = res.classLogged;
        this.scheduled = res.scheduled;
        this.dataSource = new MatTableDataSource<ClassLogSummary>(res.summary);

      },error => {
         if (error.status === 401){
           this.auth.logout();
           this.router.navigate(['/']);
         }
      });
    }

  }


  onDateChange() {
    if (this.startDate && this.endDate) {
       const dateWithformatEnd = this.getDateWithformat(this.endDate);
       const dateWithformatstart = this.getDateWithformat(this.startDate);
       console.log(dateWithformatEnd)
       console.log(dateWithformatstart)
       this.dashboardService.getClassLogSummaryByDate(dateWithformatstart,dateWithformatEnd).subscribe(res=>{
         this.dataSource = new MatTableDataSource<ClassLogSummary>(res);
       })
    }

  }
  getDateWithformat(date: Date){
   return  date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear();
  }
}

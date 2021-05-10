import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {MatTableDataSource} from '@angular/material';
import {AuthService} from "../../servicess/auth.service";
import {Router} from "@angular/router";
import {AttendenceSheetService, Week} from "../../servicess/attendence-sheet.service";


export interface ClassLogSummary {
  sectionId: string;
  courseTitle: string;
  scheduled: number;
  logged: number;
  durationToBeTaken: number;
  durationTaken: number;
  attendanceRate: number;

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  displayedColumns: string[] = ['sectionId', 'courseTitle', 'scheduled', 'logged', 'duration', 'attendanceRate'];
  username: string;
  ELEMENT_DATA: ClassLogSummary[] = [];
  dataSource: MatTableDataSource<ClassLogSummary>;
  startDate: Date;
  endDate: Date;
  sections: number;
  regStudents: number;
  classLogged: number;
  scheduled: number;
  data: any[] = [];
  charData: any[] = [];
  weeks: Week[];

  constructor(private dashboardService: DashboardService,
              private router: Router,
              public auth: AuthService,
              private attendsService: AttendenceSheetService
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    if (!this.isLoggedIn) {
      this.auth.logout();
      this.router.navigate(['/']);
    } else {
      this.username = this.auth.getLoggedInUserFullName();
      this.dashboardService.getClassLogSummary().subscribe(res => {
        this.sections = res.totalSections;
        this.regStudents = res.registerStudents;
        this.classLogged = res.classLogged;
        this.scheduled = res.scheduled;
        this.dataSource = new MatTableDataSource<ClassLogSummary>(res.summary);

      }, error => {
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/']);
        }
      });
    }
    this.barChart();
    this.attendsService.getWeeks().subscribe(res => {
       this.weeks = res;
    })

  }


  onDateChange() {
    if (this.startDate && this.endDate) {
      const dateWithformatEnd = this.getDateWithformat(this.endDate);
      const dateWithformatstart = this.getDateWithformat(this.startDate);
      this.dashboardService.getClassLogSummaryByDate(dateWithformatstart, dateWithformatEnd).subscribe(res => {
        this.dataSource = new MatTableDataSource<ClassLogSummary>(res);
      })
    }

  }

  getDateWithformat(date: Date) {
    return date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
  }

  barChart() {
     const classLogName = "Class Logged";
     const classLogScheduledName = "Class Scheduled"
    this.dashboardService.getClassLogSummary().subscribe(res => {
      for (const logChartItem of res.logChartItems) {
          this.charData.push(
            {
              name: logChartItem.courseCode,
              series: [{
                name: classLogName,
                value: logChartItem.totalLogged
              },
                {
                  name: classLogScheduledName,
                  value: logChartItem.totalScheduled
                }
              ]
            }
          )
      }
      console.log(this.charData)
    })

  }

  onSelectWeek(week: Week) {
     this.startDate = week.start;
     this.endDate = week.end;
     console.log(this.startDate + " " + this.endDate);
    // this.dashboardService.getClassLogSummaryByDate(this.startDate, this.endDate).subscribe(res => {
    //   this.dataSource = new MatTableDataSource<ClassLogSummary>(res);
    // })
  }
}

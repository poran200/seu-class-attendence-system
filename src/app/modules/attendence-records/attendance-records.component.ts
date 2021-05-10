import { Component, OnInit } from '@angular/core';
import {SectionService} from "../../servicess/section.service";
import {AuthService} from "../../servicess/auth.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Attendance, AttendenceSheetService} from "../../servicess/attendence-sheet.service";

@Component({
  selector: 'app-attendence-records',
  templateUrl: './attendance-records.component.html',
  styleUrls: ['./attendance-records.component.scss']
})
export class AttendanceRecordsComponent implements OnInit {
  dataSource: MatTableDataSource<Attendance>;
  displayedColumns: string[] = ['name','id', 'attendances'];
  sections: string[];
  private selectedSection: string;

  constructor(private sectionService: SectionService,
              private authService: AuthService,
              public router: Router,
              private attendanceService: AttendenceSheetService
  ) { }

  ngOnInit() {
    if (!this.authService.isUserLoggedIn()){
      this.authService.logout()
      this.router.navigate(['/']).then(r => console.log(r))
    }
    this.sectionService.getSections(this.authService.getLoggedInUserName()).subscribe(res =>{
      this.sections = res.map(r => r['sectionId']+":"+r['course']['title']);
    },error => {
      console.log(error);
      if (error.status === 401){
        this.router.navigate(['/']).then(r => console.log(r) );
      }

    });
  }

  onSelectSection(section: string) {
    const sec = section.split(':');
    this.selectedSection = sec[0];
    console.log(this.selectedSection);
    this.attendanceService.getSheet(sec[0]).subscribe(data =>{
      this.dataSource = new MatTableDataSource<Attendance>(data)
    })
  }
}

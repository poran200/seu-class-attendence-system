import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ClassLogService} from "../../servicess/classlog.serviece";
import {ClasslogidService} from "../../servicess/classlogid.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../servicess/auth.service";

@Component({
  selector: 'app-classlog-from',
  templateUrl: './classlog-from.component.html',
  styleUrls: ['./classlog-from.component.scss']
})
export class ClasslogFromComponent implements OnInit,OnDestroy {

  classLOgId:number
  section: string = "";
  schedule: string = "";
  createdAt: any;
  updatedAt: any;
  attend: number = 0;
  registered: number = 0;
  startTime: string;
  conductedAt: Date;
  endTime: string;
  duration: number;
  // data share
  logIdSubscription:Subscription;

  constructor(private classLogService: ClassLogService,
              private logIdService: ClasslogidService,
              public notification: MatSnackBar,
              private authService: AuthService
              ) {}

  ngOnInit() {
   this.classlogIdfecth();
   this.setUpFromValue()
  }

  invalidInputHandler() {

  }

  timeChangeHandler($event: any) {

  }


  log(time: Event) {
    console.log(time)
  }

  onSubmit(clasLogfrom: NgForm) {
     console.log(clasLogfrom.value)
    if (!clasLogfrom.valid){
      this.openNotification("Conducted Date And Duration ","Required");
    }else {
      this.classLogService.updateClassLog(this.classLOgId,{
        duration: this.duration,
        conductAt: this.conductedAt.getMonth()+"-"+this.conductedAt.getDate()+"-"+this.conductedAt.getFullYear(),
        status: "Submitted"
      }).subscribe(response => {
        console.log(response)
      },error => {
        console.log(error)
      },(() => {
        this.openNotification("class Log updated ","");
      }))
    }

  }

  getDuration(startTime1: string, endTime1: string) {
    if (startTime1 && endTime1){
      const startTime  = this.parseTime(startTime1);
      const  endTime = this.parseTime(endTime1);
     return  this.duration = this.claculateduration(startTime.hh,startTime.mm,endTime.hh,endTime.mm);
    }

  }

  updatedTime($event: Event) {
    // this.getDuration(startTime, endTime)
  }

  claculateduration( startHour: number, startMinute: number,endHour: number, endMin:number){
      const hours = endHour - startHour;
      const minutes = endMin - startMinute;
    return (hours*60)+minutes;
  }

  parseTime(s) {
    console.log(s);
    const part = s.split(":")
    let hh = parseInt(part[0], 10);
    const mm = parseInt(part[1], 10);
    const amOrPm = s.split(" ");
    const ap = amOrPm[1] ? amOrPm[1].toUpperCase() : null;
    if (ap === "AM") {
      if (hh == 12) {
        hh = 0;
      }
    }
    if (ap === "PM") {
      if (hh != 12) {
        hh += 12;
      }
    }
    return { hh: hh, mm: mm };
  }
  ngOnDestroy() {
    if (this.logIdSubscription){
      this.logIdSubscription.unsubscribe();
    }
  }

  classlogIdfecth(){
    this.logIdSubscription = this.logIdService.currentlogId.subscribe(id => this.classLOgId = id);
    console.log(this.classLOgId)
  }
  setUpFromValue(){
    if (this.classLOgId !== 0)
     this.classLogService.findBYId(this.classLOgId)
       .subscribe(res=>{
         this.section = res['section']['sectionId'];
         this.schedule = res['section']['location'];
         this.createdAt = res['createdAt'];
         this.updatedAt = res['updatedAt'];
         this.attend = res['totalAttend'];
         this.registered =res ['section']['registerStudents'].length;
     })
  }
  openNotification(massage:string, action:string){
    this.notification.open(massage,action,{
      duration: 3000
    });
  }
}

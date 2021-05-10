import {Component, OnDestroy, OnInit} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {SectionService} from "../../../servicess/section.service";
import {ClassLogService} from "../../../servicess/classlog.serviece";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {ClasslogidService} from "../../../servicess/classlogid.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../servicess/auth.service";

export interface StudentElement {
  name: string;
  id: string;
}
export interface SectionResponse {

}


  const ELEMENT_DATA: StudentElement[] = [];
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit ,OnDestroy{
  displayedColumns: string[] = ['select', 'name', 'id'];
  dataSource = new MatTableDataSource<StudentElement>(ELEMENT_DATA);
  selection = new SelectionModel<StudentElement>(true, []);
  sections = []
  selectedSection: string = "";
  classLogId: number
  classlogIdSubscription: Subscription

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StudentElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} }`;
  }


  constructor(private sectionService: SectionService,
              private classlogService: ClassLogService,
              public notification: MatSnackBar,
              public router: Router,
              private logIdService:ClasslogidService,
              private authService: AuthService,
  ) { }

  ngOnInit() {
    this.logIdService.currentlogId.subscribe()

    const   res = this.sectionService.getSections(this.authService.getLoggedInUserName()).subscribe(res =>{
      const  data = [];
      // res[1].registerStudents.forEach(s=> data.push(s.student));
      // this.dataSource = new MatTableDataSource<PeriodicElement>( data);
       this.sections = res.map(r => r['sectionId']+":"+r['course']['title']);
    },error => {
      console.log(error);
      if (error.status === 401){
        this.router.navigate(['/']).then(r => console.log(r) );
      }

    });

  }


  onSaveClick(){
    const selectedStudent  = this.selection.selected;
    this.classlogService.saveClassLog(this.selectedSection, selectedStudent)

       .subscribe(res => {
         this.classLogId = res['id']
         this.chageLOgId(this.classLogId);
         console.log(res);

       },
         error => {
           console.log(error);
         },
         (() => {
           console.log("completed");
         })
       )
    this.selection.clear()
    this.openNotification("Class Log Saved !","");
    // this.router.navigate(['dashboard/class-log-from']).then(r => console.log(r));

  }

  onSelectSection(section: string) {
        const sec = section.split(':');
        this.selectedSection = sec[0];
        console.log(this.selectedSection);
        this.sectionService.getSectionStudents(sec[0]).subscribe(data =>{
          this.dataSource = new MatTableDataSource<StudentElement>(data['registerStudents'].map(r =>r['student']))
        })
  }
  openNotification(massage:string, action:string){
     this.notification.open(massage,"",{
       duration: 3000
     });
  }

  getClassLogId() {
    return this.classLogId
  }

  ngOnDestroy(): void {
    if (this.classlogIdSubscription){
      this.classlogIdSubscription.unsubscribe();
    }
  }
  chageLOgId(loid: number){

    this.logIdService.changeLogId(loid);
  }

}

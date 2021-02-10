import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {LoginComponent} from "./modules/login/login.component";
import {AttendenceSheetComponent} from "./modules/attendence-sheet/attendence-sheet.component";
import {ClasslogComponent} from "./modules/classlog/classlog.component";
import {ClasslogFromComponent} from "./modules/classlog-from/classlog-from.component";
import {AttendanceRecordsComponent} from "./modules/attendence-records/attendance-records.component";

const routes: Routes = [{
  path: 'dashboard',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  },{
    path:'antecedence-sheet',
    component:AttendenceSheetComponent
  },
    {
      path:'class-log',
      component:ClasslogComponent
    },{
      path:'class-log-from',
      component:ClasslogFromComponent
    },{
     path:'attendance-records',
      component: AttendanceRecordsComponent
    }
    ]
},
  {
  path:'',
  component: DefaultComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import {ClasslogComponent} from "../../modules/classlog/classlog.component";
import {ClasslogFromComponent} from "../../modules/classlog-from/classlog-from.component";
import {AttendenceSheetComponent} from "../../modules/attendence-sheet/attendence-sheet.component";
import {LoginComponent} from "../../modules/login/login.component";
import {AttendanceRecordsComponent} from "../../modules/attendence-records/attendance-records.component";
import {MatButtonModule} from "@angular/material/button";
import {CardComponent} from "../../modules/dashboard/card/card.component";
import {StudentListComponent} from "../../modules/dashboard/student-list/student-list.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {SectionService} from "../../servicess/section.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ClassLogService} from "../../servicess/classlog.serviece";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTimepickerModule} from "mat-timepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {ClasslogidService} from "../../servicess/classlogid.service";
import {HttpIntercptoreServiceService} from "../../servicess/http-intercptore-service.service";


@NgModule({
    declarations: [
        DefaultComponent,
        DashboardComponent,
        PostsComponent,
        ClasslogComponent,
        ClasslogFromComponent,
        AttendenceSheetComponent,
        LoginComponent,
        AttendanceRecordsComponent,
        CardComponent,
        StudentListComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatSidenavModule,
        MatDividerModule,
        FlexLayoutModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        HttpClientModule,

        MatSnackBarModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatTimepickerModule, NgxMaterialTimepickerModule
    ],
    exports: [
        DefaultComponent
    ],
    providers: [
        DashboardService,
        SectionService,
        ClassLogService,
        ClasslogidService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpIntercptoreServiceService,
            multi: true
        }
    ]
})
export class DefaultModule { }

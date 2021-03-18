import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ClassLogSummary} from "./dashboard/dashboard.component";
export interface DashboardInfo {
  registerStudents:number
  totalSections:number;
  classLogged:number;
  scheduled:number
  summary:ClassLogSummary[]
  logChartItems: chartItem[]
}

export  interface chartItem {
  courseCode: string;
  totalScheduled: any;
  totalLogged: any;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl: string = environment.baseUrl;
  constructor(private http:HttpClient) { }
  getClassLogSummary(){
    return this.http.get<DashboardInfo>(this.baseUrl+'dashboard')
  }

  getClassLogSummaryByDate(startDate: string, endDate: string){
    return this.http.post<ClassLogSummary[]>(this.baseUrl+'dashboard/weekSummary',{
        start: startDate,
        end: endDate
      }
    );

  }
}

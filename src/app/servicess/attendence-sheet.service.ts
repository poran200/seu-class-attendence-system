import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

export interface Attendance {
  student: Student
  attendances: number
}
export interface Student {
    id: number,
    name: string
}

export interface Week {
  weekNumber: number,
  start: Date,
  end: Date
}
@Injectable({
  providedIn: 'root'
})
export class AttendenceSheetService {
  private BASE_URL = environment.baseUrl
  constructor(private http:HttpClient) { }

  public getSheet(section:string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.BASE_URL}attendance-sheet/${section}`);
  }

  public getWeeks(): Observable<Week[]>{
     return this.http.get<Week[]>(`${this.BASE_URL}weeks`)
  }

}

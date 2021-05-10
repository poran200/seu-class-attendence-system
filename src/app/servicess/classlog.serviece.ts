import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { StudentElement} from "../modules/dashboard/student-list/student-list.component";

@Injectable({
  providedIn: 'root'
})
export class ClassLogService {
    baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {

  }

  saveClassLog(sectionId: string, students: StudentElement[]){
      return  this.http.post(this.baseUrl+`classlog/${sectionId}`,students);

  }
  updateClassLog(classLogId: number,body: {duration: number,conductAt:string , status:string}){
     return  this.http.put<Response>(this.baseUrl+`classlog/${classLogId}`,body);
  }
  findBYId(logId: number){
      return this.http.get(this.baseUrl+`classlog/${logId}`)
  }
}

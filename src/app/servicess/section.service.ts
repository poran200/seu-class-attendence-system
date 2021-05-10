import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SectionService {
    BaseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getSections(user:string){
     return this.http.get<[]>(`${this.BaseUrl}section/${user}`)
  }
  getSectionStudents(sectionId: string){
    return this.http.get<[]>(`${this.BaseUrl}section/students/${sectionId}`)
  }
}

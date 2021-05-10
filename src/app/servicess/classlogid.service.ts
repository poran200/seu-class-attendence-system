import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClasslogidService {
   private  claslogId = new BehaviorSubject(0)
   currentlogId = this.claslogId.asObservable();
  constructor() { }
  changeLogId(logId: number) {
    this.claslogId.next(logId);
  }
}

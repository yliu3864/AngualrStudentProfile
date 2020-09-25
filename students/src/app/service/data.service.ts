import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../profile/profile.component';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getAllStudents(){
    return this.http.get("https://www.hatchways.io/api/assessment/students");
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {

 
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}


  getStudents(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/?page=${page}`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students/create/`, student);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/students/update/${id}/`, student);
  }

 
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/delete/${id}/`);
  }
}
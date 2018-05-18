import { Injectable } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getEmployees(): Observable<any> {
    return this.http.get('/employees').map(res => res.json());
  }

  getEmployee(userID: string): Observable<any> {
    return this.http.get(`/employee/${userID}`).map(res => res.json());
  }

  addEmployee(employee): Observable<any> {
    return this.http.post('/employee', JSON.stringify(employee), this.options);
  }

  editEmployee(employee): Observable<any> {
    return this.http.put(`/employee/${employee.userID}`, JSON.stringify(employee), this.options);
  }

  deleteEmployee(employee): Observable<any> {
    return this.http.delete(`/employee/${employee.userID}`, this.options);
  }

}

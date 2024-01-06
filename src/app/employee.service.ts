import { Injectable } from '@angular/core';
import Employee from '../types/employee';
import employeeList from './mock-employees';
import { Observable, of } from 'rxjs';

const STORAGE_KEY = 'employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  getEmployees(): Observable<Employee[]> {
    const data = this.getData();
    if (data) return of(data);
    else {
      this.saveData(employeeList);
      return of(employeeList);
    }
  }

  getEmployee(id: number): Observable<Employee | undefined> {
    const data = this.getData();
    if (data) return of(data.find((employee) => employee.id === id));
    else {
      this.saveData(employeeList);
      return of(employeeList.find((employee) => employee.id === id));
    }
  }

  saveData(employees: Employee[]) {
    if (localStorage !== undefined)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }

  getData(): Employee[] {
    if (localStorage !== undefined)
      return JSON.parse(
        localStorage.getItem('employees') || '[]'
      ) as Employee[];
    else return [];
  }
}

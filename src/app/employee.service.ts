import { Injectable } from '@angular/core';
import Employee from '../types/employee';
import employeeList from '../mock/mock-employees';
import { Observable, of } from 'rxjs';

const STORAGE_KEY = 'employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  getEmployees(): Observable<Employee[]> {
    const data = this.getData();
    if (data && data.length) return of(data);
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

  generateNewId(): Observable<number> {
    let data = this.getData();
    if (!data) data = employeeList;
    const largest = Math.max(...data.map((employee) => employee.id));
    return of(largest + 1);
  }

  saveEmployee(employee: Employee) {
    let data = this.getData();
    if (!data) data = employeeList;
    data.push(employee);
    this.saveData(data);
  }

  saveData(employees: Employee[]) {
    if (localStorage)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }

  getData(): Employee[] {
    if (localStorage)
      return JSON.parse(
        localStorage.getItem('employees') || '[]'
      ) as Employee[];
    else return [];
  }
}

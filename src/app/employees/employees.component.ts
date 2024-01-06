import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {
  DATE_PIPE_DEFAULT_OPTIONS,
  NgFor,
  NgIf,
  UpperCasePipe,
  CommonModule,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import Employee from '../../types/employee';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { numberThousandSeparator } from '../../utils';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    NgFor,
    NgIf,
    UpperCasePipe,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'longDate' },
    },
  ],
})
export class EmployeesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'salary',
    'status',
    'group',
    'actions',
  ];
  dataSource!: MatTableDataSource<Employee>;
  selected?: Employee;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private _snackBar: MatSnackBar
  ) {}

  onSelect(employee: Employee): void {
    this.selected = employee;
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.dataSource = new MatTableDataSource(employees);
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee() {
    if (this.selected) {
      const data = this.dataSource.data.filter(
        (employee) => employee.id != this.selected?.id
      );

      this.dataSource.data = data;
      this.employeeService.saveData(data);

      this.openSnackBar(
        `Employee ${this.selected?.firstName} ${this.selected?.lastName} has been deleted`,
        'error'
      );
    }
  }

  openSnackBar(message: string, color: 'warning' | 'error') {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: 'app-notification-' + color,
    });
  }

  salaryFormat(x: number): string {
    return 'Rp ' + numberThousandSeparator(x, ',');
  }
}

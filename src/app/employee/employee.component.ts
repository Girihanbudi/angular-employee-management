import { NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import Employee, {
  EmployeeGroups,
  EmployeeStatuses,
  defaultEmployee,
} from '../../types/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    UpperCasePipe,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  today: Date = new Date();
  readOly: boolean = false;
  id: number = 0;
  employeeGroups: string[] = [...EmployeeGroups];
  employeeStatuses: string[] = [...EmployeeStatuses];

  userName = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  birthDate = new FormControl(new Date(), [Validators.required]);
  basicSalary = new FormControl(0, [Validators.required]);
  status = new FormControl('', [Validators.required]);
  group = new FormControl('', [Validators.required]);
  description = new FormControl('');

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.readOly = true;
      this.id = +idParam;
      this.employeeService.getEmployee(this.id).subscribe((employee) => {
        if (employee) {
          this.bindForm(employee);
          this.disableForm();
        }
      });
    } else {
      this.userName.disable();
    }
  }

  disableForm() {
    this.userName.disable();
    this.firstName.disable();
    this.lastName.disable();
    this.email.disable();
    this.birthDate.disable();
    this.basicSalary.disable();
    this.status.disable();
    this.group.disable();
    this.description.disable();
  }

  bindForm(employee: Employee) {
    this.userName.setValue(employee.userName);
    this.firstName.setValue(employee.firstName);
    this.lastName.setValue(employee.lastName);
    this.email.setValue(employee.email);
    this.birthDate.setValue(employee.birthDate || null);
    this.basicSalary.setValue(employee.basicSalary);
    this.status.setValue(employee.status);
    this.group.setValue(employee.group);
    this.description.setValue(employee.description);
  }

  onNameChange(event: Event): void {
    const firstName = this.firstName.getRawValue();
    const lastName = this.lastName.getRawValue();
    const lowerFirstName = firstName?.toLowerCase() || '';
    const lowerLastName = lastName?.toLowerCase() || '';

    this.userName.setValue(
      lastName ? lowerFirstName + '_' + lowerLastName : lowerFirstName
    );
  }

  submit() {
    this.employeeService.generateNewId().subscribe((id) => {
      const newEmployee: Employee = {
        id: id,
        userName: this.userName.getRawValue() || '',
        firstName: this.firstName.getRawValue() || '',
        lastName: this.lastName.getRawValue() || '',
        email: this.email.getRawValue() || '',
        birthDate: this.birthDate.getRawValue() || undefined,
        basicSalary: this.basicSalary.getRawValue() || 0,
        status: this.status.getRawValue() || '',
        group: this.group.getRawValue() || '',
        description: this.description.getRawValue() || '',
      };

      this.employeeService.saveEmployee(newEmployee);
      this.router.navigate(['/employees']);
      this.openSnackBar(
        `New Employee ${newEmployee.firstName} added`,
        'warning'
      );
    });
  }

  getUserNameErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  getFirstNameErrorMessage() {
    if (this.firstName.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  getBirthDateErrorMessage() {
    if (this.birthDate.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  getSalaryErrorMessage() {
    if (this.basicSalary.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  getStatusErrorMessage() {
    if (this.status.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  getGroupErrorMessage() {
    if (this.group.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  getDescriptionErrorMessage() {
    if (this.description.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Field is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  openSnackBar(message: string, color: 'warning' | 'error') {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: 'app-notification-' + color,
    });
  }
}

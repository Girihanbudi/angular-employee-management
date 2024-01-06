export interface Employee {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export const defaultEmployee: Employee = {
  id: 0,
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  birthDate: new Date(),
  basicSalary: 0,
  status: '',
  group: '',
  description: '',
};

export const EmployeeGroups = [
  'Accounting',
  'Finance',
  'Human Resource',
  'Audit',
  'Information Technology',
] as const;

export const EmployeeStatuses = ['Single', 'Married'] as const;

export const employeeKeys = Object.keys(defaultEmployee);

export default Employee;

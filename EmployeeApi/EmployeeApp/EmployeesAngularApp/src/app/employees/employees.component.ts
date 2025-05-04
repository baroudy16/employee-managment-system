import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  newEmployee: Employee = { id: 0, firstName: '', lastName: '', email: '', position: '' };
  editing: boolean = false;

  // Search term
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  saveEmployee() {
    if (this.editing) {
      this.employeeService.updateEmployee(this.newEmployee).subscribe(() => {
        this.getEmployees();
        this.resetForm();
      });
    } else {
      this.employeeService.addEmployee(this.newEmployee).subscribe(() => {
        this.getEmployees();
        this.resetForm();
      });
    }
  }

  editEmployee(emp: Employee) {
    this.newEmployee = { ...emp };
    this.editing = true;
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => this.getEmployees());
  }

  resetForm() {
    this.newEmployee = { id: 0, firstName: '', lastName: '', email: '', position: '' };
    this.editing = false;
  }

  // Filtering logic
  filteredEmployees(): Employee[] {
    const term = this.searchTerm.toLowerCase();
    const filtered = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term)
    );
    return filtered.slice(this.startIndex(), this.endIndex());
  }

  // Pagination helpers
  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  totalPages(): number {
    const totalItems = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;
    return Math.ceil(totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}

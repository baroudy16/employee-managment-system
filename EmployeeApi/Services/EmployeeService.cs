using EmployeeApi.Models;
using System.Collections.Generic;
using System.Xml.Linq;

namespace EmployeeApi.Services
{
    public class EmployeeService
    {
        private readonly List<Employee> _employees = new();
        private int _nextId = 1;

        public List<Employee> GetAll() => _employees;

        public Employee? GetById(int id) => _employees.FirstOrDefault(e => e.Id == id);

        public Employee Create(Employee employee)
        {
            employee.Id = _nextId++;
            _employees.Add(employee);
            return employee;
        }

        public bool Update(Employee employee)
        {
            var index = _employees.FindIndex(e => e.Id == employee.Id);
            if (index == -1) return false;

            _employees[index] = employee;
            return true;
        }

        public bool Delete(int id)
        {
            var employee = GetById(id);
            if (employee == null) return false;

            _employees.Remove(employee);
            return true;
        }
    }
}

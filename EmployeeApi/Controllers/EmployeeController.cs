using EmployeeApi.Models;
using EmployeeApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _service;
        public EmployeeController(EmployeeService service)
        {
            _service = service;
        }
        [HttpGet]
        public ActionResult<List<Employee>> GetAll() => _service.GetAll();

        [HttpGet("{id}")]
        public ActionResult<Employee> GetById(int id)
        {
            var emp = _service.GetById(id);
            if (emp == null) return NotFound();
            return emp;
        }

        [HttpPost]
        public ActionResult<Employee> Create(Employee employee) => _service.Create(employee);

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee employee)
        {
            if (id != employee.Id) return BadRequest();
            if (!_service.Update(employee)) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_service.Delete(id)) return NotFound();
            return NoContent();
        }
    }
}

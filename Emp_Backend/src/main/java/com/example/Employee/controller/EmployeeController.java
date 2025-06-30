package com.example.Employee.controller;

import com.example.Employee.Entity.Employee;
import com.example.Employee.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

    EmployeeService employeeService;
    EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/employee")
    public String addEmployee(@RequestBody Employee employee) {
         employeeService.addEmployee(employee);
         return "successfully created";
    }

    @GetMapping("employee/{id}")
    public ResponseEntity<?> getEmployee(@PathVariable Long id) {
        Employee employee = employeeService.getEmployee(id);
        if(employee == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PatchMapping("employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id,@RequestBody Employee employee) {
        Employee updatedemployee =  employeeService.updateEmployee(id,employee);
        if(updatedemployee == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updatedemployee);
    }

    @DeleteMapping("employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return new ResponseEntity<>("Employee with id " + id + " was deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}






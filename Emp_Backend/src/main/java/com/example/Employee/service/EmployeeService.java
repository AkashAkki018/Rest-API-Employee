package com.example.Employee.service;

import com.example.Employee.Entity.Employee;
import com.example.Employee.repository.Employeerepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final Employeerepository employeerepository;

    public Employee addEmployee(Employee employee) {
       return employeerepository.save(employee);
    }

    public Employee getEmployee(long id) {
        return employeerepository.findById(id).orElse(null);
    }
    public List<Employee> getAllEmployees() {
        return employeerepository.findAll();
    }
    public Employee updateEmployee(Long id,Employee employee) {
        Optional<Employee> optionalEmployee = employeerepository.findById(id);
        if(optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();
            existingEmployee.setName(employee.getName());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setPhone(employee.getPhone());
            return employeerepository.save(existingEmployee);
        }
        return null;

    }

    public void deleteEmployee(long id) {
        if(!employeerepository.existsById(id)) {
            throw new EntityNotFoundException("Employee with id " + id + " not found");
        }
        employeerepository.deleteById(id);
    }




}

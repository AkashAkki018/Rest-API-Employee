package com.example.Employee.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.repository.cdi.Eager;

@Entity
@Data
public class Employee{

    @Id
    private long Id;
    private String Name;
    private String Email;
    private String Phone;

}

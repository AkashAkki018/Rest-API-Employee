import { useEffect, useState } from "react";
import { Button, Container, Table, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchEmp() {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.log("Error occurred:", error.message);
      }
    }
    fetchEmp(); // ✅ call the function
  }, []);


  async function handleDelete(id) {
        try{
        const response = await fetch(`http://localhost:8080/api/employee/${id}`,{
            method : "DELETE",
        });
        if (response.ok) {
            setEmployees((prevEmployees) =>
              prevEmployees.filter((employee) => employee.id !== id)
            );
          }          
        console.log(`Employee with ID ${id} deleted successfully`);
        }
        catch(error)
        {
            console.log("Error occured:",error.message);
        }
    
    }

    const handleUpdate = (id) =>{
        
        try{
        navigate(`/employee/${id}`);
        }
        catch(e){
            console.log(e.message);
        }
    }


  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Employees</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <Button variant="outline-secondary" onClick={() => handleUpdate(employee.id)}>Update</Button>{" "}
                    <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

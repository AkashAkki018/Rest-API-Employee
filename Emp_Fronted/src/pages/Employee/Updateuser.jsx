import { useNavigate, useParams } from 'react-router-dom';
import { Form,Button } from 'react-bootstrap';
import './updateuser.css';
import { useEffect, useState } from 'react';

function Updateuser(){

    const {id} =useParams();
    const navigate =useNavigate();

    const [formdata,setformdata] =useState(
        {
            id:"",
            name:"",
            email:"",
            phone:""
        }
    )
    const handleInputChange = (event) => {
        const { name, value } = event.target; // ✔ correct destructuring
        setformdata((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      useEffect(() =>{
        async function fetchEmployee() {
            try{
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setformdata(data);
            }catch(error)
            {
                console.error("Error occured:",error.message)
            }
            
        }
        fetchEmployee()
      },[id])

      const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/api/employee/${id}`,{
                method : "PATCH",
                headers : {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            });
            const data = await response.json();
            console.log("User Updated",data);
            navigate("/")

        }catch(error){
            console.log("error occured:",error.message);
        }
      }

    return(
        <>
            <div className="center-form">
            <h1>Edit Employee</h1>
                <form onSubmit={handleSubmit}>
                 <Form.Group controlId="formBasicName">
                    <Form.Control
                    type="text"
                    name="id"
                    placeholder="Enter Id"
                    value={formdata.id}
                    onChange={handleInputChange} />
                 </Form.Group>
                 <Form.Group controlId="formBasicName">
                    <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formdata.name}
                    onChange={handleInputChange} />
                 </Form.Group>
                 <Form.Group controlId="formBasicName">
                    <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formdata.email}
                    onChange={handleInputChange} />
                 </Form.Group>
                 <Form.Group controlId="formBasicName">
                    <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={formdata.phone}
                    onChange={handleInputChange} />
                 </Form.Group>

                 <Button variant="primary" type="submit" className="w-100">Edit Employee</Button>
                 

                </form>           
                
            </div>    
        </>
    )
}
export default Updateuser
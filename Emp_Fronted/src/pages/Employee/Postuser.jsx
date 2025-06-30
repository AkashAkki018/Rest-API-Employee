import { useState } from "react";
import "./postuser.css";
import { Form,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



function Postuser()
{
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
      
      
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        console.log(formdata);
        try{
            const response = await fetch("http://localhost:8080/api/employee",{
                method: "POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(formdata)

                });

                const data = await response.text();
              
                navigate("/");

            }
        catch(error)
        {
            console.log("Error occuring :",error.message);
        }
    }
    

    return(
        <>
            <div className="center-form">
            <h1>Post New Employee</h1>
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
                    value={formdata.emaill}
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

                 <Button variant="primary" type="submit" className="w-100">Post Employee</Button>
                 

                </form>           
                
            </div>    
        </>
    );
}
export default Postuser;
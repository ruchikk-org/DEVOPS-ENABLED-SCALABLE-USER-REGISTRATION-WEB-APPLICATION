import { useState } from "react";
import api from "../services/api";
export default Register;


function Register(){

    const [user,setUser] = useState({
        full_name:"",
        email:"",
        phone:"",
        password:""
    });


    const handleChange=(e)=>{

        setUser({
            ...user,
            [e.target.name]:e.target.value
        });

    };


    const register = async(e)=>{

        e.preventDefault();


        try{

            const response = await api.post(
                "/users/register",
                user
            );


            alert("Registration Successful");

            console.log(response.data);


        }
        catch(error){

            alert(
                error.response.data.detail
            );

        }

    };


    return(

<div className="card">

<h2>
Register
</h2>


<form onSubmit={register}>


<input
name="full_name"
placeholder="Full Name"
onChange={handleChange}
/>


<input
name="email"
placeholder="Email"
onChange={handleChange}
/>


<input
name="phone"
placeholder="Phone"
onChange={handleChange}
/>


<input
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
/>


<button>
Register
</button>


</form>


</div>

)
}



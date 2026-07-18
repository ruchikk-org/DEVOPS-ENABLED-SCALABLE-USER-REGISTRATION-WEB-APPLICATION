import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Login(){

    const navigate = useNavigate();


    const [user,setUser] = useState({
        email:"",
        password:""
    });



    const handleChange = (e)=>{

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };



    const login = async(e)=>{

        e.preventDefault();


        try{

            const response = await api.post(
                "/users/login",
                user
            );


            localStorage.setItem(
                "token",
                response.data.access_token
            );


            alert("Login Successful");


            navigate("/dashboard");


        }
        catch(error){

            if(error.response){

                alert(
                    error.response.data.detail
                );

            }
            else{

                alert(
                    "Server not reachable"
                );

            }

        }

    };



 return(

<div className="container">


<div className="card">


<h2>
Login
</h2>


<form onSubmit={login}>


<input
name="email"
placeholder="Email"
onChange={handleChange}
/>


<input
name="password"
type="password"
placeholder="Password"
onChange={handleChange}
/>


<button>
Login
</button>


</form>


</div>


</div>

)

}


export default Login;
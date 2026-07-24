import { useState } from "react";
import api from "../services/api";


const initialState = {
    full_name: "",
    email: "",
    phone: "",
    password: ""
};


function Register() {


    const [user, setUser] = useState(initialState);
    const [message, setMessage] = useState("");



    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };



    const register = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/users/register",
                user
            );


            console.log(response.data);


            // Show success message
            setMessage("Registration Successful");


            // Clear all input fields
            setUser({
                full_name: "",
                email: "",
                phone: "",
                password: ""
            });


        }
        catch(error) {

            setMessage(
                error.response?.data?.detail || 
                "Registration Failed"
            );

        }

    };



    return (

        <div className="card">


            <h2>
                Register
            </h2>


            {
                message && (
                    <p>
                        {message}
                    </p>
                )
            }



            <form onSubmit={register}>


                <input
                    name="full_name"
                    placeholder="Full Name"
                    value={user.full_name}
                    onChange={handleChange}
                    required
                />



                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />



                <input
                    name="phone"
                    placeholder="Phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                />



                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />



                <button type="submit">
                    Register
                </button>


            </form>


        </div>

    );

}


export default Register;
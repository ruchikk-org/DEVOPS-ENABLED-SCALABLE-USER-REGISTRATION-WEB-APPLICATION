import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Dashboard(){

    const [user,setUser] = useState(null);

    const navigate = useNavigate();


    useEffect(()=>{

        getProfile();

    },[]);



    const getProfile = async()=>{

        try{

            const response = await api.get(
                "/users/profile"
            );


            console.log("PROFILE:", response.data);


            setUser(response.data);

        }
        catch(error){

            console.log(
                "PROFILE ERROR:",
                error.response
            );


            localStorage.removeItem("token");

            navigate("/");

        }

    };



    const logout = ()=>{

        localStorage.removeItem("token");

        navigate("/");

    };



    if(!user){

        return (

            <h2 style={{
                textAlign:"center",
                marginTop:"50px"
            }}>
                Loading Dashboard...
            </h2>

        );

    }



    return(

        <div>


            <h1 className="app-title">

                DEVOPS-ENABLED SCALABLE
                <br />

                USER REGISTRATION WEB APPLICATION

            </h1>



            <div className="dashboard">


                <h2>
                    Welcome 👋 {user.full_name}
                </h2>



                <div className="info">


                    <p>
                        <strong>Name:</strong>{" "}
                        {user.full_name}
                    </p>


                    <p>
                        <strong>Email:</strong>{" "}
                        {user.email}
                    </p>


                    <p>
                        <strong>Phone:</strong>{" "}
                        {user.phone}
                    </p>


                </div>



                <button
                    className="logout"
                    onClick={logout}
                >

                    Logout

                </button>


            </div>


        </div>

    );

}


export default Dashboard;
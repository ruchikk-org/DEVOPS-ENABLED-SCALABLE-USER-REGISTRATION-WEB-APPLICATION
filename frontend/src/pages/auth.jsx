import { useState } from "react";
import Register from "./Register";
import Login from "./Login";


function Auth(){

    const [showLogin,setShowLogin] = useState(false);


    return(

        <div className="auth-page">


            <h1 className="app-title">
                DEVOPS-ENABLED SCALABLE
                <br/>
                USER REGISTRATION WEB APPLICATION
            </h1>



            <div className="auth-card">


                <div className="tabs">


                    <button
                    className={!showLogin ? "active-tab" : ""}
                    onClick={()=>setShowLogin(false)}
                    >

                        Register

                    </button>



                    <button
                    className={showLogin ? "active-tab" : ""}
                    onClick={()=>setShowLogin(true)}
                    >

                        Login

                    </button>


                </div>



                {
                    showLogin 
                    ?
                    <Login/>
                    :
                    <Register/>
                }


            </div>


        </div>

    )

}


export default Auth;
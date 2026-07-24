import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    // Automatically manage popup dismissal and route redirection
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
                // Redirect user to dashboard only AFTER they see the success message
                if (message === "Login Successful") {
                    navigate("/dashboard");
                }
            }, 2500); // Popup stays visible for 2.5 seconds
            
            return () => clearTimeout(timer);
        }
    }, [showPopup, message, navigate]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const login = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/login", user);

            localStorage.setItem("token", response.data.access_token);

            // Sets message to exactly match the useEffect condition and triggers popup
            setMessage("Login Successful");
            setShowPopup(true);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.detail || "Login Failed");
            } else {
                setMessage("Server not reachable");
            }
            setShowPopup(true);
        }
    };

    return (
        <div className="container" style={{ position: "relative" }}>
            {/* Floating Popup Banner System */}
            {showPopup && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: message === "Login Successful" ? "#1d63ed" : "#f44336",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    zIndex: 1000,
                    fontSize: "14px",
                    fontWeight: "500",
                    textAlign: "center",
                    minWidth: "200px"
                }}>
                    {message}
                </div>
            )}

            <div className="card">
                <h2>Login</h2>

                <form onSubmit={login}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={user.email}
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

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
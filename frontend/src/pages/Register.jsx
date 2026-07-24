import { useState, useEffect } from "react";
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
    const [showPopup, setShowPopup] = useState(false); // Controls popup visibility

    // Automatically hide the popup after 3 seconds
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            return () => clearTimeout(timer); // Cleanup timer if component unmounts
        }
    }, [showPopup]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/register", user);
            console.log(response.data);

            setMessage("Registration Successful");
            setShowPopup(true); // Trigger popup display

            // Clear all input fields
            setUser(initialState);
        } catch (error) {
            setMessage(error.response?.data?.detail || "Registration Failed");
            setShowPopup(true); // Trigger popup for errors too
        }
    };

    return (
        <div className="card" style={{ position: "relative" }}>
            {/* Floating Popup Message */}
            {showPopup && (
                <div style={{
                    position: "fixed",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: message.includes("Successful") ? "#4caf50" : "#f44336",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    zIndex: 1000,
                    fontSize: "14px",
                    fontWeight: "500"
                }}>
                    {message}
                </div>
            )}

            <h2>Register</h2>

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

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
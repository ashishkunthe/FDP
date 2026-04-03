import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function register() {
    // basic email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      return alert("Enter a valid email");
    }

    if (password.length < 8) {
      return alert("Password must be at least 6 characters");
    }

    try {
      const res = await axios.post(`${backendAPI}/auth/register`, {
        username,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Registered successfully");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-87.5 p-6 border rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

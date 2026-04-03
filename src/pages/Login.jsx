import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendAPI = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function login() {
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await axios.post(`${backendAPI}/auth/login`, {
        email,
        password,
      });
      console.log(res);
      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.log(backendAPI);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-87.5 p-6 border rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

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
          onClick={login}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-center mt-4 text-sm">
          Not registered?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

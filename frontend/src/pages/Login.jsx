import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/vendors/login",
        loginData
      );

      console.log(response.data);

      // Save Token
      localStorage.setItem(
        "vendorToken",
        response.data.token
      );

      // Save Vendor Info
      localStorage.setItem(
        "vendorInfo",
        JSON.stringify(response.data.vendor)
      );

      console.log(response.data.message);

      // Redirect To Dashboard
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message || "Login Failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Vendor Login
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleLogin}
          autoComplete="off"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            autoComplete="off"
            className="w-full border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            autoComplete="new-password"
            className="w-full border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center mt-4">
            New Vendor?{" "}

            <Link
              to="/"
              className="text-blue-600 font-semibold"
            >
              Signup
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;
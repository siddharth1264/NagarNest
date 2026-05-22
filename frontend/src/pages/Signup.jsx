import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/vendors/register",
        formData
      );

      alert(response.data.message);

      // Clear Form
      setFormData({
        businessName: "",
        ownerName: "",
        email: "",
        phone: "",
        password: "",
      });

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message || "Registration Failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Vendor Signup
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            className="w-full border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            className="w-full border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            className="w-full border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            className="w-full border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            className="w-full border p-3 rounded-lg outline-none"
            onChange={handleChange}
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register Vendor
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
  
            <Link
                to="/login"
                className="text-blue-600 font-semibold"
            >
                Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Signup;
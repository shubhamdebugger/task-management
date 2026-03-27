import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      if (!form.name || !form.email || !form.password) {
        return setError("All fields are required");
      }

      await API.post("/auth/register", form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      {/* Container */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Start managing your tasks efficiently
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            name="name"
            placeholder="John Doe"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
            focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
            focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
            focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          />
        </div>

        {/* Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium 
          hover:bg-gray-900 transition cursor-pointer disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-black font-medium cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
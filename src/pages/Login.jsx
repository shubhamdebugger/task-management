import { useState } from "react";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      if (!form.email || !form.password){
        return setError("Email and password are required");
      }
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
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
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
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
            placeholder="Enter your password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
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
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}
// AuthPages.jsx
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";


function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
    const location = useLocation();


  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setError("সব ফিল্ড পূরণ করুন।");
      return;
    }

    setLoading(true);
    try {
      // replace with your backend API
     signInUser(email , password).then((res)=>{
      console.log(res.data)
      navigate(from , { replace: true });
     })

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn w-full bg-[#4d6b57] border-[#4d6b57] text-white"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}


export default LoginPage
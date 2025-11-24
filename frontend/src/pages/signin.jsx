import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../config";

const SignInPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "error",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const showAlert = (message, type = "error") => {
    setAlert({ show: true, type, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false });

    const { email, password } = formData;

    try {
      const response = await apiClient.post("/signin", {email, password})

      console.log("response---",response);
      

      // if (!response.ok) {
      //   showAlert(
      //     data.message || data.error || "Invalid email or password.",
      //     "error"
      //   );
      //   setLoading(false);
      //   return;
      // }

      showAlert("Login successful! Redirecting…", "success");

      setTimeout(() => {
        navigate("/dashboard"); // YOUR DASHBOARD ROUTE
      }, 1200);
    } catch (error) {
      showAlert("Server is not reachable. Check backend.", "error");
    } finally {
      setLoading(false);
    }
  };

  const alertClasses = `
    mt-4 rounded-xl border px-4 py-3 text-sm transition-colors 
    ${alert.type === "success"
      ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
      : "border-red-500/60 bg-red-500/10 text-red-200"}
  `;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-x-0 top-[-10%] mx-auto h-[300px] max-w-3xl 
          rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 blur-3xl"
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl 
          bg-slate-900/80 shadow-2xl ring-1 ring-slate-800 backdrop-blur-xl md:flex-row">

          {/* LEFT PANEL */}
          <div className="flex flex-1 flex-col justify-between bg-gradient-to-br 
            from-slate-900 via-slate-950 to-slate-900 px-8 py-10">
            
            <div className="fade-in-up">
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl 
                  bg-emerald-500/10 text-emerald-400">
                  {/* Logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M10 14h10M4 18h10" />
                  </svg>
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                  DineFlow
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Restaurant <span className="text-emerald-400">Admin Login</span>
              </h1>

              <p className="mt-4 max-w-md text-sm text-slate-300">
                Manage your menu, track orders, and communicate with customers
                through one powerful dashboard.
              </p>

              <dl className="mt-8 space-y-4 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center 
                    rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                    ✓
                  </span>
                  <div>
                    <dt className="font-semibold">Real-time Orders</dt>
                    <dd className="text-slate-400">Receive and process orders instantly.</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center 
                    rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                    ✓
                  </span>
                  <div>
                    <dt className="font-semibold">Easy Menu Control</dt>
                    <dd className="text-slate-400">Edit menu anytime with a click.</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center 
                    rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                    ✓
                  </span>
                  <div>
                    <dt className="font-semibold">Mobile App Ready</dt>
                    <dd className="text-slate-400">Works with your customer app.</dd>
                  </div>
                </div>
              </dl>
            </div>

            <p className="mt-8 text-xs text-slate-500">
              Need help?  
              <span className="font-medium text-slate-300"> support@dineflow.app </span>
            </p>
          </div>

          {/* RIGHT PANEL (LOGIN FORM) */}
          <div className="flex w-full flex-1 items-center justify-center bg-slate-900/70 px-6 py-10">
            <div className="w-full max-w-md fade-in-up">
              <h2 className="text-xl font-semibold text-slate-100">
                Welcome back, Chef 👋
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Log in to your dashboard below.
              </p>

              {/* Alerts */}
              {alert.show && (
                <div className={alertClasses}>{alert.message}</div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.94 6.34A2 2 0 0 1 4.82 5h10.36a2 2 0 0 1 1.88 1.34L10 10.58 2.94 6.34Z" />
                        <path d="M18 8.08v5.25A2.67 2.67 0 0 1 15.33 16H4.67A2.67 2.67 0 0 1 2 13.33V8.08l7.47 4.46a1 1 0 0 0 1.06 0L18 8.08Z" />
                      </svg>
                    </span>

                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="owner@yourrestaurant.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 
                        focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/60"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-2.5 pl-3 pr-10 text-sm text-slate-100 placeholder:text-slate-500 
                        focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/60"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-300">
                    <input
                      type="checkbox"
                      id="remember"
                      onChange={handleChange}
                      checked={formData.remember}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Keep me logged in</span>
                  </label>

                  <Link className="text-xs font-medium text-emerald-400 hover:text-emerald-300" to="#">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold 
                    text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 
                    focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in to dashboard"}

                  {loading && (
                    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 0 1 8-8v4l3.5-3.5L12 0v4a8 8 0 0 0-8 8h4Z"
                      ></path>
                    </svg>
                  )}
                </button>

                <p className="text-xs text-slate-500">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-emerald-400 font-medium hover:text-emerald-300">
                    Sign up here
                  </Link>
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignInPage;

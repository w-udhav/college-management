import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Utils/Firebase/auth";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (credentials.email.length > 0 && credentials.password.length > 0) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(credentials.email, credentials.password);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      console.error(err.code);
      const errorCode = err.code;
      if (errorCode === "auth/wrong-password") {
        setError("Wrong password.");
      }
      if (errorCode === "auth/user-not-found") {
        setError("User not found.");
      }
      if (errorCode === "auth/invalid-email") {
        setError("Invalid email.");
      }
      if (errorCode === "auth/too-many-requests") {
        setError("Too many attempts.");
      }
    }
  };

  const { email, password } = credentials;

  return (
    <div className="bg-violet-600 w-full min-h-screen flex justify-center items-center">
      <div className="bg-slate-700 text-white px-5 py-8 rounded-md shadow-xl max-w-[23rem] w-full">
        <h2 className="text-center text-3xl pb-5">EduDesk</h2>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-[12px] font-semibold uppercase"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              className=" outline-none bg-zinc-800 rounded-md px-2 py-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-[12px] font-semibold uppercase"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              className=" outline-none bg-zinc-800 rounded-md px-2 py-1"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex gap-2 text-red-500 text-[12px] font-semibold">
              <div>X</div>
              <div>{error}</div>
            </div>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="text-[15px] rounded-md p-2 bg-purple-600"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

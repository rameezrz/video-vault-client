import { useState } from "react";
import { validateLoginInputs } from "../utils/inputValidation";
import { LoginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser, setAccessToken, setRefreshToken } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const validationError = validateLoginInputs({
      firstName,
      password,
    });

    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    const response = await LoginUser({
      firstName,
      password,
    });

    console.log({ response });

    if (response?.status !== 200) {
      setError(response?.message);
    } else {
      setError("");
      setUser(response?.user);
      setAccessToken(response?.accessToken);
      setRefreshToken(response?.refreshToken);
      navigate("/dashboard");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white min-w-[30%] p-6 rounded shadow-md"
      >
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? `Please wait...` : `Login`}
        </button>
        <p className="mt-3 text-gray-500 text-center">
          Don't have an account ?{" "}
          <Link to="/register">
            <span className="underline">Register here</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

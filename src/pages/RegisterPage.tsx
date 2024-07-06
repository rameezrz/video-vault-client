import { useState } from "react";
import { validateRegistrationInputs } from "../utils/inputValidation";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const validationError = validateRegistrationInputs({
      firstName,
      lastName,
      email,
      mobile,
    });

    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    const response = await registerUser({
      firstName,
      lastName,
      email,
      mobile,
    });

    if (response?.status !== 201) {
      setError(response?.message);
    } else {
      setError("");
      navigate("/login");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        className="bg-white min-w-[30%] p-6 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Register</h2>
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
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? `Please wait...` : `Register`}
        </button>
        <p className="mt-3 text-gray-500 text-center">
          Already have an account ?{" "}
          <Link to="/login">
            <span className="underline">Sign in here</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

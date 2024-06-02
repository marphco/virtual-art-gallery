import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import closeIcon from "../assets/close-icon.svg";

// LoginForm component for user authentication
const LoginForm = ({ handleModalClose, setActiveForm, activeForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      Auth.login(data.login.token);
      handleModalClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <img
        src={closeIcon}
        alt="Close form"
        className="absolute top-2 right-4 w-6 h-6 cursor-pointer"
        onClick={handleModalClose}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full"
      >
        <div className="flex justify-center mt-8 mb-4 gap-4">
          <button
            type="button"
            onClick={() => setActiveForm("login")}
            className={`modal-login-button py-2 w-full ${
              activeForm === "login"
                ? "text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-lg`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setActiveForm("signup")}
            className={`modal-signup-button py-2 w-full ${
              activeForm === "signup"
                ? "bg-white-200 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-lg`}
          >
            Sign Up
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="button w-full py-3 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Login
        </button>
        {error && <p className="mt-4 text-red-500">Error logging in</p>}
      </form>
    </div>
  );
};

export default LoginForm;

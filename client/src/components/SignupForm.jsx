import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import closeIcon from "../assets/close-icon.svg";

// SignupForm component for user registration
const SignupForm = ({ handleModalClose, setActiveForm, activeForm }) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
      handleModalClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative">
      <img
        src={closeIcon}
        alt="Close form"
        className="absolute top-2 right-4 w-6 h-6 cursor-pointer"
        onClick={handleModalClose}
      />{" "}
      <form
        onSubmit={handleFormSubmit}
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
                ? "bg-white-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-lg`}
          >
            Sign Up
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formState.username}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
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
            value={formState.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="button w-full py-3 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          Sign Up
        </button>
        {data && (
          <p className="mt-4 text-green-500">
            Success! You may now head{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              back to the homepage.
            </Link>
          </p>
        )}
        {error && <p className="mt-4 text-red-500">Error signing up</p>}
      </form>
    </div>
  );
};

export default SignupForm;

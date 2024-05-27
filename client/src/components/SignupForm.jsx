import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = ({ handleModalClose, setActiveForm, activeForm }) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
      <button className="absolute top-2 right-2 text-xl font-bold" onClick={handleModalClose}>×</button>
      <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex justify-center mb-4 gap-4">
          <button
            type="button"
            onClick={() => setActiveForm('login')}
            className={`w-3/4 py-2 ${activeForm === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setActiveForm('signup')}
            className={`w-3/4 py-2 ${activeForm === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg`}
          >
            Sign Up
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
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
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Sign Up</button>
        {data && (
          <p className="mt-4 text-green-500">
            Success! You may now head{" "}
            <Link to="/" className="text-blue-500 hover:underline">back to the homepage.</Link>
          </p>
        )}
        {error && <p className="mt-4 text-red-500">Error signing up</p>}
      </form>
    </div>
  );
};

export default SignupForm;

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = ({ handleModalClose, setActiveForm, activeForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
      <button className="absolute top-2 right-2 text-xl font-bold" onClick={handleModalClose}>×</button>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full">
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
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</button>
        {error && <p className="mt-4 text-red-500">Error logging in</p>}
      </form>
    </div>
  );
};

export default LoginForm;

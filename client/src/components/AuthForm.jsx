import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginUser, { error: loginError }] = useMutation(LOGIN_USER);
  const [addUser, { error: signupError, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const { data } = await loginUser({
          variables: { email: formState.email, password: formState.password },
        });

        Auth.login(data.login.token);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });

        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
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
              required={!isLogin}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        )}

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
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {isLogin && loginError && (
          <p className="mt-4 text-red-500">{loginError.message}</p>
        )}
        {!isLogin && signupError && (
          <p className="mt-4 text-red-500">
            {signupError.message === "Username already exists. Please choose another one."
              ? "Username already exists. Please choose another one."
              : signupError.message}
          </p>
        )}
        {data && !isLogin && (
          <p className="mt-4 text-green-500">
            Success! You may now head{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              back to the homepage.
            </Link>
          </p>
        )}

        <div className="mt-4">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

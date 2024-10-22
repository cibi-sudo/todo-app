import { useState } from "react";
import axios from "axios";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const endpoint = isSignUp ? "/signup" : "/signin";
    axios
      .post(`http://localhost:3000/api/v1/user${endpoint}`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const switchForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    (!isSignUp || (formData.firstName && formData.lastName));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-purple-700">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Last Name"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email"
            />
          </div>

          <div className="relative mb-6">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-4 text-purple-500 hover:text-purple-700"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>

          <button
            disabled={!isFormValid}
            className="w-full py-2 text-white transition duration-300 bg-purple-500 rounded-md hover:bg-purple-600"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={switchForm}
              className="font-semibold text-purple-500 hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

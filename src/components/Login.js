import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile_image from "../image/ShivamImagePS.jpg";
import { url } from "../config.js";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [isLogin, setIsLogin] = useState(false);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    const response = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      setIsLogin(false);
      window.location.reload();
    } else {
      navigate("/login");
      setIsLogin(false);
      alert("Invalid Credentials");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="flex  bg-white p-3 mx-20 my-5 rounded-3xl">
      <div className="flex flex-col  bg-slate-200 p-6 mr-3 rounded-md max-w-lg max-md:hidden justify-between ">
        <h1 className="text-3xl font-bold pt-5 md:pt-20">
          Let us help you run your business
        </h1>
        <p className="font-serif text-slate-400">
          "From virtual meetings to cherished moments – video calls that
          matter."
        </p>
        <div className="flex flex-col justify-center rounded-3xl bg-slate-700 text-slate-300 p-3 ">
          <p className="px-3 pt-3">
            A versatile Full Stack Developer and Software Engineer with a
            passion for innovation. Proficient in diverse technologies,
            problem-solving, and collaborative teamwork. Committed to delivering
            high-quality solutions and staying current with industry trends.
          </p>

          <div className="flex pt-5">
            <img
              src={Profile_image}
              className="w-10 rounded-full"
              alt="Profile Pic"
            />
            <div className="flex flex-col ml-2">
              <h1>Shivam Goswami</h1>
              <h6 className="text-slate-400 text-sm font-thin">
                Web Developer
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center  pt-7">
        <div className="flex flex-col p-5">
          <h1 className="font-bold  text-3xl">Get started</h1>
          <h4 className="font-light text-slate-400 text-lg my-2 mb-5">
            Login to start
          </h4>
          <form onSubmit={handleOnSubmit} method="POST">
            <div className="my-5 flex flex-col">
              <label htmlFor="InputEmail" className="mb-2 text-slate-400">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                className=" border border-neutral-300 rounded-sm p-2"
                id="InputEmail"
                aria-describedby="emailHelp"
                required
              />
              <div
                id="emailHelp"
                className="text-slate-400 text-md font-extralight"
              >
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3  flex flex-col relative">
              <label
                htmlFor="exampleInputPassword1"
                className="mb-2 text-slate-400"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={onChange}
                className="border border-neutral-300 rounded-sm p-2  pr-10" // Add some right padding for the eye icon
                id="exampleInputPassword1"
                minLength={5}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute text-gray-400 top-8 inset-y-0 right-2 flex items-center focus:outline-none"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>

            <div className="flex justify-center items-center pt-10 ">
              {!isLogin ? (
                <button
                  type="submit"
                  className="hover:bg-blue-400 shadow-md bg-blue-500 text-white w-96 p-2 font-bold text-lg rounded-md "
                >
                  Log In
                </button>
              ) : (
                <button
                type="button"
                className="hover:bg-blue-400 flex justify-center  shadow-md bg-blue-500 text-white w-96 p-2 font-bold text-lg rounded-md"
                disabled
              > 
                <div className="animate-spin mr-3">

                <i className="fas fa-spinner  fa-spin"></i> 
                </div>
                Please wait...
              </button>
              )}
            </div>
          </form>
          <div className="flex justify-center p-3 relative top-32">
            <span>Not a member?</span>
            <Link
              to="/createUser"
              // style={{ textDecoration: "none" }}
              className="hover:bg-blue-200 text-blue-500 font-medium rounded-full px-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

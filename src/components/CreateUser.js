import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pic from "../image/icons8-user-80.png";

const CreateUser = () => {
  const nevigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const host = "http://localhost:8080";
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    //save the authtoken and redirect
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      nevigate("/");
      window.location.reload();
    } else {
      if (json.error) alert(json.error);
      else alert(json.errors[0].msg);
    }
  };

  return (
    <div
      className="flex   bg-white p-3 mx-20 my-5 rounded-3xl"
      
    >
      <div
        className="flex flex-col  bg-slate-200 p-6 mr-3 rounded-md max-w-md max-lg:hidden "
       
      >
        <h1 className="text-3xl font-bold pt-5 mt-20">
          Let us help you run your freelance business
        </h1>
        <p className="pt-5 mb-16 font-serif text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
          commodi voluptas. Eaque, delectus sit veniam in cupiditate explicabo
          quos? Tempore fugiat adipisci. commodi voluptas.
        </p>
        <div className="flex flex-col justify-center   rounded-3xl bg-slate-700 text-slate-300 p-3 relative  top-16 ">
          <p className="px-3 pt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ad
            dolores vero assumenda ipsum? Fugit enim, ipsam harum .
          </p>
          <div className="flex pt-5">
            <img src={pic} className="w-10 rounded-full" alt="Profile Pic" />
            <div className="flex flex-col ml-2">
              <h1>Shivam Goswami</h1>
              <h6 className="text-slate-400 text-sm font-thin">Web Developer</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center  pt-7" >
        <div className="flex flex-col p-5">
          <h1 className="font-bold  text-3xl">Get started</h1>
          <h4 className="font-light text-slate-400 text-lg my-2 mb-5">Create your account now</h4>
          <form onSubmit={handleOnSubmit} method="POST">
            <div className=" my-5 flex flex-col">
              <label htmlFor="name" className="mb-2 text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={credentials.name}
                onChange={onChange}
                className=" border border-neutral-300 rounded-sm p-2"
                id="name"
                aria-describedby="emailHelp"
                minLength={3}
                required
              />
            </div>
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
            <div className="mb-3  flex flex-col">
              <label
                htmlFor="exampleInputPassword1"
                className="mb-2 text-slate-400"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                className=" border border-neutral-300 rounded-sm p-2"
                id="exampleInputPassword1"
                minLength={5}
                required
              />
            </div>
            <div
              className="flex justify-center items-center pt-10 "
              
            >
              <button
                type="submit"
                className="mycolor btnhover w-96 p-2 font-bold text-lg rounded-md "
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex justify-center p-3 relative top-12">
            <span>Already have an account?</span>
            <Link to="/login"  style={{ textDecoration: "none" }} className="myhover text-green-800 font-medium rounded-full px-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

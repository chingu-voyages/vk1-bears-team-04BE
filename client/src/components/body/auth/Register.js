import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const Register = () => {
  const [user, setUser] = useState(initialState);

  const {
    firstName,
    lastName,
    email,
    password,
    cf_password,
    err,
    success,
  } = user;

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
      return setUser({
        ...user,
        err: "Please fill in all fields",
        success: "",
      });
    }

    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: "Invalid Email",
        success: "",
      });
    }

    if (isLength(password)) {
      return setUser({
        ...user,
        err: "Password must be at least 6 character",
        success: "",
      });
    }

    if (!isMatch(password, cf_password)) {
      return setUser({
        ...user,
        err: "Password did not match",
        success: "",
      });
    }
    try {
      const res = await axios.post("/user/register", {
        firstName,
        lastName,
        email,
        password,
      });
      setUser({
        ...user,
        err: "",
        success: res.data.msg,
      });
    } catch (err) {
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2 my-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-20 py-8 rounded-3xl subtle-shadow text-black w-full my-15"
        >
          <h1 className="mb-8 text-3xl text-center font-bold">
            Create Account
          </h1>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <input
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Your First Name"
            id="registerFname"
            autoComplete="off"
            onChange={handleChangeInput}
          />

          <input
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Your Last Name"
            id="registerLname"
            autoComplete="off"
            onChange={handleChangeInput}
          />

          <input
            type="text"
            name="email"
            value={email}
            placeholder="Your Email"
            id="registerEmail"
            autoComplete="off"
            onChange={handleChangeInput}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            id="registerPass"
            onChange={handleChangeInput}
          />

          <input
            type="password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            placeholder="Repeat your Password"
            id="registerRPass"
          />

          <input
            type="checkbox"
            id="terms"
            name="terms"
            value="Terms and Agreement"
            required
          />
          <label className="pl-2" htmlFor="terms">
            I agree to U Rescue Me's{" "}
            <Link to="/terms-of-services" className="underline">
              Terms of Services.
            </Link>
          </label>
          <div className="flex justify-center"><button
            type="submit"
            className="btn btn-primary subtle-shadow w-72 py-3 my-6 font-medium tracking-widest text-white focus:outline-none hover:bg-gray-900 hover:shadow-none"
          >
            {" "}
            Sign Up
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

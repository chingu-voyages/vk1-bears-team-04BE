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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
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
    <div>
      <h2>Register</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            id="firstName"
            value={firstName}
            name="firstName"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            id="lastName"
            value={lastName}
            name="lastName"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Email Address"
            id="email"
            value={email}
            name="email"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            name="password"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <label htmlFor="cf_password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="cf_password"
            value={cf_password}
            name="cf_password"
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>

      <p>
        Already an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;

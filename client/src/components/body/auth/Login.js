import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const { email, password, err, success } = user;

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({
        ...user,
        err: "",
        success: res.data.msg,
      });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
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
    <>
      <div className="flex flex-col my-32">
        <div className="container bg-white max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="px-20 py-8 rounded-3xl subtle-shadow text-black w-full my-15 text-center">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-8 text-3xl font-bold text-center">Sign In</h1>
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}

              <input
                type="text"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={handleChangeInput}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChangeInput}
                className=""
              />

              <button
                type="submit"
                className="btn btn-primary subtle-shadow w-full py-3 my-6 font-medium tracking-widest text-white focus:outline-none hover:bg-gray-900 hover:shadow-none"
              >
                Login
              </button>
              <p className="text-left">
                <Link to="forgot_password" className="font-medium underline">
                  Forgot your Password?
                </Link>
              </p>
              <p className="text-center font-bold uppercase mt-6">or</p>
              <button className="btn w-full mt-0 subtle-shadow gap-2">
                Sign up with Google
              </button>
              <button className="btn w-full subtle-shadow text-white bg-blue-900">
                Sign up with Facebook
              </button>
              <p className="text-center mt-4">
                Don't have an account yet?&nbsp;
                <Link to="/register" className="font-bold underline">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

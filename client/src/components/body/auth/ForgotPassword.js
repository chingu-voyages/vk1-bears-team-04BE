import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  email: "",
  err: "",
  success: "",
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email)) {
      return setData({ ...data, err: "Invalid Email", success: "" });
    }
    try {
      const res = await axios.post("/user/forgot_password", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-col my-32">
        <div className="container bg-white max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="px-20 py-8 rounded-3xl subtle-shadow text-black w-full my-15 text-center">
            <form>
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
              <h1 className="mb-8 text-2xl font-bold normal-case text-center">
                Enter your email address :
              </h1>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChangeInput}
              />
              <button
                onClick={forgotPassword}
                className="btn btn-primary subtle-shadow w-full py-3 my-6 font-medium tracking-widest text-white text-1xl focus:outline-none hover:bg-gray-900 hover:shadow-none"
              >
                Verify Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

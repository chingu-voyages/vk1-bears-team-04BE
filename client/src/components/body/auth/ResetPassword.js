import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password, err, success } = data;

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPassword = async () => {
    if (isLength(password)) {
      return setData({
        ...data,
        err: "Password must be at least 6 character",
        success: "",
      });
    }

    if (!isMatch(password, cf_password)) {
      return setData({
        ...data,
        err: "Password did not match",
        success: "",
      });
    }
    try {
      const res = await axios.post(
        "/user/reset_password",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div className="flex flex-col my-32">
        <div className="container bg-white max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="px-20 py-8 rounded-3xl subtle-shadow text-black w-full my-15 text-center">
            <form>
              <h1 className="mb-8 text-2xl font-bold normal-case text-center">
                Reset your Password
              </h1>
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="New Password"
                onChange={handleChangeInput}
              />
              <input
                type="password"
                name="cf_password"
                id="cf_password"
                value={cf_password}
                placeholder="Confirm New Password"
                onChange={handleChangeInput}
              />
              <button
                onClick={handleResetPassword}
                className="btn btn-primary subtle-shadow w-full py-3 my-6 font-medium tracking-widest text-white text-1xl focus:outline-none hover:bg-gray-900 hover:shadow-none"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ResetPassword;

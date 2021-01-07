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

  const handleChangeInput = (e) => {
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
    <div>
      <h2>Forgot Password?</h2>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <label htmlFor="email">Enter your Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeInput}
        />
        <button onClick={forgotPassword}>Verify Email</button>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import swal from "sweetalert";
import { isEmpty } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);


const AccountDashboard = () => {
  const [data, setData] = useState({
    name: "",
    address: "",
    source: "",
    remark: "",
    err: "",
    success: "",
    lat: "",
    lng: "",
  });

  const { name, address, source, remark, err, success, lat, lng } = data;
  const handleChangeInput = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (isEmpty(name) || isEmpty(address))
      return setData({
        ...data,
        err: "Please fill in all fields.",
        success: "",
      });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white px-20 py-8 rounded-3xl subtle-shadow text-black w-full my-15"
      >
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <h2 className="text-left items-center font-semibold">
          Names:
          <div className="sm:w-4/5 grid self-center pt-4">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Ex. Juan Dela Cruz, Maria Dela Cruz..."
              id=""
              autoComplete="off"
              onChange={handleChangeInput}
            />
          </div>
        </h2>

        <h2 className="text-left items-center font-semibold">
          Address:
          <div className="sm:w-4/5 grid self-center pt-4">
            <input
              type="text"
              name="address"
              value={address}
              placeholder="Ex. 1121 Pedro Gil Street, Ermita"
              id=""
              autoComplete="off"
              onChange={handleChangeInput}
            />
          </div>
        </h2>

        <h2 className="text-left items-center font-semibold">
          Source:
          <div className="sm:w-4/5 grid self-center pt-4">
            <input
              type="text"
              name="source"
              value={source}
              placeholder="Name / Social Media Links"
              id=""
              autoComplete="off"
              onChange={handleChangeInput}
            />
          </div>
        </h2>

        <h2 className="text-left items-center font-semibold">
          Remarks:
          <div className="sm:w-4/5 grid self-center pt-4">
            <input
              type="text"
              name="remark"
              value={remark}
              placeholder="Notes / Message"
              id=""
              autoComplete="off"
              onChange={handleChangeInput}
            />
          </div>
        </h2>

        <div className="grid justify-center w-9/12">
          <button
            type="submit"
            className="btn btn-primary subtle-shadow w-40 py-3 my-6 font-medium tracking-widest text-white focus:outline-none hover:bg-gray-900 hover:shadow-none"
          >
            {" "}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDashboard;

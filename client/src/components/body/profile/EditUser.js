import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { HiArrowLeft } from "react-icons/hi";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";

function EditUser() {
  const { id } = useParams();
  const history = useHistory();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector(state => state.users);
  const token = useSelector(state => state.token);

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach(user => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [users, id, history]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheck = () => {
    setSuccess("");
    setErr("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  return (
    // <div>
    //   <div>
    //     <button onClick={() => history.goBack()}>Go Back</button>
    //   </div>

    //   <div className="col-left">
    //     <h2>Edit User</h2>

    //     <div>
    //       <label htmlFor="firstName">First Name</label>
    //       <input
    //         type="text"
    //         name="firstName"
    //         defaultValue={editUser.firstName}
    //         disabled
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="lastName">Name</label>
    //       <input
    //         type="text"
    //         name="lastName"
    //         defaultValue={editUser.lastName}
    //         disabled
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         defaultValue={editUser.email}
    //         disabled
    //       />
    //     </div>

    //     <div className="form-group">
    //       <input
    //         type="checkbox"
    //         id="isAdmin"
    //         checked={checkAdmin}
    //         onChange={handleCheck}
    //       />
    //       <label htmlFor="isAdmin">isAdmin</label>
    //     </div>

    //     <button onClick={handleUpdate}>Update</button>

    //     {err && showErrMsg(err)}
    //     {success && showSuccessMsg(success)}
    //   </div>
    // </div>

    <div className="flex flex-col my-32">
      <div className="container bg-white max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="px-20 py-8 rounded-3xl subtle-shadow text-black w-full my-15 ">
          <h1 className="mb-8 text-3xl font-bold text-center">Edit User</h1>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          <label htmlFor="firstName" className="">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            defaultValue={editUser.firstName}
            disabled
          />
          <label htmlFor="lastName">Name</label>
          <input
            type="text"
            name="lastName"
            defaultValue={editUser.lastName}
            disabled
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
          <label htmlFor="isAdmin" className="mr-3">
            Admin Privileges
          </label>
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            onChange={handleCheck}
          />

          <button
            type="submit"
            onClick={handleUpdate}
            className="btn btn-primary subtle-shadow w-full py-3 my-6 font-medium tracking-widest text-white focus:outline-none hover:bg-gray-900 hover:shadow-none"
          >
            Update
          </button>
          <button
            onClick={() => history.goBack()}
            className="btn btn-primary w-36 mt-3 text-white inline-flex justify-center items-center gap-2"
          >
            <HiArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../../../redux/actions/userAction";

import { HiTrash, HiPencil } from "react-icons/hi";
import { IconContext } from "react-icons";
const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const Profile = () => {
  const auth = useSelector(state => state.auth);
  const token = useSelector(state => state.token);

  const users = useSelector(state => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { firstName, lastName, password, cf_password, err, success } = data;

  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then(res => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const updateInfo = () => {
    try {
      axios.patch(
        "/user/update",
        {
          firstName: firstName ? firstName : user.firstName,
          lastName: firstName ? lastName : user.lastName,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });

    try {
      axios.post(
        "/user/reset_password",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (firstName) updateInfo();
    if (password) updatePassword();
  };

  const handleDelete = async id => {
    try {
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const userView = () => {
    return (
      <>
        <div className="flex flex-col">
          <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2 my-12">
            <h1 className="mb-8 text-3xl text-center font-bold">
              {isAdmin ? "Admin Profile" : "User Profile"}
            </h1>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={user.firstName}
              placeholder="Your First Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={user.lastName}
              placeholder="Your Last Name"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              placeholder="Your Email"
              disabled
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="cf_password"
              id="cf_password"
              placeholder="Confirm Password"
              value={cf_password}
              onChange={handleChange}
            />

            <em style={{ color: "crimson" }}>
              * If you update your password here, you will not be able to login
              quickly using google and facebook.
            </em>

            <button
              disabled={loading}
              className="btn btn-primary subtle-shadow w-full py-3 my-6 font-medium tracking-widest text-white focus:outline-none hover:bg-gray-900 hover:shadow-none"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="container  mx-auto flex-1 flex flex-col   items-center justify-center px-2 my-2 text-left ">
            <h1 className="mb-8 text-3xl text-center font-bold">
              {isAdmin ? "Users" : "Welcome User"}
            </h1>
          </div>
        </div>
        <div class="flex flex-col items-center mb-10">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 container">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email Address
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email Address
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user._id} className="mx-5">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="text-sm text-gray-900">{user._id}</div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {user.firstName}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {user.lastName}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">
                            {" "}
                            {user.role === 1 ? <h5>Admin</h5> : <h5>User</h5>}
                          </div>
                        </td>

                        <td class="py-4 flex flex-row  whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/edit_user/${user._id}`} className="mx-5">
                            <h5>
                              <IconContext.Provider
                                value={{ color: "black", size: "20px" }}
                              >
                                <HiPencil />
                              </IconContext.Provider>
                            </h5>
                          </Link>
                          <button onClick={() => handleDelete(user._id)}>
                            <IconContext.Provider
                              value={{ color: "black", size: "20px" }}
                            >
                              <HiTrash />
                            </IconContext.Provider>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isAdmin ? (
        userView()
      ) : (
        <div className="flex flex-col">
          <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2 my-12">
            <h1 className="mb-8 text-3xl text-center font-bold">
              {isAdmin ? "Admin Profile" : "User Profile"}
            </h1>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={user.firstName}
              placeholder="Your First Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={user.lastName}
              placeholder="Your Last Name"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              placeholder="Your Email"
              disabled
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="cf_password"
              id="cf_password"
              placeholder="Confirm Password"
              value={cf_password}
              onChange={handleChange}
            />

            <em style={{ color: "crimson" }}>
              * If you update your password here, you will not be able to login
              quickly using google and facebook.
            </em>

            <button
              disabled={loading}
              className="btn btn-primary subtle-shadow w-full py-3 my-6 font-medium tracking-widest text-white focus:outline-none hover:bg-gray-900 hover:shadow-none"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

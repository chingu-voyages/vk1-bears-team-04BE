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

const initialState = {
  firstName: "",
  lastName: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;
  const [data, setData] = useState(initialState);
  const { firstName, lastName, password, cf_password, err, success } = data;

  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  const handleChange = (e) => {
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

  const handleDelete = async (id) => {
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

  return (
    <div>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading.....</h3>}
      </div>
      <div>
        <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            defaultValue={user.firstName}
            placeholder="Your First Name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            defaultValue={user.lastName}
            placeholder="Your Last Name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={user.email}
            placeholder="Your Email"
            disabled
          />
        </div>

        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="cf_password">Confirm New Password</label>
          <input
            type="password"
            name="cf_password"
            id="cf_password"
            placeholder="Confirm Password"
            value={cf_password}
            onChange={handleChange}
          />
        </div>

        <div>
          <em style={{ color: "crimson" }}>
            * If you update your password here, you will not be able to login
            quickly using google and facebook.
          </em>
        </div>
        <button disabled={loading} onClick={handleUpdate}>
          Update
        </button>
      </div>

      <div className="col-right">
        <h2>{isAdmin ? "Users" : "Welcome User"}</h2>

        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role === 1 ? <h5>Admin</h5> : <h5>User</h5>}</td>
                  <td>
                    <Link to={`/edit_user/${user._id}`}>
                      <h5>Edit</h5>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user._id)}>
                      "Remove"
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const { authUser, loggedInUser } = useAuthContext();

  const [editData, setEditData] = useState({
    username: "",
    email: "",
    phone_no: "",
    password: "",
    profile_url: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      const user = res.data.find((user) => user.username === authUser);
      const { username, email, phone_no, password, profile_url } = user;
      setEditData((preData) => ({
        ...preData,
        username,
        email,
        phone_no,
        password,
        profile_url,
      }));
    });
  }, [authUser]);

  const handleEditData = (e) => {
    const { name, value } = e.target;
    setEditData((preData) => ({ ...preData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/users/${loggedInUser.id}`, {
      ...editData,
    });
    navigate("/");
  };

  return (
    <div className="">
      <form
        className="space-y-4 px-3"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-2">
          <img
            src={loggedInUser.profile_url}
            alt=""
            className="rounded-full w-20 h-20"
          />
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold">{authUser}</h2>
            <button
              type="button"
              className="btn"
              onClick={() => navigate("/account-setting/user-profile")}
            >
              View Profile
            </button>
          </div>
        </div>
        {/* username field */}
        <div>
          <label htmlFor="username" className="font-semibold block">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={editData.username}
            onChange={handleEditData}
            className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
          />
        </div>
        {/* email field */}
        <div>
          <label htmlFor="email" className="font-semibold block">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={editData.email}
            onChange={handleEditData}
            className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
          />
        </div>
        {/* phone_no field  */}
        <div>
          <label htmlFor="phone_no" className="font-semibold block">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_no"
            id="phone_no"
            value={editData.phone_no}
            onChange={handleEditData}
            className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
          />
        </div>
        {/* profile URL field  */}
        <div>
          <label htmlFor="profile_url" className="font-semibold block">
            Profile URL
          </label>
          <input
            type="text"
            name="profile_url"
            id="profile_url"
            value={editData.profile_url}
            onChange={handleEditData}
            className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

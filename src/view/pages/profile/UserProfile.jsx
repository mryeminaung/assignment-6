import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const { loggedInUser } = useAuthContext();
  const navigate = useNavigate();

  const [activePosts, setActivePosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      const posts = res.data.filter((post) => post.userId === loggedInUser.id);
      setActivePosts(posts);
    });
  }, []);

  return (
    <div className="mt-3 mb-10">
      <h2 className="text-center text-3xl font-bold mb-3">User Profile</h2>
      <div className="border-2 p-3 flex flex-col items-center lg:items-start lg:flex-row gap-x-3 h-screen">
        <div className="w-full lg:w-3/6 p-3">
          <div className="flex border-2 rounded-lg p-3 justify-center items-center gap-x-3">
            <img
              src={loggedInUser.profile_url}
              alt={loggedInUser.username}
              className="rounded-full w-60 h-60"
            />
            <div className="flex flex-col gap-y-4">
              <h3 className="font-bold text-3xl">{loggedInUser.username}</h3>
              <button
                className="btn"
                onClick={() => navigate("/account-setting/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-3/6 p-3 w-full">
          <div className="border-2 rounded-lg p-3">
            <h3 className="font-bold text-2xl">Posts</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

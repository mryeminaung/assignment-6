import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser, loggedInUser } = useAuthContext();
  const [showOption, setShowOption] = useState(false);

  return (
    <div className="bg-slate-100">
      <nav className="container px-5 mx-auto py-3 flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-semibold -tracking-tighter">
            <Link to="/">Assignment Six</Link>
          </h1>
        </header>
        <div className="space-x-3 font-bold">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">All Posts</NavLink>
        </div>
        <div className="flex items-center space-x-2">
          {authUser ? (
            <>
              <div className="flex items-center relative px-16">
                <div
                  className="flex items-center gap-x-2 cursor-pointer"
                  onClick={() => setShowOption((preValue) => !preValue)}
                >
                  <img
                    src={loggedInUser.profile_url}
                    alt={loggedInUser.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <h2 className="capitalize">{loggedInUser.username}</h2>
                </div>
                <div
                  className={`${
                    showOption ? "block" : "hidden"
                  } absolute top-[52px]`}
                >
                  <NavLink
                    className="btn"
                    onClick={() => setShowOption(false)}
                    to="/create-post"
                  >
                    New Post
                  </NavLink>
                  <br />
                  <NavLink
                    className="btn"
                    onClick={() => setShowOption(false)}
                    to="/account-setting/edit-profile"
                  >
                    Account Setting
                  </NavLink>
                  <button
                    onClick={() => {
                      setAuthUser("");
                      setShowOption(false);
                      navigate("/");
                    }}
                    className="btn"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/register" className="btn">
                Register
              </NavLink>
              <NavLink to="/login" className="btn">
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

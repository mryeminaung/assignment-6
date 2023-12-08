import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";

const LoginAlertCard = ({ setShowAlert }) => {
  const { authUser } = useAuthContext();

  return (
    <div className="absolute h-screen items-center justify-center flex w-full z-[999px]">
      <div className="box p-5 w-[50%] rounded-md bg-white space-y-2">
        <div className="flex items-center justify-end">
          <button className="btn" onClick={() => setShowAlert(false)}>
            Close
          </button>
        </div>
        <h2 className="text-3xl font-bold">
          You aren't an authorized user to view this post.
        </h2>
        <p className="text-xl">
          If you don't have an account,
          <NavLink to="/login" className="ms-2 btn">
            Login here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginAlertCard;

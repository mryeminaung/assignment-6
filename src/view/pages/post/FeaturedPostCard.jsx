import { useNavigate } from "react-router-dom";
import thumbNailImg from "./placeholder.webp";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginAlertCard from "../login/LoginAlertCard";

const FeaturedPostCard = ({ post }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const { authUser } = useAuthContext();

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${post.userId}`).then((res) => {
      setUser(res.data);
    });
  }, [post]);

  return (
    <>
      {showAlert && <LoginAlertCard setShowAlert={setShowAlert} />}
      <div
        className="box rounded-md hover:cursor-pointer overflow-hidden"
        onClick={() => {
          if (authUser) {
            navigate(`featured-posts/${post.id}`, { state: { post, user } });
          } else {
            setShowAlert(true);
          }
        }}
      >
        <img
          src={post.image_url ? post.image_url : thumbNailImg}
          alt={post.title}
          className="rounded-b-sm w-full h-[250px] object-fit"
        />
        <div className="p-3 flex items-center gap-x-2">
          <img
            src={user.profile_url}
            alt=""
            className="rounded-full h-12 w-12"
          />
          <div>
            <h3 className="font-bold capitalize">{user.username}</h3>
            <h3>{post.created_at}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedPostCard;

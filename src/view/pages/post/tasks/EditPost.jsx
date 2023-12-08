import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const EditPost = ({ post, setEditMode, setEditPost, user }) => {
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    title: post.title,
    body: post.body,
    image_url: post.image_url,
    userId: post.userId,
  });

  const handleEditData = (e) => {
    const { name, value } = e.target;
    setEditData((preData) => ({ ...preData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3000/posts/${post.id}`, {
        ...editData,
        created_at: moment().format(),
      })
      .then((res) =>
        navigate(`/posts/post-detail/${post.id}`, {
          state: { post: res.data, user },
        }),
      );
    setEditMode(false);
    setEditPost(false);
  };

  return (
    <div className="absolute h-screen items-center flex w-full z-[999px]">
      <form
        className="box py-5 px-10 w-[550px] mx-auto rounded-md bg-white space-y-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h3 className="font-bold text-2xl text-center">Edit Post</h3>
        {/* title field */}
        <div>
          <label htmlFor="title" className="font-semibold block">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={editData.title}
            onChange={handleEditData}
            className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
          />
        </div>
        {/* body field */}
        <div>
          <label htmlFor="body" className="font-semibold block">
            Content
          </label>
          <input
            type="text"
            name="body"
            id="body"
            value={editData.body}
            onChange={handleEditData}
            className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
          />
        </div>
        {/* image url field */}
        <div>
          <label htmlFor="image_url" className="font-semibold block">
            Image URL
          </label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            value={editData.image_url}
            onChange={handleEditData}
            className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex items-center justify-between gap-x-3">
          <button
            type="button"
            className="btn w-full"
            onClick={() => {
              setEditMode(false);
              setEditPost(false);
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn w-full">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;

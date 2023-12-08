import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import moment from "moment";

const CreatePost = () => {
	const navigate = useNavigate();
	const { loggedInUser } = useAuthContext();
	const [postData, setPostData] = useState({ title: "", body: "", image_url: "" });

	const handlePostData = (e) => {
		const { name, value } = e.target;
		setPostData((prePostData) => ({ ...prePostData, [name]: value }));
	};

	const handlePostSubmit = (e) => {
		e.preventDefault();
		const { title, body, image_url } = postData;
		if (title && body && image_url) {
			axios.post("http://localhost:3000/posts", {
				userId: loggedInUser.id,
				...postData,
				category: "IT",
				created_at: moment().format(),
			});
			navigate("/posts");
		}
	};

	return (
		<div className="flex items-center justify-center mt-10">
			<form
				className="w-[550px] border border-red-500 rounded-md p-5 py-7 space-y-4"
				onSubmit={handlePostSubmit}
				autoComplete="off"
			>
				<h3 className="font-bold text-2xl text-center">Create Post</h3>
				<div>
					<label htmlFor="title" className="font-semibold block">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						value={postData.title}
						onChange={handlePostData}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				<div>
					<label htmlFor="body" className="font-semibold block">
						Content
					</label>
					<input
						type="text"
						name="body"
						id="body"
						value={postData.body}
						onChange={handlePostData}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				<div>
					<label htmlFor="image_url" className="font-semibold block">
						Image URL
					</label>
					<input
						type="url"
						name="image_url"
						id="image_url"
						value={postData.image_url}
						onChange={handlePostData}
						className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
					/>
				</div>
				<div className="flex items-center justify-between gap-x-5 py-2">
					<button
						type="button"
						onClick={() => navigate("/posts")}
						className="bg-black w-full block mx-auto text-white px-2 py-2 rounded-md"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="bg-black w-full block mx-auto text-white px-2 py-2 rounded-md"
					>
						Create Post
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreatePost;

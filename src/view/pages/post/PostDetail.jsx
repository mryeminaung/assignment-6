import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditPost from "./tasks/EditPost";

const PostDetail = () => {
	const { loggedInUser } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();
	const post = location.state.post;
	const user = location.state.user;

	const [editMode, setEditMode] = useState(false);
	const [totalComments, setTotalComments] = useState([]);
	const [comment, setComment] = useState("");

	const getComments = () => {
		axios.get("http://localhost:3000/comments").then((res) => {
			const comments = res.data.filter((comment) => comment.postId === post.id);
			setTotalComments(comments);
		});
	};

	useEffect(() => {
		getComments();
	}, [post]);

	const handlePostDelete = () => {
		if (loggedInUser.id === post.userId) {
			axios.delete(`http://localhost:3000/posts/${post.id}`);
			navigate("/posts");
		} else {
			alert("You don't have permission to delete");
		}
	};

	const handleCommentDelete = (comment) => {
		if (loggedInUser.id === comment.userId) {
			axios.delete(`http://localhost:3000/comments/${comment.id}`);
			navigate(`/posts/post-detail/${post.id}`, { state: { post, user } });
		}
	};

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handleComment = (e) => {
		e.preventDefault();
		if (comment) {
			axios.post("http://localhost:3000/comments", {
				comment,
				postId: post.id,
				userId: loggedInUser.id,
			});
			getComments();
			navigate(`/posts/post-detail/${post.id}`, { state: { post, user } });
			setComment("");
		}
	};

	return (
		<div className="relative">
			{editMode && <EditPost post={post} user={user} setEditMode={setEditMode} />}
			<div className="rounded-md">
				<div className="flex items-center justify-center">
					<div className="w-[500px] flex pt-2 pb-4 justify-between flex-col gap-1 overflow-hidden rounded-md shadow-md bg-slate-200">
						<div className="px-2 relative">
							<Link to="../.." relative="path" className="btn absolute right-2 ">
								Close
							</Link>
							<div className="flex items-start justify-between mt-10">
								<div className="flex items-center gap-x-2">
									<img src={user.profile_url} alt="" className="rounded-full h-12 w-12" />
									<div>
										<h3 className="font-bold text-xl capitalize">{user.username}</h3>
										<h3>{post.created_at}</h3>
									</div>
								</div>
								{loggedInUser.id === post.userId && (
									<div className="space-x-2">
										<button
											className="text-black text-4xl"
											onClick={() => alert("edit/delete")}
										>
											...
										</button>
										{/* <button className="btn" onClick={() => setEditMode(true)}>
											Edit
										</button>
										<button className="btn" onClick={handlePostDelete}>
											Delete
										</button> */}
									</div>
								)}
							</div>
							<div className="py-2">
								<h2 className="text-lg font-semibold">{post.title}</h2>
								<p>{post.body}</p>
							</div>
						</div>
						<img
							src={post.image_url}
							alt={post.title}
							className="rounded-xs h-[400px] object-fit w-full"
						/>


						{/* comment section */}
						<div className="my-4">
							<form onSubmit={handleComment}>
								<div className="flex items-center justify-between rounded-lg px-2 py-1">
									<input
										type="text"
										name="comment"
										id="comment"
										value={comment}
										onChange={handleCommentChange}
										placeholder="Write a comment"
										className="w-full focus:outline-none px-2 py-1 rounded-md"
									/>
									<button
										type="submit"
										className="border-2 bg-slate-500 text-white rounded-lg px-2 py-1"
										onClick={handleComment}
									>
										Comment
									</button>
								</div>
							</form>
						</div>
						<div className="px-3">
							<h3 className="text-2xl font-semibold">Comments</h3>
							<ul className="">
								{totalComments &&
									totalComments.length > 0 &&
									totalComments.map((comment) => (
										<li key={comment.id} className="flex items-center">
											<b>{comment.id}</b> : {comment.comment}
											{loggedInUser.id === comment.userId && (
												<button
													className="btn"
													onClick={() => handleCommentDelete(comment)}
												>
													Delete
												</button>
											)}
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;

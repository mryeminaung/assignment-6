import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditPost from "./tasks/EditPost";

const PostDetail = () => {
	const { loggedInUser } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();
	const post = location.state;

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
			navigate(`/posts/post-detail/${post.id}`, { state: post });
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
			navigate(`/posts/post-detail/${post.id}`, { state: post });
			setComment("");
		}
	};

	return (
		<div className="relative">
			{editMode && <EditPost post={post} setEditMode={setEditMode} />}
			<div className="rounded-md">
				<Link to="../.." relative="path" className="btn">
					Back to posts
				</Link>
				<div className="flex items-center justify-center">
					<div className="w-[500px] flex justify-between flex-col gap-1 overflow-hidden  rounded-md shadow-md box py-5">
						<div className="p-2">
							<div className="flex items-center justify-between">
								<h4 className="font-semibold text-xl">{post.title}</h4>
								{loggedInUser.id === post.userId && (
									<div className="space-x-2">
										<button className="btn" onClick={() => setEditMode(true)}>
											Edit
										</button>
										<button className="btn" onClick={handlePostDelete}>
											Delete
										</button>
									</div>
								)}
							</div>
							<p>{post.body}</p>
						</div>
						<img
							src={post.image_url}
							alt={post.title}
							className="rounded-md h-[400px] object-fit w-full"
						/>
						<div className="my-4 px-3">
							<form
								onSubmit={handleComment}
								className="flex items-center justify-between gap-x-3"
							>
								<input
									type="text"
									name="comment"
									id="comment"
									value={comment}
									onChange={handleCommentChange}
									placeholder="Write a comment"
									className="w-full border-b-2 focus:outline-none border-b-red-500 px-2 py-1 rounded-md"
								/>
								<button type="submit" className="btn" onClick={handleComment}>
									Comment
								</button>
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

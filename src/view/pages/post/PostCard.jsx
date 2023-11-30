import { useNavigate } from "react-router-dom";
import thumbNailImg from "./placeholder.webp";

const PostCard = ({ post }) => {
	const navigate = useNavigate();

	return (
		<div
			className="box rounded-md hover:cursor-pointer overflow-hidden"
			onClick={() => navigate(`post-detail/${post.id}`, { state: post })}
		>
			<img
				src={post.image_url ? post.image_url : thumbNailImg}
				alt={post.title}
				className="rounded-b-sm w-full h-[250px] object-fit"
			/>
			<div className="p-3">
				<h2 className="text-xl font-semibold">{post.title}</h2>
				<h3>{post.body}</h3>
			</div>
		</div>
	);
};

export default PostCard;

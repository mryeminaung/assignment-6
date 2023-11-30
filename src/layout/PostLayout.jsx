import { Outlet } from "react-router-dom";

const PostLayout = () => {
	return (
		<div className="my-10">
			<Outlet />
		</div>
	);
};

export default PostLayout;

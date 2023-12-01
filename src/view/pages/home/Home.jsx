import { useEffect } from "react";
import Posts from "../post/Posts";
import FeaturedPosts from "../post/FeaturedPosts";

const Home = () => {
	useEffect(() => {
		document.title = "Assignment 6";
	}, []);

	return (
		<div className="my-10">
			<FeaturedPosts />
		</div>
	);
};

export default Home;

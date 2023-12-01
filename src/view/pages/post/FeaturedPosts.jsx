import axios from "axios";
import { useEffect, useState } from "react";

const FeaturedPosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3000/posts?_start=1&_end=10").then((res) => {
			// setPosts(res.data);
			console.log(res.data);
		});
	}, []);

	return (
		<>
			<h2 className="font-bold text-2xl">Featured Posts</h2>
		</>
	);
};

export default FeaturedPosts;

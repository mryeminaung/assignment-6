import { useEffect } from "react";

const Home = () => {
	useEffect(() => {
		document.title = "Assignment 6";
	}, []);

	return (
		<div className="flex items-center justify-center">
			<h1 className="text-2xl">Assignment 6</h1>
		</div>
	);
};

export default Home;

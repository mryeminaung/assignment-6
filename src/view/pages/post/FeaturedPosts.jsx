import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedPostCard from "./FeaturedPostCard";

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts?_start=1&_end=11&_sort=created_at")
      .then((res) => {
        setPosts(res.data);
        // console.log(res.data);
      });
  }, []);

  return (
    <>
      <h2 className="font-bold text-2xl mb-4">Featured Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {posts.map((post) => (
          <FeaturedPostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default FeaturedPosts;

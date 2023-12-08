import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="relative">
      <h2 className="font-bold text-2xl mb-4">All Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="">
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis animi
            quae quod corrupti, voluptas optio quam expedita nesciunt
            voluptates, alias praesentium nam ipsum eligendi excepturi eius nisi
            dicta quisquam distinctio.
          </p>
          <Link
            to="/search"
            className="text-xs text-[#4285F4] sm:text-sm font-bold hover:underline"
          >
            View all posts
          </Link>
        </div>
        <div className="p-4 bg-yellow-100">
          <CallToAction />
        </div>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">
                Recent Posts
              </h2>
              <div className="flex flex-wrap gap-4 mx-auto items-center pl-3">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to="/search"
                className="text-lg text-center hover:underline text-teal-500"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

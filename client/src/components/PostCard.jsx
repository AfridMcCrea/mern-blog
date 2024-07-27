import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const words = post.content.split(" ");
  return (
    <div className="group relative w-[360px] h-[350px] overflow-hidden border sm:w-[360px] shadow-lg hover:border-2 transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[220px] w-[360px] object-cover group-hover:h-[180px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col  gap-1">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="text-sm italic">{`${words
          .slice(10, 15)
          .join(" ")}...`}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border  border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Button, TextInput, Textarea } from "flowbite-react";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError("Please comment between 200 words .");
      return;
    }
    try {
      const res = await fetch(`/api/comment/createcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
      console.log(error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      <div className="">
        {currentUser ? (
          <div className="flex items-center gap-1 my-5 text-gray-500 text-sm ">
            <p>Signed in as:</p>
            <img
              className="w-5 h-5 object-cover rounded-full"
              src={currentUser.profilePicture}
              alt=""
            />
            <Link
              to="/dashboard?tab=profile"
              className="text-sm text-cyan-600 hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
        ) : (
          <div className="text-sm text-teal-500 my-5 flex gap-1">
            You must be signed in to comment.
            <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
              Sign in
            </Link>
          </div>
        )}
        {currentUser && (
          <>
            <form
              onSubmit={handleSubmit}
              className="border border-teal-500 rounded-md p-3"
            >
              <Textarea
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Add a comment..."
                rows="3"
                maxLength="200"
                value={comment}
              />
              <div className="flex justify-between mt-4 items-center">
                <p className="text-gray-500 text-xs italic">
                  {200 - comment.length} characters remaing
                </p>
                <Button type="submit" gradientDuoTone="purpleToBlue" outline>
                  Submit
                </Button>
              </div>
            </form>
            {commentError && <Alert color='failure'>{commentError}</Alert>}
          </>
        )}
      </div>
    </div>
  );
}

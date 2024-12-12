import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { formatDate } from "../../../libs/dateUtils";

export default function Comment( { commentData,  pageId} ) {
    const [comments, setComments] = useState([]); // To store comments
    const [commentText, setCommentText] = useState(""); // To store the input comment text
    const [loading, setLoading] = useState(false); // For loading states
    const { userId } = useUser(); // Get user_id from the context
    const [fetchComment, setFetchComment] = useState(false);
    
    const toggleComments = () => {
        setFetchComment((prev) => !prev); // Flip the current boolean value
    };


    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            const response = await fetch("/api/appt/comments/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                        text: commentText, 
                        userId: userId,
                        pageId: pageId
                    }),
            });

            if (response.ok) {
                const newComment = await response.json();
                setComments((prevComments) => [...prevComments, newComment]);
                setCommentText(""); // Clear the input field
                toggleComments()
            } else {
                console.error("Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };



    
    useEffect(() => {
        const fetchComments = async () => {
            try {
           
                const response = await fetch(`/api/appt/comments/get/${pageId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                } else {
                    console.error("Failed to fetch comments");
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                
            }
        };


            fetchComments();
        

    }, [fetchComment]);


    // Fetch comments on component mount
    useEffect(() => {
        setComments(commentData)
    }, [fetchComment]);


    
    return (
        <div className="w-full p-4 rounded-md mx-auto bg-white">
            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="mb-4">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-2 border rounded resize-none text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    rows="4"
                />
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!commentText.trim()}
                    >
                        Post Comment
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500">Loading comments...</p>
                ) : comments.length > 0 ? (
                    comments.map((comment) => (

                        <div className="flex w-full gap-3 justify-center" key={comment.id}>
                            <div className="w-11 h-11 bg-blue-500 text-white font-bold rounded-full">
                                 <div className="w-11 h-11 flex items-center justify-center">
                                    {comment.username ? comment.username[0].toUpperCase() : "?"}
                                </div>
                            </div>
                            <div className="p-3 rounded bg-gray-50 w-full">
                                <label className="text-sm font-semibold">{comment.username || "Unknown User"}</label>
                                <p className="text-sm text-gray-800 mt-3">{comment.content}</p>
                                <span className="text-xs text-gray-300">{formatDate(comment.created_at) || "Just now"}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}

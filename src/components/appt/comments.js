import { useState, useRef, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { formatDate } from "../../../libs/dateUtils";
import Link from "next/link";
import { useSocket } from "@/app/context/SocketContext";


import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileAudio, FaFileVideo, FaFileAlt } from "react-icons/fa"; // Add more icons if needed

export default function Comment({ commentData, pageId }) {

    const [comments, setComments] = useState([]); // To store comments
    const [commentText, setCommentText] = useState(""); // To store the input comment text
    const [loading, setLoading] = useState(false); // For loading states
    const [fetchError, setFetchError] = useState(null); // For error handling
    const fileInput = useRef(null); // For file input reference
    const { userData } = useUser(); // Get user_id from the context
    const [fetchComment, setFetchComment] = useState(false);
    const [buttonSubmit, setButtonSubmit] = useState(true);

    // this is for socketio

    const socket = useSocket();

        
    const getFileIcon = (fileName) => {
        const extension = fileName?.split(".").pop().toLowerCase();

        switch (extension) {
            case "pdf":
                return <FaFilePdf className="text-red-500" size={20} />;
            case "doc":
            case "docx":
                return <FaFileWord className="text-blue-500" size={20} />;
            case "xls":
            case "xlsx":
                return <FaFileExcel className="text-green-500" size={20} />;
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
                return <FaFileImage className="text-yellow-500" size={20} />;
            case "mp3":
            case "wav":
                return <FaFileAudio className="text-purple-500" size={20} />;
            case "mp4":
            case "mkv":
            case "avi":
                return <FaFileVideo className="text-indigo-500" size={20} />;
            default:
                return <FaFileAlt className="text-gray-500" size={20} />;
        }
    };


    // Toggle the comments fetching trigger
    const toggleComments = () => {

        setFetchComment((prev) => !prev);
        
    };

    // Handle the submission of a new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        setButtonSubmit(false);
        // Ensure at least text or a file is provided
        const file = fileInput.current?.files[0];
        if (!commentText.trim() && !file) return;
    
        const MAX_FILE_SIZE = 7 * 1024 * 1024; // 2 MB
    
        // Validate file size if a file is selected
        if (file && file.size > MAX_FILE_SIZE) {
            alert("File size exceeds the 7MB limit. Please upload a smaller file.");
            return;
        }
    
        // Prepare form data
        const formData = new FormData();
        formData.append("text", commentText);
        formData.append("pageId", pageId);
        formData.append("userId", userData.user.id);
    
        if (file) {
            formData.append("file", file);
        }
    
        try {
            const response = await fetch("/api/appt/comments/create", {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                setButtonSubmit(true)
                const newComment = await response.json();
                socket.emit('comment', {
                    datas: newComment,
                    pageId: pageId
                } ); 


             
                setComments((prevComments) => [...prevComments, newComment]);
                setCommentText("");
                if (fileInput.current) fileInput.current.value = ""; // Clear file input
                toggleComments();
            } else {
                console.error("Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };
    
    
    // Fetch existing comments when the component mounts or when fetchComment changes
    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            setFetchError(null); // Reset error before fetching
            try {
                const response = await fetch(`/api/appt/comments/get/${pageId}`);
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                } else {
                    throw new Error('Failed to fetch comments');
                }
            } catch (error) {
                setFetchError(error.message); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchComments();

            // Set up the socket listener for real-time updates
        if (socket) {
            socket.on(`page_event_${pageId}`, () => {
                fetchComments();
            });
        }

        // Clean up the socket listener when the component unmounts
        return () => {
            if (socket) {
                socket.off("comment");
            }
        };
    }, [fetchComment, socket]); // Re-fetch when fetchComment changes

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
                <input
                    type="file"
                    ref={fileInput}
                    className="mt-2 block text-sm"
                />
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!commentText.trim() && !fileInput.current?.files[0] || !buttonSubmit}
                    >

                        {
                            (buttonSubmit) ? 'Post Comment' : 'Submitting...'
                        }
                      
                    </button>
                </div>
            </form>

            {/* Error Message */}
            {fetchError && (
                <p className="text-center text-red-500">{fetchError}</p>
            )}

            {/* Loading State */}
            {loading && <p className="text-center text-gray-500">Loading comments...</p>}

            {/* Comments List */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div
                            className="flex w-full gap-3 items-start justify-start p-3"
                            key={comment.id || `comment-${index}`}
                        >
                            {/* Profile Section */}
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center">
                                {comment.username ? comment.username[0].toUpperCase() : "?"}
                            </div>

                            {/* Comment Section */}
                            <div className="flex-grow p-3 rounded bg-gray-50">
                                <label className="text-sm font-semibold block">
                                    {comment.username || "Unknown User"}
                                </label>
                                <p className="text-sm text-gray-800 mt-2">{comment.content}</p>
                                {/* Attachment Section */}
                                {comment.file_name && (
                                    <div className="mt-3 relative group">
                                        <Link
                                            href={comment.file_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm hover:bg-gray-100 transition"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                                                {getFileIcon(comment.file_name)}
                                            </div>
                                            
                                            {/* File Name Section */}
                                            <div className="flex flex-col">
                                                <div className="w-20 truncate ">
                                                    {comment.file_name || "No File"}
                                                </div>
                                                <span className="text-xs text-gray-500">Click to view</span>
                                            </div>
                                        </Link>
                                          {/* Tooltip */}
                                        <div className="absolute left-0 top-full mt-1 hidden w-max rounded bg-gray-800 text-white text-xs px-2 py-1 shadow-lg group-hover:block z-10">
                                            {comment.file_name}
                                        </div>
                                    </div>
                                )}
                                <span className="text-[11px] text-gray-300 block mt-2">
                                    {formatDate(comment.created_at) || "Just now"}
                                </span>
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

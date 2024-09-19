import mongoose, { Schema } from "mongoose";

const PostsSchema = new Schema (
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        attachments: { type: String }  // Adjust this type as needed (e.g., Array, Object)
    },
    {
        timestamps: true
    }
);


const Posts = mongoose.models.Posts || mongoose.model('Posts', PostsSchema);

export default Posts;
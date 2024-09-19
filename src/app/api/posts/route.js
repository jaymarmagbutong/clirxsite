import { NextResponse } from "next/server"
import connectMongoDB from "../../../../libs/mongodb"
import Posts from "@/app/model/posts";

export async function POST(request) {
  try {
    // Parse the incoming request body
    const { title, description, attachments } = await request.json();

    // Validate the required fields
    if (!title || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Ensure the MongoDB connection is established
    await connectMongoDB();

    // Create a new post in the database
    const newPost = await Posts.create({
      title,
      description,
      attachments // Corrected spelling from 'attactments' to 'attachments'
    });

    // Return the newly created post
    return NextResponse.json(newPost, { status: 201 }); // Status 201 for successful creation
  } catch (error) {
    console.error('Error creating post:', error); // Log error details for debugging
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

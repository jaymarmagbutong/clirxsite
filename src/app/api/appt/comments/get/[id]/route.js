import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        // Fetch comments and join with the user table
        const results = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT 
                    comments.id, 
                    comments.user_id, 
                    user.username, 
                    comments.page_id, 
                    comments.content, 
                    comments.created_at,
                     comments.file_link,
                     comments.file_name
                 FROM comments 
                 JOIN user ON comments.user_id = user.id 
                 WHERE comments.page_id = ? 
                 ORDER BY comments.created_at DESC`,
                [id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        return NextResponse.json(results, { status: 200 }); // Status 200 for success
    } catch (error) {
        return NextResponse.json(
            { message: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

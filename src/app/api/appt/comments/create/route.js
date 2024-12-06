import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function POST(request) {
    try {
        const { text, pageId, userId } = await request.json();

        // Validate required fields
        if (!text || !pageId || !userId) {
            return NextResponse.json(
                { message: "Missing required fields." },
                { status: 400 }
            );
        }

        // Insert comment into the database
        const newComment = await new Promise((resolve, reject) => {
            DB.query(
                `INSERT INTO comments (user_id, page_id, content, created_at) VALUES (?, ?, ?, NOW())`,
                [userId, pageId, text],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Fetch the newly inserted comment with its ID
                        resolve({
                            id: results.insertId,
                            user_id: userId,
                            page_id: pageId,
                            content: text,
                            created_at: new Date().toISOString(), // Optional: Set this for frontend display
                        });
                    }
                }
            );
        });

        return NextResponse.json(newComment, { status: 201 }); // Status 201 for successful creation
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

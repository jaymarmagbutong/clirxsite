import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Disable body parsing for this route to handle form data
export const config = {
    api: {
        bodyParser: false, // Disable default body parser
    },
};


export async function POST(request) {
    try {
        // Parse form data
        const formData = await request.formData();

        // Extract text and file data
        const text = formData.get("text");
        const pageId = formData.get("pageId");
        const userId = formData.get("userId");
        const file = formData.get("file"); // The file from the form

        // Validate required fields
        if (!text || !pageId || !userId) {
            return NextResponse.json(
                { message: "Missing required fields." },
                { status: 400 }
            );
        }

        // Variables for file data (default to null if no file)
        let fileLink = null;
        let fileName = null;

        if (file) {

            const formData = new FormData();
            formData.append('file', file);
      
            const res = await fetch(`${process.env.NEXT_PUBLIC_STORAGE_FILE_URL}/api/storage/upload/`, {
                method: 'POST',
                headers:{
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_BEARER_TOKEN}`
                },
                body: formData
            });

            const data = await res.json();

            console.log(data);

            if (res.ok) {
                fileName = data.data.files[0];
                fileLink = `${data.data.baseurl}${data.data.files[0]}`;
            }
        }


        // Insert the comment into the database
        const newComment = await new Promise((resolve, reject) => {
            DB.query(
                `INSERT INTO comments (user_id, page_id, content, file_link, file_name, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
                [userId, pageId, text, fileLink, fileName],
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
                            file_link: fileLink,
                            file_name: fileName,
                            created_at: new Date().toISOString(),
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

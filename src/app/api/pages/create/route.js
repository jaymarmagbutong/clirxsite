import { NextResponse } from "next/server"
import DB from "@/app/api/config/db";
import { createNotification } from "@/app/api/service/notificationService";
import getUserServerInfo from "@/app/libs/getServerUser";

// Helper function to execute SQL queries
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        DB.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


export async function POST(request) {


    const userInfo = await getUserServerInfo(request);
    const user_id = userInfo.id;


    try {
        // Parse the incoming request body
        const { title, description, referenceNumber, category, attachments, userCreatedId, status } = await request.json();

        // Validate the required fields
        if (!title || !description) {
            return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        // Insert the new page into the database
        const result = await query(
            'INSERT INTO pages (title, description, reference_number, category, attachments, user_created, status, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, referenceNumber, category, attachments, userCreatedId, status, 0]
        );


        if (result.affectedRows) {
            const notificationType = "create-page"; // Replace with your type
            const notificationMessage = `[${user_id}] Created Page [${result.insertId}]`;
            const notificationResponse = await createNotification({
                userId: 0,
                userCreated: user_id,
                pageId: result.insertId,
                type: notificationType,
                message: notificationMessage,
            });
        }

        // Return the newly created page with the ID from the result
        return NextResponse.json(
            {
                id: result.insertId, // Insert ID of the new page
                title,
                description,
                category,
                attachments
            },
            { status: 201 } // Status 201 for successful creation
        );
    } catch (error) {
        console.error('Error creating page:', error); // Log error details for debugging
        return NextResponse.json(
            {
                error: "Failed to create page",
                details: error.sqlMessage || error.message, // Return MySQL error details
            },
            { status: 500 }
        );
    }
}
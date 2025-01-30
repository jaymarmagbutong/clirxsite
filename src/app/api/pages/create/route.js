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
            'INSERT INTO pages (title, description, reference_number, category, attachments, user_created, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, description, referenceNumber, category, attachments, userCreatedId, status]
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
        return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
    }
}



// import connectMongoDB from "../../../../../libs/mongodb";
// import Pages from "@/app/model/pages";

// export async function POST(request) {
//   try {
//     // Parse the incoming request body
//     const { title, description, category, attachments } = await request.json();

//     // Validate the required fields
//     if (!title || !description) {
//       return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//     }

//     // Ensure the MongoDB connection is established
//     await connectMongoDB();

//     // Create a new post in the database
//     const newPage = await Pages.create({
//       title,
//       description,
//       category,
//       attachments // Corrected spelling from 'attactments' to 'attachments'
//     });

//     // Return the newly created post
//     return NextResponse.json(newPage, { status: 201 }); // Status 201 for successful creation
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
//   }
// }

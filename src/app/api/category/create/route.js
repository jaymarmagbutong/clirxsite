import { NextResponse } from "next/server"
import DB from "@/app/api/config/db";
import getUserServerInfo from "@/app/libs/getServerUser";
import { createNotification } from "@/app/api/service/notificationService";


export async function POST(request) {


    const userInfo = await getUserServerInfo(request);
    const user_id = userInfo.id;


    try {
        // Parse the incoming request body
        const { categoryName, description, slug, refNumber } = await request.json();

        // Validate the required fields
        if (!categoryName || !refNumber || !slug) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Check if the category already exists
        const existingCategory = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT id FROM category WHERE name = ?',
                [categoryName],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length > 0 ? results[0] : null);
                    }
                }
            );
        });

        if (existingCategory) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
        }

        // Insert the new category into the database
        const result = await new Promise((resolve, reject) => {
            DB.query(
                'INSERT INTO category (name, description, slug, reference_number) VALUES (?, ?, ?, ?)',
                [categoryName, description, slug, refNumber],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        
        if (result.affectedRows) {
            const notificationType = "create-category"; // Replace with your type
            const notificationMessage = `[${user_id}] Create Category [${result.insertId}]`;
            const notificationResponse = await createNotification({
                userId: 0,
                userCreated: user_id,
                pageId: '',
                type: notificationType,
                message: notificationMessage,
            });
        }


        // Return the newly created category with the ID from the result
        return NextResponse.json(
            {
                id: result.insertId, // Insert ID of the new category
                name: categoryName,
                description: description,
                slug: slug
            },
            { status: 201 } // Status 201 for successful creation
        );
    } catch (error) {
        console.error('Error creating category:', error); // Log error details for debugging
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
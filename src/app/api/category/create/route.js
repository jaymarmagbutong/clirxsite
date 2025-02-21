import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import getUserServerInfo from "@/app/libs/getServerUser";
import { createNotification } from "@/app/api/service/notificationService";

export async function POST(request) {
    const userInfo = await getUserServerInfo(request);
    const user_id = userInfo.id;

    try {
        // Parse the incoming request body
        const { categoryName, description, slug, refNumber } = await request.json();

        // Validate required fields
        if (!categoryName || !refNumber || !slug) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if category exists
        const existingCategory = await new Promise((resolve, reject) => {
            DB.query("SELECT id FROM category WHERE name = ?", [categoryName], (err, results) => {
                if (err) reject(err);
                resolve(results.length > 0 ? results[0] : null);
            });
        });

        if (existingCategory) {
            return NextResponse.json({ error: "Category already exists" }, { status: 409 });
        }

        // Insert new category
        const result = await new Promise((resolve, reject) => {
            DB.query(
                "INSERT INTO category (name, description, slug, reference_number) VALUES (?, ?, ?, ?)",
                [categoryName, description, slug, refNumber],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });

        if (!result.affectedRows) {
            return NextResponse.json({ error: "Failed to insert category" }, { status: 500 });
        }

        // Create notification
        try {
            await createNotification({
                userId: 0,
                userCreated: user_id,
                pageId: "",
                type: "create-category",
                message: `[${user_id}] Created Category [${result.insertId}]`,
            });
        } catch (notificationError) {
            console.error("Failed to create notification:", notificationError);
        }

        // Return response
        return NextResponse.json(
            {
                id: result.insertId,
                name: categoryName,
                description: description,
                slug: slug,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
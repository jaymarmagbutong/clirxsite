import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import { createNotification } from "@/app/api/service/notificationService";
import getUserServerInfo from "@/app/libs/getServerUser";


export async function DELETE(request) {

    const userInfo = await getUserServerInfo(request);
    const user_id = userInfo.id;

    try {
        // Parse the incoming request body
        const { id } = await request.json();

        // Validate the required fields
        if (!id) {
            return NextResponse.json({ error: "Page ID is required" }, { status: 400 });
        }

        // Check if the page with the given ID exists
        const existingPage = await new Promise((resolve, reject) => {
            DB.query(
                "SELECT id FROM pages WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length > 0 ? results[0] : null);
                    }
                }
            );
        });

        if (!existingPage) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        // Soft delete the page by setting the `deleted` column to 1
        const deletepage = await new Promise((resolve, reject) => {
            DB.query(
                "UPDATE pages SET deleted = 1 WHERE id = ?",
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

        if (deletepage.affectedRows) {
            const notificationType = "delete-page"; // Replace with your type
            const notificationMessage = `[${user_id}] Delete Page [${id}]`;
            const notificationResponse = await createNotification({
                userId: 0,
                userCreated: user_id,
                pageId: id,
                type: notificationType,
                message: notificationMessage,
            });
        }


        // Return a success response
        return NextResponse.json(
            {
                message: "Page marked as deleted successfully",
                id
            },
            { status: 200 } // Status 200 for successful update
        );
    } catch (error) {
        console.error("Error deleting page:", error); // Log error details for debugging
        return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
    }
}

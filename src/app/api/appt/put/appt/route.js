import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import { getCurrentDateTime } from "@/app/libs/dateTIme";
import { createNotification } from "@/app/api/service/notificationService";

// Handle PUT requests (update existing appt)

export async function PUT(request) {

    try {
        const { user_id, page_id, description } = await request.json();
        const currentTime = getCurrentDateTime();

        const response = await new Promise((resolve, reject) => {
            DB.query(
                'UPDATE appt SET response = ?, response_created = ? WHERE page_id = ? AND user_id = ? ', 
                [description, currentTime, page_id, user_id ],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });




        if (response.affectedRows === 0) {
            return NextResponse.json({ error: 'No appt found to update' }, { status: 404 });
        }

        // Call the notification function
        if(response.affectedRows){
            const notificationType = "modify-page"; // Replace with your type
            const notificationMessage = `[${user_id}] Modify Page [${page_id}]`;
            const notificationResponse = await createNotification({
                userId: 0,
                userCreated: user_id,
                pageId: page_id,
                type: notificationType,
                message: notificationMessage,
            });    
        }
     

        return NextResponse.json({ message: 'appt updated successfully' }, { status: 200 });
        
    } catch (error) {
        console.error('Error updating appt:', error);
        return NextResponse.json({ error: 'Failed to update appt' }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import { getCurrentDateTime } from "@/app/libs/dateTIme";
import getUserServerInfo from "@/app/libs/getServerUser";
import { createNotification } from "@/app/api/service/notificationService";

export async function POST(request){
    try {
        const user = await getUserServerInfo(request);
        
        const {user_id, page_id} = await request.json();

        const currentTime = getCurrentDateTime();

        const response = await new Promise((resolve, reject)=> {
            DB.query(
                'INSERT INTO appt (user_id, page_id, date_created, from_user_id) VALUES (?, ?, ?, ?)', 
                [user_id, page_id, currentTime, user.id],
                (err, results) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }
                }
            )
        });

        var  notificationResponse = null;
        if(response.affectedRows) {
            // Call the notification function
            const notificationType = "assign-page"; // Replace with your type
            const notificationMessage = `[${user.id}] Assign [${user.id}]`;
            notificationResponse = await createNotification({
                userId: user_id,
                userCreated: user.id,
                pageId: page_id,
                type: notificationType,
                message: notificationMessage,
            });

        }


        return NextResponse.json(
            {id: response.insertId},
            {status:200},
            {Notification: notificationResponse}
        )
    } catch (error) {
       console.error('Error creating Appt:', error); // Log error details for debugging
      return NextResponse.json({ error: 'Failed to create appt' }, { status: 500 });
    }
}
import DB from "@/app/api/config/db";
import { getCurrentDateTime } from "@/app/libs/dateTIme";

export async function POST(request) {
    const { notificationId, userId } = await request.json();

    // Input validation
    if (!notificationId || !userId) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid input' }), { status: 400 });
    }

    try {
        const currentTime = getCurrentDateTime();

        // Step 1: Check if the record already exists
        const existingRecord = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT * FROM notification_isread WHERE notification_id = ? AND user_id = ?',
                [notificationId, userId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        if (existingRecord.length > 0) {
            // Record already exists, return a response
            return new Response(JSON.stringify({ success: false, message: 'Record already exists' }), { status: 409 }); // 409 Conflict
        }

        // Step 2: Insert the new record if it doesn't exist
        const result = await new Promise((resolve, reject) => {
            DB.query(
                'INSERT INTO notification_isread (notification_id, user_id, is_read, read_at) VALUES (?, ?, ?, ?)',
                [notificationId, userId, 1, currentTime],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error('Error marking notification as read:', error);
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}
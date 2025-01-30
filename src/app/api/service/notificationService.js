import DB from "@/app/api/config/db";
import { getCurrentDateTime } from "@/app/libs/dateTIme";

/**
 * Creates a notification in the database.
 *
 * @param {Object} params - The notification parameters.
 * @param {number} params.userId - The ID of the user receiving the notification.
 * @param {number} params.userCreated - The ID of the user who created the notification.
 * @param {number} params.pageId - The ID of the related page (optional).
 * @param {string} params.type - The type of notification (e.g., 'like', 'comment', 'custom').
 * @param {string} params.message - The message content of the notification.
 * @returns {Promise<Object>} The result of the database insertion.
 */
export async function createNotification({ userId, userCreated, pageId, type, message }) {
    const currentTime = getCurrentDateTime();

    return new Promise((resolve, reject) => {
        DB.query(
            'INSERT INTO notifications (user_id, user_created, page_id, type, message, is_read, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, userCreated, pageId, type, message, 0, currentTime],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

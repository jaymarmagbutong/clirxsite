import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import { NotificationActionService } from "@/app/api/service/notificationActionService";
import formatTime from "@/app/api/service/formatDate";
import getUserServerInfo from "@/app/libs/getServerUser";


export async function GET(request, { params }) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const role = request.headers.get('role');
    const userId = request.headers.get('id');

    const user = await getUserServerInfo(request);

    try {
        // Main data query
        let dataQuery, dataParams;
        
        if (role === '1') { // Admin
            dataQuery = `
                SELECT 
                    n.*, 
                    u1.username AS created_by_username, 
                    u2.username AS assigned_to_username, 
                    p.id AS page_id, 
                    p.title AS page_title, 
                    nr.is_read AS user_read
                FROM notifications n
                LEFT JOIN user u1 ON n.user_created = u1.id  
                LEFT JOIN user u2 ON n.user_id = u2.id       
                LEFT JOIN pages p ON n.page_id = p.id
                LEFT JOIN notification_isread nr ON n.id = nr.notification_id AND nr.user_id = ?
                ORDER BY n.created_at DESC
                LIMIT ? OFFSET ?;
            `;
            dataParams = [userId, limit, offset];
        } else { // Regular user
            dataQuery = `
                SELECT 
                    n.*, 
                    u1.username AS created_by_username, 
                    u2.username AS assigned_to_username, 
                    p.id AS page_id, 
                    p.title AS page_title, 
                    nr.is_read AS user_read
                FROM notifications n
                LEFT JOIN user u1 ON n.user_created = u1.id  
                LEFT JOIN user u2 ON n.user_id = u2.id       
                LEFT JOIN pages p ON n.page_id = p.id
                LEFT JOIN notification_isread nr ON n.id = nr.notification_id AND nr.user_id = ?
                WHERE n.user_id = ?
                ORDER BY n.created_at DESC
                LIMIT ? OFFSET ?;
            `;
            dataParams = [userId, id, limit, offset];
        }

        // Unread count query
        const countQuery = role === '1' 
            ? `SELECT COUNT(*) as count
               FROM notifications n
               LEFT JOIN notification_isread nr ON n.id = nr.notification_id AND nr.user_id = ?
               WHERE nr.is_read IS NULL OR nr.is_read = 0`

            : `SELECT COUNT(*) as count 
               FROM notifications n
               LEFT JOIN notification_isread nr ON n.id = nr.notification_id AND nr.user_id = ?
               WHERE n.user_id = ? AND (nr.is_read IS NULL OR nr.is_read = 0)`;

        const countParams = role === '1' ? [userId] : [userId, id];

        // Execute queries
        const [dataResults, countResult] = await Promise.all([
            new Promise((resolve, reject) => {
                DB.query(dataQuery, dataParams, (err, results) => {
                    err ? reject(err) : resolve(results);
                });
            }),
            new Promise((resolve, reject) => {
                DB.query(countQuery, countParams, (err, results) => {
                    err ? reject(err) : resolve(results[0]?.count || 0);
                });
            })
        ]);

        // Transform data
        const notifications = dataResults.map(notification => (
            
            {
                id: notification.id,
                name: notification.username,
                action: NotificationActionService(notification, userId),
                item: notification.page_title || null,
                time: formatTime(notification.created_at),
                page_id: notification.page_id,
                is_read: notification.user_read || 0,
                action_type: notification.type,
            }
        ));

        return NextResponse.json({
            status: 200,
            data: notifications,
            unread_count: Number(countResult),
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: error.message || 'Server error' },
            { status: 500 }
        );
    }
}
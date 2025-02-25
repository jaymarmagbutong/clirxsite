import { NextResponse } from "next/server";
import DB from "@/app/api/config/db"; // Adjust import path as needed
import getUserServerInfo from "@/app/libs/getServerUser";
import { createNotification } from "@/app/api/service/notificationService";
// Function to get page details by ID
export async function GET(request, { params }) {
   

    const userInfo = await getUserServerInfo(request);

   



    try {
        const { id } = await params;
        const page_id = id;
        const user_id = userInfo.id;
       
        // check if it is seen
        const checkIfSeen = await new Promise((resolve, reject) => {
            const status = 'seen';
            DB.query(
                `SELECT * FROM appt_status WHERE status = ? AND page_id = ? AND user_id = ?`,
                [status, page_id, user_id ],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        if(!checkIfSeen.length) {
            const updateStatus = await new Promise((resolve, reject) => {
                const status = 'seen';
                DB.query(
                    'INSERT INTO  appt_status (status, page_id, user_id, description) VALUES (?, ?, ?, ?) ', 
                    [status, page_id, user_id, 'test'  ],
                    (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });


            if(updateStatus.affectedRows) {
                // Call the notification function
                const notificationType = "seen-page"; // Replace with your type
                const notificationMessage = `Page seen by [${user_id}]`;
                const notificationResponse = await createNotification({
                    userId: user_id,
                    userCreated: user_id,
                    pageId: page_id,
                    type: notificationType,
                    message: notificationMessage,
                });
            }
        }


        // Fetch page details from the database
        const results = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT * 
                FROM 
                    pages 
                WHERE 
                    id = ? 
                AND 
                    pages.deleted != 1 
                ORDER BY 
                    reference_number 
                
                DESC`,
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


        
        const appt_response = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT 
                    appt.user_id, 
                    appt.response,
                    user.username, 
                    pages.title,
                    pages.id,
                    appt.response_created,
                    appt.date_created
                FROM 
                    appt as appt
                INNER JOIN 
                    user as user
                ON
                    appt.user_id = user.id
                INNER JOIN 
                    pages as pages
                ON 
                    appt.page_id = pages.id
                WHERE 
                    page_id = ? 
                AND 
                    response !='' 
                AND 
                    pages.deleted != 1
                ORDER BY 
                    appt.response_created DESC`,
                [id, user_id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });


        // appt interaction
        // appt interaction
        const appt_interaction = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT 
                    COUNT(*) > 0 AS has_data
                FROM 
                    appt
                WHERE 
                    page_id = ? 
                AND 
                    user_id = ?`, 
                [id, user_id],  
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(!!results[0].has_data); // Convert 1/0 to true/false
                    }
                }
            );
        });

        // Check if a page was found
        if (results.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        // Return the page details
        return NextResponse.json( {'pages': results[0], 'appt_response':appt_response, 'appt_interaction':  appt_interaction}, { status: 200 }); // Status 200 for successful retrieval
    } catch (error) {
        console.error('Error fetching page details:', error); // Log error details for debugging
        return NextResponse.json({ error: 'Failed to fetch page details' }, { status: 500 });
    }
}

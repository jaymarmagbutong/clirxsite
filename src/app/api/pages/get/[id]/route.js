import { NextResponse } from "next/server";
import DB from "@/app/api/config/db"; // Adjust import path as needed
import getUserServerInfo from "@/app/libs/getServerUser";
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
        }


        // Fetch page details from the database
        const results = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT * FROM pages WHERE id = ?  ORDER BY reference_number DESC`,
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
                    page_id = ? AND response !=''  ORDER BY pages.reference_number DESC`,
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

        // Check if a page was found
        if (results.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        // Return the page details
        return NextResponse.json( {'pages': results[0], 'appt_response':appt_response }, { status: 200 }); // Status 200 for successful retrieval
    } catch (error) {
        console.error('Error fetching page details:', error); // Log error details for debugging
        return NextResponse.json({ error: 'Failed to fetch page details' }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import getUserServerInfo from "@/app/libs/getServerUser";

export async function GET(request, { params }) {
    const { id } = await params;

    const user = await getUserServerInfo(request);


    try {
        // Use parameterized queries to prevent SQL injection
        const results = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT 
                    his.*, 
                    pgs.title, 
                    his.date_created as historyDate, 
                    usr_from.username as user_from,
                    usr_approve.username as approve_user

                FROM 
                    appt_history as his
                INNER JOIN
                    pages as pgs 
                ON
                    his.page_id = pgs.id
                INNER JOIN 
                    user as usr_from
                ON 
                    his.from_user_id = usr_from.id
                INNER JOIN
                    user as usr_approve
                ON  
                    his.user_id = usr_approve.id
                WHERE 
                    his.page_id = ? ORDER BY id ASC `,
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


        const modifiedResults = results.map((result) => ({
            ...result,
            user_from: result.from_user_id === user.id ? "You" : result.user_from,
            approve_user: result.user_id === user.id ? "You" : result.approve_user, // Change user_to if it matches logged-in user
        }));

        return NextResponse.json(modifiedResults, { status: 200 }); // Status 200 for success
    } catch (error) {
        return NextResponse.json(
            { message: error.message || 'Internal Server Error' }, // Convert error to string if necessary
            { status: 500 }
        );
    }
}



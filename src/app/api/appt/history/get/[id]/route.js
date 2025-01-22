import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function GET(request, { params }) {
    const { id } = await params;

    try {
        // Use parameterized queries to prevent SQL injection
        const results = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT 
                    his.*, pgs.title, his.date_created as historyDate, usr.username as user_from
                 FROM 
                    appt_history as his
                INNER JOIN
                    pages as pgs 
                ON 
                    his.page_id = Pgs.id
                INNER JOIN 
                    user as usr
                ON 
                    his.from_user_id = usr.id
                WHERE 
                    his.page_id = ? ORDER BY id DESC `,
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




        return NextResponse.json(results, { status: 200 }); // Status 200 for success
    } catch (error) {
        return NextResponse.json(
            { message: error.message || 'Internal Server Error' }, // Convert error to string if necessary
            { status: 500 }
        );
    }
}



import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function POST(request) {
   
    try {

        const {user_id, page_id} = await request.json();
     
        const results = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT * FROM appt WHERE user_id = ? AND page_id = ?',
                [user_id, page_id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        return NextResponse.json(results[0].response, { status: 200 }); // Status 200 for success
    } catch (error) {
        return NextResponse.json(
            { message: error.message || 'Internal Server Error' }, // Convert error to string if necessary
            { status: 500 }
        );
    }
}


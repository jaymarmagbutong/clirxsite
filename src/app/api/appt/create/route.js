import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import { getCurrentDateTime } from "@/app/libs/dateTIme";
import getUserServerInfo from "@/app/libs/getServerUser";

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

        

        return NextResponse.json(
            {id: response.insertId},
            {status:200}
        )
    } catch (error) {
       console.error('Error creating Appt:', error); // Log error details for debugging
      return NextResponse.json({ error: 'Failed to create appt' }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import getUserServerInfo from "@/app/libs/getServerUser";
import { getCurrentDateTime } from "@/app/libs/dateTIme";


export async function POST(request){

    const userInfo = await getUserServerInfo(request);
    const user_id = userInfo.id;
    const currentTime = getCurrentDateTime();
    try {
        const {content, pageId, oldPageContent, from_user_id, updated_at} = await request.json();

        const response = await new Promise((resolve, reject) => {
            DB.query(
                'UPDATE pages SET description = ?, date_updated = ? WHERE id = ? ', 
                [content.response, currentTime, pageId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

 
        const result = await new Promise((resolve, reject) => {
            DB.query(
                'INSERT INTO appt_history (page_id, user_id, old_content, from_user_id) VALUES (?, ?, ?, ?)',
                [pageId, user_id, oldPageContent, from_user_id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
        return NextResponse.json(result,
            {status:200}
        )

    } catch (error) {
        console.log(error)
    }

    
}
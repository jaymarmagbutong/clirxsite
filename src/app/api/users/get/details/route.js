import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import getUserServerInfo from "@/app/libs/getServerUser";

// Helper function to execute SQL queries
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        DB.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export async function GET(req) {
    const userInfo = await getUserServerInfo(req);
    const user_id = userInfo.id;

    try {
        if (!user_id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        // Get user details from the database
        const userResult = await query("SELECT * FROM user WHERE id = ?", [user_id]);
        const userDetailsResult = await query("SELECT * FROM user_details WHERE user_id = ?", [user_id]);

        if (userResult.length === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Combine user and user details
        const userDetails = {
            ...userResult[0],
            ...userDetailsResult[0], // Combine details from user_details
        };

        return NextResponse.json(userDetails, { status: 200 });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

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

export async function PUT(req) {
    const userInfo = await getUserServerInfo(req);
    const user_id = userInfo.id;

    try {
        // Parse the incoming request body
        const { name, email, birthday, phone, address, gender, site, firstname, middle_name, lastname } = await req.json();

        // Validate the required fields
        if (!user_id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        // Update `users` table
        const updateUserResult = await query(
            "UPDATE user SET username = ?, email = ? WHERE id = ?",
            [name, email, user_id]
        );

        // Check if user_details exists for the user
        const userDetails = await query("SELECT * FROM user_details WHERE user_id = ?", [user_id]);

        if (userDetails.length > 0) {
            // Update existing user_details record
            const updateUserDetailsResult = await query(
                "UPDATE user_details SET firstname = ?, middle_name = ?, lastname = ?, birthday = ?, phone = ?, address = ?, gender = ?, site = ? WHERE user_id = ?",
                [firstname, middle_name, lastname, birthday, phone, address, gender, site, user_id]
            );
        } else {
            // Insert new user_details record
            const insertUserDetailsResult = await query(
                "INSERT INTO user_details (user_id, firstname, middle_name, lastname, birthday, phone, address, gender, site) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [user_id, firstname, middle_name, lastname, birthday, phone, address, gender, site]
            );
        }

        return NextResponse.json({ message: "User profile updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating user profile:", error); // Log error details for debugging
        return NextResponse.json(
            {
                message: "Internal Server Error",
                details: error.sqlMessage || error.message, // Return MySQL error details
            },
            { status: 500 }
        );
    }
}

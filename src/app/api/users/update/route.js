import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import DB from "@/app/api/config/db";

export async function PUT(req) {
    try {
        // Parse JSON body
        const { id, name, email, role, password } = await req.json();

        // Check if the user exists
        const existingUser = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT id FROM user WHERE id = ?',
                [id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length > 0 ? results[0] : null);
                    }
                }
            );
        });

        console.log(`SELECT id FROM user WHERE id = ${id}`)

        if (!existingUser) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 } // Not Found status code
            );
        }

        // Prepare update fields
        let hashedPassword = null;
        if (password) {
            // Hash the new password if provided
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update the user in the database
        await new Promise((resolve, reject) => {
            const query = `
                UPDATE user
                SET username = ?, email = ?, role = ?${hashedPassword ? ', password = ?' : ''}
                WHERE id = ?
            `;
            const params = hashedPassword
                ? [name, email, role, hashedPassword, id]
                : [name, email, role, id];

            DB.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Respond with success
        return NextResponse.json(
            { message: "User updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        // Handle any errors
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

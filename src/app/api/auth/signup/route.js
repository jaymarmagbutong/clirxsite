import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import DB from "@/app/api/config/db";

export async function POST(req) {
    try {
        // Parse JSON body
        const { name, email, password, role } = await req.json();

        // Check if the email already exists
        const existingUser = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT id FROM user WHERE email = ?',
                [email],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.length > 0 ? results[0] : null);
                    }
                }
            );
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 409 } // Conflict status code
            );
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await new Promise((resolve, reject) => {
            DB.query(
                'INSERT INTO user (username, email, role, password) VALUES (?, ?, ?, ?)',
                [name, email, role, hashedPassword],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        // Respond with success
        return NextResponse.json(
            { message: 'User registered successfully' },
            { status: 201 }
        );
    } catch (error) {
        // Handle any errors
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}












// import connectMongoDB from "../../../../../libs/mongodb";
// import User from "@/app/model/user";


// export async function POST(req, res) {
//     try {
//         // Parse JSON body
//         const { name, email, password, role } = await req.json();
    
//         // Check if the email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//           return NextResponse.json(
//             { message: "Email already in use." },
//             { status: 409 } // Conflict status code
//           );
//         }
    
//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
    
//         // Create the new user
//         const newUser = new User({ name, email, role, password: hashedPassword });
//         await newUser.save();
    
//         // Respond with success
//         return NextResponse.json(newUser, { message: 'User registered successfully' }, { status: 201 });
//       } catch (error) {
//         // Handle any errors
//         return NextResponse.json({ message: error.message }, { status: 500 });
//       }

// }
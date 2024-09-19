import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function GET(request, { params }) {
    const { id } = params;
    try {
        // Use parameterized queries to prevent SQL injection
        const results = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT id, username, email, role FROM User WHERE id = ? LIMIT 1',
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

        return NextResponse.json(results[0], { status: 200 }); // Status 200 for success
    } catch (error) {
        return NextResponse.json(
            { message: error.message || 'Internal Server Error' }, // Convert error to string if necessary
            { status: 500 }
        );
    }
}








// import User from "@/app/model/user";
// import connectMongoDB from "../../../../../../libs/mongodb";


// export async function GET(request, {params}){
//     const { id } = params;

//     try {
//         await connectMongoDB();

//         const user =  await User.findOne({_id: id}).lean();

//         return NextResponse.json(user, {status:201})

//     } catch (error) {
//         return NextResponse.json(error)
//     }
// }
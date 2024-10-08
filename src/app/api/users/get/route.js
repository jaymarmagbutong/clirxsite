import { NextResponse } from "next/server";
import DB from "../../config/db";

export async function GET(){
    try {
        const results = await new Promise((resolve, reject)=> {
            DB.query("SELECT * FROM user", (err, results)=> {
                if(err){
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
        return NextResponse.json(results, {status: 201})
    } catch (error) {
        return NextResponse.json(
            {message:error },
            {status: 500}
        )
    }
}





// import connectMongoDB from "../../../../../libs/mongodb";
// import User from "@/app/model/user";

// export async function GET(){
//     try {
//         await connectMongoDB();

//         const users = await User.find();
//         return NextResponse.json(users, {status: 200});

//     } catch (error) {
//         console.log('Error fetching users', error);
//         return NextResponse.json({error: 'Failed to fetch data'}, {status:500})
//     }
// }



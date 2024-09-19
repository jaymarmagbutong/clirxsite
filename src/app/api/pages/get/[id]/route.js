import { NextResponse } from "next/server";
import DB from "@/app/api/config/db"; // Adjust import path as needed

// Function to get page details by ID
export async function GET(request, { params }) {
    const { id } = params;

    try {
        // Fetch page details from the database
        const results = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT * FROM Pages WHERE id = ?',
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

        // Check if a page was found
        if (results.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        // Return the page details
        return NextResponse.json(results[0], { status: 200 }); // Status 200 for successful retrieval
    } catch (error) {
        console.error('Error fetching page details:', error); // Log error details for debugging
        return NextResponse.json({ error: 'Failed to fetch page details' }, { status: 500 });
    }
}




// import connectMongoDB from "../../../../../../libs/mongodb";
// import Pages from "@/app/model/pages";
// import { NextResponse } from "next/server";
// import mongoose from 'mongoose';

// const { Types } = mongoose;

// export async function GET(request, { params }) {
//     const { id } = params;

//     try {
//         await connectMongoDB();

//         const getPageDetails = await Pages.findOne({_id: id}).lean();
//         return NextResponse.json(getPageDetails, {status: 201})

//     } catch (error) {
//         return NextResponse.json(error)

//     }
// }

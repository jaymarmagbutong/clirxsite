import { NextResponse } from "next/server";
import DB from "@/app/api/config/db"; // Adjust import path as needed

export async function GET() {
    try {
        // Fetch all categories from the database
        const categoryLists = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT * FROM category', // Fetch all columns from the Category table
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        // Return the list of categories
        return NextResponse.json(categoryLists, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error); // Log error details for debugging
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}


// import { NextResponse } from "next/server";
// import connectMongoDB from "../../../../../libs/mongodb";
// import Category from "@/app/model/category";

// export async function GET() {
//     try {
//         await connectMongoDB();
//         const categoryLists = await Category.find();
//         return NextResponse.json(categoryLists, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
//     }
// }

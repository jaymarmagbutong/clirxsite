import { NextResponse } from "next/server";
import DB from "@/app/api/config/db"; // Adjust import path as needed

// Function to get categories with their associated pages
export async function GET() {
    try {
        // Fetch all active categories
        const categories = await new Promise((resolve, reject) => {
            DB.query(
                'SELECT id, name, slug FROM category',
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    
        // For each category, fetch the associated pages and combine them
        const categoriesWithPages = await Promise.all(
            categories.map(async (category) => {
                const pages = await new Promise((resolve, reject) => {
                    DB.query(
                        'SELECT * FROM pages WHERE category = ?  ORDER BY reference_number ASC',
                        [category.id],
                        (err, results) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        }
                    );
                });
    
                // Return the combined category with its pages
                return {
                    ...category,
                    pages: pages.length > 0 ? pages : [], // If no pages, return an empty array
                };
            })
        );
    
        // Return the final response with categories and pages
        return NextResponse.json(categoriesWithPages, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories with pages:', error);
        return NextResponse.json({ error: 'Failed to fetch categories with pages' }, { status: 500 });
    }
    
}



// import { NextResponse } from "next/server";
// import connectMongoDB from "../../../../../libs/mongodb";
// import Category from "@/app/model/category";
// import Pages from "@/app/model/pages";


// export async function GET(){
//     await connectMongoDB();
    // try {
    //     const category = await Category.find({is_active: 1}).lean();

    //     const cateogyWithPages = await Promise.all(category.map( async (category) => {
    //         const pages = await Pages.find({category: category._id}).lean();

    //         return {
    //             ...category,pages
    //         }

    //     }));


    //     return NextResponse.json( cateogyWithPages, {status:200} )
    // } catch (error) {
        
    // }
// }
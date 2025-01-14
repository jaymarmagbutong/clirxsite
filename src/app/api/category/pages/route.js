import { NextResponse } from "next/server";
import DB from "@/app/api/config/db"; // Adjust import path as needed

// Function to get categories with their associated pages
export async function GET() {
    try {
        // Use a single query to fetch categories and their associated pages
        const query = `
            SELECT 
                c.id AS category_id, 
                c.name AS category_name, 
                c.slug AS category_slug, 
                p.id AS page_id, 
                p.date_created AS date_created, 
                p.title AS page_title, 
                p.reference_number AS page_reference_number, 
                p.description AS page_content,
                p.status AS page_status,
                COUNT( DISTINCT appt.response) AS interaction_count,
                COUNT( DISTINCT appt.id) AS sent_count,
                COUNT( DISTINCT  com.id ) as comment_count
            FROM 
                category c
            LEFT JOIN 
                pages p ON c.id = p.category
            LEFT JOIN
                appt appt ON p.id = appt.page_id
            LEFT JOIN
                comments com ON p.id = com.page_id
            GROUP BY 
                c.id, p.id
            ORDER BY 
                c.id, p.reference_number 
            ASC;
        `;

        const result = await new Promise((resolve, reject) => {
            DB.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Group the result into categories with their respective pages
        const categoriesWithPages = result.reduce((acc, row) => {
            const { category_id, category_name, category_slug, page_id, page_title, page_reference_number, page_content, page_status, interaction_count, sent_count, date_created, comment_count } = row;

            // Check if the category already exists in the accumulator
            const existingCategory = acc.find(cat => cat.id === category_id);

            if (existingCategory) {
                // Add page to the existing category
                if (page_id) { // Check if the page exists (LEFT JOIN can result in null values for pages)
                    existingCategory.pages.push({
                        id: page_id,
                        title: page_title,
                        reference_number: page_reference_number,
                        content: page_content,
                        status: page_status,
                        interaction_count: interaction_count,
                        sent_count:sent_count,
                        date_created:date_created,
                        comment_count: comment_count
                    });
                }
            } else {
                // Add new category with its page
                acc.push({
                    id: category_id,
                    name: category_name,
                    slug: category_slug,
                    pages: page_id ? [{
                        id: page_id,
                        title: page_title,
                        reference_number: page_reference_number,
                        content: page_content,
                        status: page_status,
                        interaction_count: interaction_count,
                        sent_count:sent_count,
                        date_created:date_created,
                        comment_count: comment_count
                    }] : [] // Initialize with an empty array if no pages exist
                });
            }
            
            return acc;
        }, []);
  
        // Return the grouped categories with pages
        return NextResponse.json(categoriesWithPages, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories with pages:', error);
        return NextResponse.json({ error: 'Failed to fetch categories with pages' }, { status: 500 });
    }
}



// import { NextResponse } from "next/server";
// import DB from "@/app/api/config/db"; // Adjust import path as needed

// // Function to get categories with their associated pages
// export async function GET() {
//     try {
//         // Fetch all active categories
//         const categories = await new Promise((resolve, reject) => {
//             DB.query(
//                 'SELECT id, name, slug FROM category',
//                 (err, results) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(results);
//                     }
//                 }
//             );
//         });
    
//         // For each category, fetch the associated pages and combine them
//         const categoriesWithPages = await Promise.all(
//             categories.map(async (category) => {
//                 const pages = await new Promise((resolve, reject) => {
//                     DB.query(
//                         'SELECT * FROM pages WHERE category = ?  ORDER BY reference_number ASC',
//                         [category.id],
//                         (err, results) => {
//                             if (err) {
//                                 reject(err);
//                             } else {
//                                 resolve(results);
//                             }
//                         }
//                     );
//                 });
    
//                 // Return the combined category with its pages
//                 return {
//                     ...category,
//                     pages: pages.length > 0 ? pages : [], // If no pages, return an empty array
//                 };
//             })
//         );
    
//         // Return the final response with categories and pages
//         return NextResponse.json(categoriesWithPages, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching categories with pages:', error);
//         return NextResponse.json({ error: 'Failed to fetch categories with pages' }, { status: 500 });
//     }
    
// }



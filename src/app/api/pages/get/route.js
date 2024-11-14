import { NextResponse } from "next/server";
import DB from "@/app/api/config/db"; // Adjust import path as needed

export async function GET(request, { params }) {
    try {
        const pages = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT 
                    user.username, 
                    pages.title,
                    pages.id,
                    pages.date_created,
                    pages.status
                FROM
                    pages AS pages
                INNER JOIN 
                    user AS user ON pages.user_created = user.id
                ORDER BY 
                    pages.reference_number ASC`, // Removed WHERE since no condition is specified
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        // Check if any pages were found
        if (!pages || pages.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        // Return the page details
        return NextResponse.json({ pages }, { status: 200 }); // Return all results, not just the first one
    } catch (error) {
        console.error('Error fetching page details:', error); // Log error details for debugging
        return NextResponse.json({ error: 'Failed to fetch page details' }, { status: 500 });
    }
}

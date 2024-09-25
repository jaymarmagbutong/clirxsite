import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function GET(request, { params }) {
    const { id } = params;
    try {
        // Use parameterized queries to prevent SQL injection
        const results = await new Promise((resolve, reject) => {
            DB.query(
                `SELECT 
                    Acc.id as AccId,
                    Pgs.id as PageId,
                    Pgs.title as PageTitle,
                    Cat.name as CategoryTitle,
                    Cat.id as CategoryId,
                    Acc.date_created as AccDateCreated,
                    Acc.response as AccResponse
                FROM 
                    appt as Acc
                INNER JOIN
                    pages as Pgs
                ON
                    Acc.page_id = Pgs.id
                INNER JOIN
                    category as Cat
                ON 
                   Pgs.category = Cat.id
                WHERE 
                    user_id = ? 
                    `,
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

        const groupedData = results.reduce((acc, item) => {
            const { CategoryId, CategoryTitle, PageId, PageTitle, AccId , AccDateCreated} = item;
          
            // Check if category already exists
            if (!acc[CategoryId]) {
              acc[CategoryId] = {
                CategoryId,
                CategoryTitle,
                Pages: []
              };
            }
          
            // Add page under the category
            acc[CategoryId].Pages.push({
              PageId,
              PageTitle,
              AccId,
              AccDateCreated
            });
          
            return acc;
          }, {});

        

        return NextResponse.json(groupedData, { status: 200 }); // Status 200 for success
    } catch (error) {
        return NextResponse.json(
            { message: error.message || 'Internal Server Error' }, // Convert error to string if necessary
            { status: 500 }
        );
    }
}





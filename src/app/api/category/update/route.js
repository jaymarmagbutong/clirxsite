import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function PUT(request) {
  try {
      // Parse the incoming request body
      const { id, categoryName } = await request.json();

      // Validate the required fields
      if (!id || !categoryName) {
          return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      }

      // Check if the category with the given ID exists
      const existingCategory = await new Promise((resolve, reject) => {
          DB.query(
              'SELECT id FROM category WHERE id = ?',
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

      if (!existingCategory) {
          return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }

      // Update the category in the database
      await new Promise((resolve, reject) => {
          DB.query(
              'UPDATE category SET name = ? WHERE id = ?',
              [categoryName, id],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });

      // Return a success response
      return NextResponse.json(
          {
              message: 'Category updated successfully',
              id,
              name: categoryName,
             
          },
          { status: 200 } // Status 200 for successful update
      );
  } catch (error) {
      console.error('Error updating category:', error); // Log error details for debugging
      return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

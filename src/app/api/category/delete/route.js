import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function DELETE(request) {
  try {
      // Parse the incoming request body
      const { id } = await request.json();

      // Validate the required fields
      if (!id) {
          return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
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

      // Delete the category from the database
      await new Promise((resolve, reject) => {
          DB.query(
              'DELETE FROM category WHERE id = ?',
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

      // Return a success response
      return NextResponse.json(
          {
              message: 'Category deleted successfully',
              id
          },
          { status: 200 } // Status 200 for successful delete
      );
  } catch (error) {
      console.error('Error deleting category:', error); // Log error details for debugging
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}

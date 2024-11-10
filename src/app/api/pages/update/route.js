import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";

export async function PUT(request) {
  try {
    // Parse the incoming request body
    const { id, title, description, referenceNumber, category, attachments, status } = await request.json();

    // Validate the required fields
    if (!id || !title || !description) {
      return NextResponse.json({ error: 'ID, title, and description are required' }, { status: 400 });
    }

    // Check if the page with the given ID exists
    const existingPage = await new Promise((resolve, reject) => {
      DB.query(
        'SELECT id FROM pages WHERE id = ?',
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

    if (!existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Update the page in the database
    await new Promise((resolve, reject) => {
      DB.query(
        `UPDATE pages 
         SET title = ?, description = ?, reference_number = ?, category = ?, attachments = ?, status = ? 
         WHERE id = ?`,
        [title, description, referenceNumber, category, attachments, status, id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    // Return a success response with the updated page data
    return NextResponse.json(
      {
        message: 'Page updated successfully',
        id,
        title,
        description,
        referenceNumber,
        category,
        attachments,
        status
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating page:', error); // Log error details for debugging
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

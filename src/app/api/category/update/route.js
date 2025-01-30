import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import getUserServerInfo from "@/app/libs/getServerUser";
import { createNotification } from "@/app/api/service/notificationService";



export async function PUT(request) {

    const userInfo = await getUserServerInfo(request);
    const user_id = userInfo.id;

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
      const result = await new Promise((resolve, reject) => {
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



             
      if (result.affectedRows) {
        const notificationType = "update-category"; // Replace with your type
        const notificationMessage = `[${user_id}] Update Category [${id}]`;
        const notificationResponse = await createNotification({
            userId: 0,
            userCreated: user_id,
            pageId: '',
            type: notificationType,
            message: notificationMessage,
        });
    }

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

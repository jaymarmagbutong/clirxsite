import { NextResponse } from "next/server"
import DB from "@/app/api/config/db";


export async function POST(request) {
  try {
      // Parse the incoming request body
      const { categoryName, description, slug } = await request.json();
  
      // Validate the required fields
      if (!categoryName || !description || !slug) {
          return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      }

      // Check if the category already exists
      const existingCategory = await new Promise((resolve, reject) => {
          DB.query(
              'SELECT id FROM category WHERE name = ?',
              [categoryName],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results.length > 0 ? results[0] : null);
                  }
              }
          );
      });

      if (existingCategory) {
          return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
      }

      // Insert the new category into the database
      const result = await new Promise((resolve, reject) => {
          DB.query(
              'INSERT INTO category (name, description, slug) VALUES (?, ?, ?)',
              [categoryName, description, slug],
              (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              }
          );
      });

      // Return the newly created category with the ID from the result
      return NextResponse.json(
          {
              id: result.insertId, // Insert ID of the new category
              name: categoryName,
              description: description,
              slug: slug
          },
          { status: 201 } // Status 201 for successful creation
      );
  } catch (error) {
      console.error('Error creating category:', error); // Log error details for debugging
      return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}




// import connectMongoDB from "../../../../../libs/mongodb";
// import Category from "@/app/model/category";

// export async function POST(request) {
//   try {
//     // Parse the incoming request body
//     const { categoryName, description, slug } = await request.json();
    
//     const toSave = {
//         name: categoryName,
//         description: description,
//         slug:  slug
//     }

//     // // Validate the required fields
//     if (!categoryName || !categoryName) {
//       return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//     }

//     // // Ensure the MongoDB connection is established
//     await connectMongoDB();

//     const category = await Category.findOne({name: categoryName});

//     if(category){
//       return NextResponse.json({ error: 'Category Exited' }, { status: 400 });
//     }


//     // Create a new post in the database
//     const newPost = await Category.create({
//         name: toSave.name,
//         description: toSave.description,
//         slug: toSave.slug
//     });

//     // Return the newly created post
//     return NextResponse.json(newPost, { status: 201 }); // Status 201 for successful creation
//   } catch (error) {
//     console.error('Error creating post:', error); // Log error details for debugging
//     return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
//   }
// }

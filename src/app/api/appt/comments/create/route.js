import { NextResponse } from "next/server";
import DB from "@/app/api/config/db";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import ImageKit from "imagekit";

// Disable body parsing for this route to handle form data
export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY, // Public Key from dashboard
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Private Key from dashboard
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // URL Endpoint from dashboard
});

export async function POST(request) {
  try {
    // Parse form data
    const formData = await request.formData();

    // Extract text and file data
    const text = formData.get("text");
    const pageId = formData.get("pageId");
    const userId = formData.get("userId");
    const file = formData.get("file"); // The file from the form

    // Validate required fields
    if (!text || !pageId || !userId) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Variables for file data (default to null if no file)
    let fileLink = null;
    let fileName = null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const originalFilename = file.name;
      const fileExtension = path.extname(originalFilename);
      const uniqueFilename = `${Date.now()}_${uuidv4()}${fileExtension}`;
      const filePath = path.join(process.cwd(), "public/img/uploaded", uniqueFilename);

      const dir = path.join(process.cwd(), "public/img/uploaded");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, buffer);

      const uploadResponse = await imagekit.upload({
        file: buffer, // The file as a buffer
        fileName: uniqueFilename, // Unique file name
        folder: "/files", // Folder on ImageKit
      });

      fileLink = uploadResponse.url;
      fileName = originalFilename;
    }

    // Insert the comment into the database
    const newComment = await new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO comments (user_id, page_id, content, file_link, file_name, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
        [userId, pageId, text, fileLink, fileName],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            // Fetch the newly inserted comment with its ID
            resolve({
              id: results.insertId,
              user_id: userId,
              page_id: pageId,
              content: text,
              file_link: fileLink,
              file_name: fileName,
              created_at: new Date().toISOString(),
            });
          }
        }
      );
    });

    return NextResponse.json(newComment, { status: 201 }); // Status 201 for successful creation
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

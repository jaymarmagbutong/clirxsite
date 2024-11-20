import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ImageKit from 'imagekit';


// Initialize ImageKit
const imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY, // Public Key from dashboard
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // Private Key from dashboard
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // URL Endpoint from dashboard
});



export async function POST(req) {

	try {
		const formData = await req.formData();
		const file = formData.get('file');

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const originalFilename = file.name;
		const fileExtension = path.extname(originalFilename);
		const uniqueFilename = `${Date.now()}_${uuidv4()}${fileExtension}`;
		const filePath = path.join(process.cwd(), 'public/img/uploaded', uniqueFilename);

		const dir = path.join(process.cwd(), 'public/img/uploaded');
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		fs.writeFileSync(filePath, buffer);


		const uploadResponse = await imagekit.upload({
			file: buffer, // The file as a buffer
			fileName: uniqueFilename, // Unique file name
			folder: '/uploaded', // Folder on ImageKit
		});

		const response = NextResponse.json({
			message: 'File uploaded successfully',
			filePath: `/img/uploaded/${uniqueFilename}`,
			link_upload: `/img/uploaded/${uniqueFilename}`,
			link: uploadResponse.url
		});

		// Set Cache-Control headers
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // Cache for one year

		return response;
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
	}
}

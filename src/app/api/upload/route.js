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
		// console.log(uploadResponse)
		// const response = NextResponse.json({
		// 	message: 'File uploaded successfully',
		// 	filePath: `/img/uploaded/${uniqueFilename}`,
		// 	link_upload: `/img/uploaded/${uniqueFilename}`,
		// 	files : `/img/uploaded/${uniqueFilename}`,
		// 	link: uploadResponse.url,
		// 	url: uploadResponse.url
		// });

		


		const response = NextResponse.json({
			message: 'File uploaded successfully',
			filePath: `/img/uploaded/${uniqueFilename}`,
			link_upload: `/img/uploaded/${uniqueFilename}`,
			files : `/img/uploaded/${uniqueFilename}`,
			link: uploadResponse.url,
			url: uploadResponse.url,
			"success": true,
			"data": {
				"baseurl": 'https://ik.imagekit.io/pwem9qodf/uploaded/',
				"messages": [
					`${uploadResponse.name} uploaded successfully`
				],
				"files": [
					uploadResponse.name
				],
				"isImages": [
					true
				],
				"code": 100
			},	
			"elapsedTime": 0
		});

		return response;
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
	}
}
// {
// 	fileId: '677f6bda432c476416e8ea75',
// 	name: '1736403928790_de6ab8d0-ebf1-47db-8008-5b1edd3b35f6_9tBAUND3c.jpg',
// 	size: 49065,
// 	versionInfo: { id: '677f6bda432c476416e8ea75', name: 'Version 1' },
// 	filePath: '/uploaded/1736403928790_de6ab8d0-ebf1-47db-8008-5b1edd3b35f6_9tBAUND3c.jpg',
// 	url: 'https://ik.imagekit.io/pwem9qodf/uploaded/1736403928790_de6ab8d0-ebf1-47db-8008-5b1edd3b35f6_9tBAUND3c.jpg',
// 	fileType: 'image',
// 	height: 600,
// 	width: 478,
// 	thumbnailUrl: 'https://ik.imagekit.io/pwem9qodf/tr:n-ik_ml_thumbnail/uploaded/1736403928790_de6ab8d0-ebf1-47db-8008-5b1edd3b35f6_9tBAUND3c.jpg',
// 	AITags: null
//   }
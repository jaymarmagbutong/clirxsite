import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path'
import ImageKit from 'imagekit';


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

  
export async function GET(){
    try{
        const imagesDir = path.join (process.cwd(), 'public/img/uploaded');

        if(!fs.existsSync(imagesDir)){
            return NextResponse.json({images: []},{status: 200} );
        }

        // const files = fs.readdirSync(imagesDir);
        // const images = files.map(file => `/img/uploaded/${file}`);


        const images = await imagekit.listFiles({
            path: '/uploaded', // Folder path (optional)
            fileType: 'image', // Only list images
        });

        return NextResponse.json({images}, {status: 200})
    } catch (error) {
        console.log("Error reading files images", error)
        return NextResponse.json({error: "Unable to fetch images"}, {status: 500});

    }
}

import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path'

export async function GET(){
    try{
        const imagesDir = path.join (process.cwd(), 'public/img/uploaded');

        if(!fs.existsSync(imagesDir)){
            return NextResponse.json({images: []},{status: 200} );
        }

        const files = fs.readdirSync(imagesDir);
        const images = files.map(file => `/img/uploaded/${file}`);

        return NextResponse.json({images}, {status: 200})
    } catch (error) {
        console.log("Error reading files images", error)
        return NextResponse.json({error: "Unable to fetch images"}, {status: 500});

    }
}

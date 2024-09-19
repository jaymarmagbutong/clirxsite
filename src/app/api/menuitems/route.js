// app/api/menuItems/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    // Resolve the path relative to the project root
    const filePath = path.resolve('./src/app/libs/menuItems.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading menu items:', error);
    return NextResponse.json({ error: 'Failed to load menu items' }, { status: 500 });
  }
}

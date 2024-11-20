// app/libs/getUserServer.js
import { getToken } from 'next-auth/jwt';

// Function to get user info from session in an API route
async function getUserServerInfo(request) {

    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        // return token;
        if (!token) { 
            return null; // Return null if no token
        }

        // Return user info from the token
        return {
            id: token.id,
            email: token.email,
            name: token.name,
            role: token.role,
        };

    } catch (error) {
        console.error('Error getting user info from session:', error);
        throw new Error('Failed to retrieve user information');
    }
}

export default getUserServerInfo; // Ensure this is present

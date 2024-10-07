import { getSession } from "next-auth/react";

// Function to get user info from the session without req
async function getUserInfo() {
  try {
    const session = await getSession(); // Get the session without needing req

    if (!session || !session.user) {
      return null; // Return null if no session or user
    }

    // Extract user info from the session
    const user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role
    };

    return user; // Return user info from the session
  } catch (error) {
    console.error('Error getting user info from session:', error);
    throw new Error('Failed to retrieve user information');
  }
}

export default getUserInfo;

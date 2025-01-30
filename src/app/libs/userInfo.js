import { useSession } from "next-auth/react";

// Custom hook to get user info from the session
export const useUserInfo = () => {
  const { data: session, status } = useSession(); // Get the session

  if (status === "loading") {
    return null; // Return null if the session is still loading
  }

  if (status === "unauthenticated" || !session?.user) {
    return null; // Return null if there's no session or user
  }

  // Extract user info from the session
  const user = {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role
  };

  return user; // Return user info from the session
};

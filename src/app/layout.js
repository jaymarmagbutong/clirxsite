import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { SocketProvider } from "./context/SocketContext";
import io from 'socket.io-client';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CliRx",
  description: "This is just a local testing site",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SocketProvider>
          {children}
          </SocketProvider>
          
        </AuthProvider>
      </body>
    </html>
  );
}

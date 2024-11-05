import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import io from 'socket.io-client';
const socket = io('http://localhost:8080/');


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CliRx",
  description: "This is just a local testing site",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}

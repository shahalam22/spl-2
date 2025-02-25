import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import ClientWrapper from "@/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Connect4Change",
  description: "A platform for sharing and requesting resources, events, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-arp="">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
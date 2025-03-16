import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "@/components/navigation-bar";

export const metadata: Metadata = {
  title: "Captain Quill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FDF7F2]">
        <NavigationBar></NavigationBar>
        {children}

        <footer className="bottom-0 bg-[#1F2937] text-center py-4 text-white">
          Captain Quill. All Rights Reserved.
        </footer>
      </body>
    </html>
  );
}

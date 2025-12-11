import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ableton.js Demo",
  description: "Web UI demo for controlling Ableton Live via ableton-js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

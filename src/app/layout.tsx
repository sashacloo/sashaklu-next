import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sasha klu",
  description: "welcome to the world of sasha klu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Natasha | Senior Software Engineer",
  description: "Senior Software Engineer • Creative Mind • Saurabh's Girlfriend",
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

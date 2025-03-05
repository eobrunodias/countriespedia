import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "400", "900"],
});

export const metadata: Metadata = {
  title: "Countriespedia",
  description: "A wikipedia of countries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased vsc-initialized`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "./components";

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
        <Header />
        <main className={`flex-1 items-center justify-center`}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

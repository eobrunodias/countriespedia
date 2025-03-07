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
      <body
        className={`${inter.className} antialiased vsc-initialized px-10 md:px-16 lg:px-24`}
      >
        <Header />
        <main className={`flex flex-col flex-1`}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

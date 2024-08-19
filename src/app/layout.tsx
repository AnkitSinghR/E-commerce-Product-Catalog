import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./services/provider";
import "./globals.css";
import Navbar from "./component/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Product Catalog",
  description: "Developed by Happiest Minds Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

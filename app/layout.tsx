import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitPeek",
  description: "Secure read-only links for your private Git repositories",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Provider>
      <html lang="en">
        <body className={`${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </Provider>
  );
}

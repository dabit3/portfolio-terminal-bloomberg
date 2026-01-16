import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Nader Dabit | Terminal Portfolio",
  description: "Developer, writer, and builder. Explore my work through an interactive terminal interface.",
  keywords: ["Nader Dabit", "developer", "portfolio", "React", "Web3", "AI", "terminal"],
  authors: [{ name: "Nader Dabit" }],
  openGraph: {
    title: "Nader Dabit | Terminal Portfolio",
    description: "Developer, writer, and builder. Explore my work through an interactive terminal interface.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nader Dabit | Terminal Portfolio",
    description: "Developer, writer, and builder. Explore my work through an interactive terminal interface.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

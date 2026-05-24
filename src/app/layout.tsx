import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manav Ananthakumar — Portfolio",
  description:
    "Data Engineer & AI/LLM Builder. MS Data Science @ ASU. 2+ years at Shell, Bosch, and Deloitte.",
  openGraph: {
    title: "Manav Ananthakumar — Portfolio",
    description: "Data Engineer & AI/LLM Builder. MS Data Science @ ASU.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANSH CLOUD — Deployment Dashboard",
  description: "A starter dashboard for your own hosting platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { checkApiKey } from "~/lib/check-api";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "rizz app but thai",
  description: "Best Ai Assistant Dating in Thai Langauge",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isChatGPTApiTokenAvaliable = await checkApiKey();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isChatGPTApiTokenAvaliable ? (
          <div>{children}</div>
        ) : (
          <div>No money for api keys!</div>
        )}
      </body>
    </html>
  );
}

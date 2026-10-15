import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Nunito } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "for nikkie",
  description:
    "A friendship letter for Nikkie, from Lovely Professional University.",
  applicationName: "for nikkie",
  appleWebApp: {
    capable: true,
    title: "for nikkie",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4e7e4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${caveat.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

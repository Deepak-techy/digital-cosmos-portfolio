import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Digital Cosmos | Deepak Chandra Kalita — Software Engineer",
  description:
    "An immersive journey through the digital universe of a software engineer. Explore projects, skills, and experience through interactive storytelling.",
  openGraph: {
    title: "Digital Cosmos",
    description:
      "Explore the digital universe of Deepak Chandra Kalita — Software Engineer",
    type: "website",
    images: ["/images/og/og-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-void text-light">{children}</body>
    </html>
  );
}

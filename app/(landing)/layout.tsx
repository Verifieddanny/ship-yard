import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#131313",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Shipyard | High-Performance CI/CD Engine",
    template: "%s | Shipyard",
  },
  description: "Connect your GitHub repo and deploy in seconds. Shipyard handles cloning, containerized builds, and subdomain routing with real-time log streaming.",
  keywords: ["CI/CD", "Docker", "GitHub OAuth", "Automated Deployment", "Software Engineering", "Shipyard"],
  authors: [{ name: "Daniel Chigozirim Nwachukwu", url: "https://useshipyard.xyz" }],
  metadataBase: new URL("https://useshipyard.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shipyard — Your Code, Deployed.",
    description: "A developer-first CI/CD pipeline built for speed and transparency. Real-time builds, encrypted secrets, and instant rollbacks.",
    url: "https://useshipyard.xyz",
    siteName: "Shipyard",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Shipyard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipyard | CI/CD Engine",
    description: "From Git Push to Subdomain in seconds. Watch your builds live.",
    creator: "@dannyclassi_c", 
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}

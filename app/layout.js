import Script from 'next/script';
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import Footer from "@/components/Footer";
import { getPortfolioSchema, getPersonSchema, getOrganizationSchema } from "@/lib/jsonld-schemas";
import { SITE_CONFIG, buildUrl } from "@/lib/config";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

// Runs before first paint: if the intro already played this tab session,
// flag <html> so the loader overlay is hidden via CSS with no flash.
const introGuard = `try{if(sessionStorage.getItem('introPlayed')==='1')document.documentElement.classList.add('intro-played')}catch(e){}`;

export const metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.siteName,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.images.ogImage,
        width: 1200,
        height: 630,
        alt: "Abrar Jahin portfolio open graph image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.images.ogImage],
  },
};

export default function RootLayout({ children }) {
  const portfolioSchema = getPortfolioSchema();
  const personSchema = getPersonSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrains.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGuard }} />
        <Script
          id="json-ld-portfolio"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(portfolioSchema),
          }}
          strategy="afterInteractive"
        />
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
          strategy="afterInteractive"
        />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <PageLoader>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </PageLoader>
      </body>
    </html>
  );
}

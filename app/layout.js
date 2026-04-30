import Script from 'next/script';
import { Exo_2 } from "next/font/google";
import "@/app/globals.css";
import GlassSVG from "@/components/GlassSVG";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import Footer from "@/components/Footer";
import { getPortfolioSchema, getPersonSchema, getOrganizationSchema } from "@/lib/jsonld-schemas";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abrar Jahin's Portfolio",
  description: "Welcome to my portfolio website! I'm Abrar Jahin, a passionate software developer specializing in web development and design. Here, you'll find a showcase of my projects, skills, and experience. Feel free to explore and get in touch if you'd like to collaborate or learn more about my work.",
  metadataBase: new URL("https://ajpalok.github.io"),
  openGraph: {
    type: "website",
    siteName: "Abrar Jahin's Portfolio",
    title: "Abrar Jahin's Portfolio",
    description: "Welcome to my portfolio website! I'm Abrar Jahin, a passionate software developer specializing in web development and design. Here, you'll find a showcase of my projects, skills, and experience. Feel free to explore and get in touch if you'd like to collaborate or learn more about my work.",
    images: [
      {
        url: "/assets/images/me/Abrar_OpenGraph_Image.png",
        width: 1200,
        height: 630,
        alt: "Abrar Jahin portfolio open graph image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abrar Jahin's Portfolio",
    description: "Welcome to my portfolio website! I'm Abrar Jahin, a passionate software developer specializing in web development and design. Here, you'll find a showcase of my projects, skills, and experience. Feel free to explore and get in touch if you'd like to collaborate or learn more about my work.",
    images: ["/assets/images/me/Abrar_OpenGraph_Image.png"],
  },
};

export default function RootLayout({ children }) {
  const portfolioSchema = getPortfolioSchema();
  const personSchema = getPersonSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${exo2.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
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
          <GlassSVG />
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

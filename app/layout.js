import { Exo_2 } from "next/font/google";
import "@/app/globals.css";
import GlassSVG from "@/components/GlassSVG";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import Footer from "@/components/Footer";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abrar Jahin's Portfolio",
  description: "Welcome to my portfolio website! I'm Abrar Jahin, a passionate software developer specializing in web development and design. Here, you'll find a showcase of my projects, skills, and experience. Feel free to explore and get in touch if you'd like to collaborate or learn more about my work.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
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

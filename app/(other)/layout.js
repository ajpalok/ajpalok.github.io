import "@/app/globals.css"
import GlassSVG from "@/components/GlassSVG";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";

export const metadata = {
  title: "Abrar Jahin's Portfolio",
  description: "Welcome to my portfolio website! I'm Abrar Jahin, a passionate software developer specializing in web development and design. Here, you'll find a showcase of my projects, skills, and experience. Feel free to explore and get in touch if you'd like to collaborate or learn more about my work.",
};

export default function OtherLayout({ children }) {
  return (
    <>
        <PageLoader>
            <GlassSVG />
            <Navbar />
            {children}
        </PageLoader>
    </>
  );
}

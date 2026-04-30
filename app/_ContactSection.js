"use client";

import React, { useRef, useState, useEffect } from "react";
// import gsap from "gsap";
import { IndividualIcon } from "@/components/SVGS";
import { details } from '@/components/contact';

export default function ContactSection() {
    const submittedRef = useRef(false);
    const formRef = useRef(null);
    const [success, setSuccess] = useState(false);

    // // Animation for the changing word in the heading (e.g., "Amazing", "Together")
    // const wordRef = useRef(null);
    // const words = ["Amazing", "Together"];

    // useEffect(() => {
    //     let index = 0;

    //     const animate = () => {
    //         const el = wordRef.current;
    //         if (!el) return;

    //         gsap.to(el, {
    //             y: -20,
    //             opacity: 0,
    //             duration: 0.4,
    //             ease: "power2.out",
    //             onComplete: () => {
    //                 index = (index + 1) % words.length;
    //                 el.textContent = words[index];

    //                 gsap.fromTo(
    //                     el,
    //                     { y: 20, opacity: 0 },
    //                     { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    //                 );
    //             }
    //         });
    //     };

    //     const interval = setInterval(animate, 2500);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <section
            id="contact"
            className="w-full relative bg-[#050505] text-white py-16 px-6 lg:px-24 pb-18 md:pb-36 md:px-12"
        >

            {/* SVG Pattern Background with Gradient Blobs */}
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">

                {/* Gradient Blobs using Tailwind */}
                <span className="hidden md:block absolute top-5 right-1/4 w-96 h-96 bg-linear-to-br from-gray-600 to-gray-800 rounded-full filter blur-3xl opacity-20 mix-blend-multiply"></span>
                <span className="hidden md:block absolute top-1/5 right-2/3 w-80 h-80 bg-linear-to-tl from-gray-700 to-gray-500 rounded-full filter blur-3xl opacity-15 mix-blend-screen"></span>
                {/* <span className="hidden md:block absolute top-1/3 right-1/4 w-72 h-72 bg-linear-to-b from-gray-500 via-gray-700 to-gray-900 rounded-full filter blur-2xl opacity-10 mix-blend-multiply"></span> */}

                {/* Subtle Radial Gradient Vignette */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 100%)'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="mb-12 space-y-4 max-w-2xl text-center mx-auto">
                    {/* <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500">
                        Contact
                    </p> */}

                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] hover:bg-[#222] border border-white/10 transition-colors group cursor-default">
                        Get in touch
                    </span>


                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                        Let's Build Something{" "}
                        <span
                        // ref={wordRef}
                        className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">
                            Amazing.
                        </span>
                    </h2>

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        Want to collaborate? Let's contact!
                    </p>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    {/* Left Info */}
                    <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
                            <div className="py-6 px-9 text-center bg-[#0e1011] text-gray-500 border border-white/10 rounded-md">
                                <div className="w-fit flex justify-center p-4 mb-2 mx-auto rounded-full bg-gray-600/30">
                                    <IndividualIcon iconName="mail" className="w-6 h-6 mx-auto fill-white" />
                                </div>
                                <p>Email</p>
                                <a href={`mailto:${details.email}`} className="text-white normal-case tracking-normal text-sm">
                                    {details.email}
                                </a>
                            </div>

                            <div className="py-6 px-9 text-center bg-[#0e1011] text-gray-500 border border-white/10 rounded-md">
                                <div className="w-fit flex justify-center p-4 mb-2 mx-auto rounded-full bg-gray-600/30">
                                    <IndividualIcon iconName="phone" className="w-6 h-6 mx-auto fill-white" />
                                </div>
                                <p>Phone</p>
                                <a href={`tel:${details.phone}`} className="text-white normal-case tracking-normal text-sm">
                                    {details.phone}
                                </a>
                            </div>
                        </div>

                        {/* Availability Info */}
                        <div className="space-y-2 text-xs font-mono text-gray-500 mx-auto mt-12 text-center py-6 px-9 bg-[#0e1011] border border-white/10 rounded-md">
                            <p
                                className="text-white text-sm relative inline-flex items-center gap-2"
                            >
                                <span className="relative flex size-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-100 opacity-75"></span>
                                    <span className="relative inline-flex size-3 rounded-full bg-white"></span>
                                </span>
                                Available Now
                            </p>
                            <p className="text-gray-400 text-sm">
                                Open for collaboration, freelance work and discussing system
                                    design ideas.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        ref={formRef}
                        action="https://docs.google.com/forms/d/e/1FAIpQLSdd3R43uVOLYIVVEy9OlptTI_v3rqknGUhCXC9we8TpYk1A_Q/formResponse"
                        method="POST"
                        target="hidden_iframe"
                        onSubmit={() => {
                            submittedRef.current = true;
                        }}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-gray-500">
                                Name
                            </label>
                            <input
                                type="text"
                                name="entry.835553833"
                                required
                                className="w-full bg-[#0e1011] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-gray-500">
                                Email
                            </label>
                            <input
                                type="email"
                                name="entry.2032932832"
                                required
                                className="w-full bg-[#0e1011] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-gray-500">
                                Message
                            </label>
                            <textarea
                                name="entry.675359573"
                                required
                                rows={4}
                                className="w-full bg-[#0e1011] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition resize-none"
                                placeholder="Your message"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-semibold py-3 rounded-md text-sm hover:bg-gray-200 transition-colors"
                        >
                            Send Message
                        </button>

                        {/* Success message */}
                        {success && (
                            <p className="text-sm text-gray-300 pt-2">
                                Message sent successfully. I will get back to you.
                            </p>
                        )}
                    </form>
                </div>

            </div>

            {/* Hidden iframe */}
            <iframe
                name="hidden_iframe"
                style={{ display: "none" }}
                onLoad={() => {
                    if (submittedRef.current) {
                        setSuccess(true);
                        formRef.current?.reset();
                        submittedRef.current = false;
                    }
                }}
            />
        </section>
    );
}
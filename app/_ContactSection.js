"use client";

import React, { useRef, useState, useEffect } from "react";
// import gsap from "gsap";
import { IndividualIcon } from "@/components/SVGS";
import { contactDetails } from '@/lib/contactDetails';

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
            className="w-full relative bg-paper text-ink py-20 md:py-28 px-6 lg:px-24 pb-24 md:pb-36 md:px-12 overflow-hidden"
        >
            {/* Blueprint texture + soft accent glow */}
            <div className="absolute inset-0 bg-blueprint pointer-events-none select-none z-0" />
            <span className="hidden md:block absolute -top-10 right-10 w-96 h-96 rounded-full bg-accent-tint blur-3xl opacity-60 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Heading */}
                <div className="mb-14 space-y-4 max-w-2xl text-center mx-auto">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-tint border border-accent/30 text-accent-ink font-mono text-[11px] uppercase tracking-[0.2em]">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Get in touch
                    </span>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[0.95]">
                        Let's Build Something Amazing<span className="text-accent">.</span>
                    </h2>

                    <p className="text-ink-2 text-sm md:text-base leading-relaxed">
                        Got a system worth designing? Let's talk.
                    </p>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    {/* Left Info */}
                    <div className="space-y-6 text-ink-2 text-sm leading-relaxed">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
                            <div className="py-6 px-9 text-center bg-paper-2 text-ink-3 border border-line rounded-md">
                                <div className="w-fit flex justify-center p-4 mb-2 mx-auto rounded-full bg-accent-tint">
                                    <IndividualIcon iconName="mail" className="w-6 h-6 mx-auto fill-accent" />
                                </div>
                                <p>Email</p>
                                <a href={`mailto:${contactDetails.email}`} className="text-ink normal-case tracking-normal text-sm hover:text-accent transition-colors">
                                    {contactDetails.email}
                                </a>
                            </div>

                            <div className="py-6 px-9 text-center bg-paper-2 text-ink-3 border border-line rounded-md">
                                <div className="w-fit flex justify-center p-4 mb-2 mx-auto rounded-full bg-accent-tint">
                                    <IndividualIcon iconName="phone" className="w-6 h-6 mx-auto fill-accent" />
                                </div>
                                <p>Phone</p>
                                <a href={`tel:${contactDetails.phone}`} className="text-ink normal-case tracking-normal text-sm hover:text-accent transition-colors">
                                    {contactDetails.phone}
                                </a>
                            </div>
                        </div>

                        {/* Availability Info */}
                        <div className="space-y-2 text-xs font-mono text-ink-3 mx-auto mt-12 text-center py-6 px-9 bg-paper-2 border border-line rounded-md">
                            <p className="text-ink text-sm relative inline-flex items-center gap-2">
                                <span className="relative flex size-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex size-3 rounded-full bg-accent"></span>
                                </span>
                                Available Now
                            </p>
                            <p className="text-ink-2 text-sm">
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
                            <label className="text-xs font-mono uppercase tracking-widest text-ink-3">
                                Name
                            </label>
                            <input
                                type="text"
                                name="entry.835553833"
                                required
                                className="w-full bg-paper-2 border border-line rounded-md px-4 py-3 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-accent transition"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-ink-3">
                                Email
                            </label>
                            <input
                                type="email"
                                name="entry.2032932832"
                                required
                                className="w-full bg-paper-2 border border-line rounded-md px-4 py-3 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-accent transition"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-ink-3">
                                Message
                            </label>
                            <textarea
                                name="entry.675359573"
                                required
                                rows={4}
                                className="w-full bg-paper-2 border border-line rounded-md px-4 py-3 text-sm text-ink placeholder-ink-3 focus:outline-none focus:border-accent transition resize-none"
                                placeholder="Your message"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-ink text-paper font-semibold py-3 rounded-md text-sm hover:bg-accent transition-colors"
                        >
                            Send Message
                        </button>

                        {/* Success message */}
                        {success && (
                            <p className="text-sm text-accent-2 pt-2">
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
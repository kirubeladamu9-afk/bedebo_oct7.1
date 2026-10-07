"use client"
import SectionTitle from "@/components/SectionTitle";
import { useThemeContext } from "@/context/ThemeContext";
import { companiesLogo } from "@/data/companiesLogo";
import { featuresData } from "@/data/featuresData";
import OurImpact from "@/sections/OurImpact";
import GetInvolved from "@/sections/GetInvolved";
import CoreValues from "@/sections/CoreValues";
import OurStory from "@/sections/OurStory";
import OurBlogs from "@/sections/OurBlogs";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Marquee from "react-fast-marquee";

export default function Page() {
    const { theme } = useThemeContext();
    return (
        <>
            <section
                className="bedebo-hero"
                aria-labelledby="hero-heading"
                style={{ backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets%2F1284462c73094a1f9485fd79b4e21dca%2F2f20b077d2c64a60890b8e3a444ac5ce?format=webp&width=1920&height=810')" }}
            >
                <div className="bedebo-hero-content bedebo-site-container">
                    <h1 id="hero-heading" className="bedebo-hero-heading">
                        Empowering Ethiopian<br className="bedebo-desktop-break" />{" "}
                        Agriculture Through<br className="bedebo-desktop-break" />{" "}
                        <span>Innovation</span>
                    </h1>
                    <p className="bedebo-hero-subheadline">
                        Integrating digital solutions and sustainable energy for a thriving future
                    </p>
                    <p className="bedebo-hero-copy">
                        At Bedebo, we are revolutionizing the agricultural value chain in Ethiopia. Through digital platforms and eco-friendly energy solutions, we are enhancing livelihoods, reducing post-harvest losses, and empowering small-scale farmers and women. Join us on our journey towards a sustainable agricultural future.
                    </p>
                    <button type="button" className="bedebo-hero-button">
                        Download Bedebo Apps
                        <ArrowRight aria-hidden="true" size={22} strokeWidth={2} />
                    </button>
                </div>
            </section>

            <section className="bedebo-logo-strip pt-8">
                <div className="bedebo-site-container">
                    <h3 className="pb-7 text-center text-base font-medium text-slate-400">
                        Trusting by leading brands, including —
                    </h3>
                    <div className="bedebo-logo-marquee">
                        <Marquee className="mx-auto max-w-5xl pb-12" gradient={true} speed={25} gradientColor={theme === "dark" ? "#0A120E" : "#fff"}>
                            <div className="flex items-center justify-center">
                                {[...companiesLogo, ...companiesLogo].map((company, index) => (
                                    <Image key={index} className="bedebo-logo mx-11" src={company.logo} alt={company.name} width={100} height={100} />
                                ))}
                            </div>
                        </Marquee>
                    </div>
                </div>
            </section>

            <OurStory />

            <section id="solutions" className="scroll-mt-24">
                <div className="bedebo-site-container">
                    <SectionTitle label="OUR SOLUTIONS" title="Our" highlight="Solutions" description="We have a wide range of solutions that we have provided" headingId="solutions-title" />

                    <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
                        {featuresData.map((feature) => (
                            <div key={feature.title} className="flex h-full min-h-[320px] flex-col items-center space-y-3 rounded-xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#3DB268]/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/20">
                                <feature.icon className="mt-4 size-10 text-[#3DB268]" strokeWidth={1.3} />
                                <h3 className="min-h-[2.6em] text-base font-medium leading-[1.3]">{feature.title}</h3>
                                <p className="text-[0.9rem] leading-[1.6] text-slate-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <OurImpact />

            <GetInvolved />

            <CoreValues />

            <OurBlogs />


        </>
    );
}

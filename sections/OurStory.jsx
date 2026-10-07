import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

export default function OurStory() {
    return (
        <section id="about" aria-labelledby="our-story-title" className="scroll-mt-20 pt-24 pb-12 md:pt-32 md:pb-8">
            <div className="bedebo-site-container grid grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-20">
                <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                    <div className="absolute bottom-0 left-0 z-0 h-[36%] w-[44%] opacity-60" style={{ backgroundImage: "radial-gradient(#3DB268 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }} />
                    <div className="absolute inset-0 z-10 overflow-hidden rounded-full border-[3px] border-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] dark:border-slate-950">
                        <Image fill sizes="(max-width: 768px) 100vw, 420px" className="object-cover" src="/assets/about-image.webp" alt="Combine harvester working in a sunlit field" />
                    </div>
                </div>

                <div className="max-w-xl">
                    <SectionTitle
                        label="ABOUT US"
                        title="Let's Talk About"
                        highlight="Company"
                        alignment="left"
                        className="section-header--flush"
                        headingId="our-story-title"
                        description={(
                            <p className="about-description">
                                Founded by visionaries from the Ethiopian diaspora, Bedebo is committed to transforming Ethiopian agriculture into a sustainable, productive, and profitable sector. Our integrated approach brings modern technology and renewable energy solutions to the heart of Ethiopia&apos;s farming communities.
                            </p>
                        )}
                    />
                    <blockquote className="about-quote">
                        <span className="about-quote-mark about-quote-mark--open" aria-hidden="true">“</span>
                        <p>
                            To leverage digital innovation and sustainable energy to improve market access, productivity<span className="about-quote-mark about-quote-mark--close" aria-hidden="true">”</span>
                        </p>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}

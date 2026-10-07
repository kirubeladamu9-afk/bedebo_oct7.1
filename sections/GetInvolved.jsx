import SectionTitle from "@/components/SectionTitle";
import { Handshake, Network, Sprout } from "lucide-react";

const involvementOptions = [
    {
        icon: Sprout,
        title: "For Farmers and Agricultural Service Providers",
        description: "Enhance your farming with Bedebo. Boost yields and market access through our digital and sustainable solutions.",
    },
    {
        icon: Handshake,
        title: "For Partners and Investors",
        description: "Support Ethiopian agriculture's transformation with your partnership or investment. Join us in making a lasting impact.",
    },
    {
        icon: Network,
        title: "For Vendors and Wholesalers",
        description: "Access quality, sustainably sourced agricultural products. Partner with Bedebo to improve your supply chain's reliability and sustainability.",
    },
];

export default function GetInvolved() {
    return (
        <section id="get-involved" aria-labelledby="get-involved-title" className="scroll-mt-24">
            <div className="bedebo-site-container">
                <SectionTitle label="GET INVOLVED" title="Get" highlight="Involved" description="How can you get involved with Bedebo's operation?" headingId="get-involved-title" />
                <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
                    {involvementOptions.map(({ icon: Icon, title, description }) => (
                        <article key={title} className="flex h-[360px] flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-[0_4px_18px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#3DB268] hover:shadow-[0_12px_28px_rgba(61,178,104,0.12)] dark:border-slate-800 dark:bg-slate-800/20">
                            <Icon className="mb-5 size-8 shrink-0 text-[#3DB268]" strokeWidth={1.5} />
                            <h3 className="min-h-[3.6em] text-center text-[15px] font-semibold leading-[1.2]">{title}</h3>
                            <p className="mt-3 text-center text-[0.95rem] leading-[1.6] text-slate-500 dark:text-slate-400">{description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

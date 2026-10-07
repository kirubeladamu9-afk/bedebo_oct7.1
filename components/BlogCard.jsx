import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ article }) {
    const publishedDate = new Date(`${article.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

    return (
        <article className="group flex h-[520px] flex-col rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_4px_18px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3DB268] hover:shadow-[0_14px_32px_rgba(61,178,104,0.14)] motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-800/20">
            <Link href={`/blog/${article.slug}`} aria-label={`Read ${article.title}`} className="relative block aspect-video shrink-0 overflow-hidden rounded-lg bg-[#3DB268]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268]">
                <Image fill loading="lazy" decoding="async" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" src={article.coverImage} alt={article.coverImageAlt} />
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#3DB268]/10 mix-blend-multiply" />
            </Link>
            <div className="mt-4 flex flex-1 flex-col">
                <span className="text-sm font-semibold leading-5 text-[#267A47] dark:text-[#75D59A]">{article.category}</span>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{publishedDate} <span aria-hidden="true">·</span> {article.readTime}</p>
                <h3 className="mt-3 line-clamp-2 min-h-14 text-lg font-semibold leading-7 tracking-tight">
                    <Link href={`/blog/${article.slug}`} className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268]">{article.title}</Link>
                </h3>
                <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-500 dark:text-slate-400">{article.excerpt}</p>
                <Link href={`/blog/${article.slug}`} className="mt-auto inline-flex items-center gap-2 rounded-sm pt-4 text-sm font-semibold text-[#267A47] transition-colors hover:text-[#1E663A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:text-[#75D59A] dark:hover:text-[#B5E8C6]">
                    Read more
                    <ArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
}

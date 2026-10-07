"use client";

import BlogCard from "@/components/BlogCard";
import { ArrowLeft, ArrowRight, ArrowUpRight, Copy, Facebook, Linkedin, Mail, MessageCircle, Search, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const socialIconMap = { LinkedIn: Linkedin, X: Twitter, Facebook, WhatsApp: MessageCircle, Email: Mail };

function ShareLinks({ post, onCopy, copied, compact = false }) {
    const [shareUrl, setShareUrl] = useState("");
    useEffect(() => setShareUrl(window.location.href), [post.slug]);
    const url = encodeURIComponent(shareUrl);
    const title = encodeURIComponent(post.title);
    const links = [
        { label: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
        { label: "X", icon: Twitter, href: `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
        { label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
        { label: "WhatsApp", icon: MessageCircle, href: `https://api.whatsapp.com/send?text=${title}%20${url}` },
    ];
    const controlClass = "inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-[#3DB268] hover:text-[#267A47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:border-slate-700 dark:text-slate-200 dark:hover:text-[#75D59A]";

    return (
        <div className={`flex ${compact ? "flex-nowrap gap-2 overflow-x-auto" : "flex-wrap gap-2"}`}>
            <button type="button" onClick={onCopy} className={controlClass} aria-label={copied ? "Article link copied" : "Copy article link"} title={copied ? "Copied" : "Copy link"}>
                <Copy size={16} aria-hidden="true" />
                <span className="sr-only">{compact ? "Copy article link" : copied ? "Copied" : "Copy link"}</span>
            </button>
            {links.map(({ label, icon: Icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`} title={`Share on ${label}`} className={controlClass}>
                    <Icon size={16} aria-hidden="true" />
                </a>
            ))}
        </div>
    );
}

function ArticleBlock({ block }) {
    if (block.type === "paragraph") return <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{block.text}</p>;
    if (block.type === "heading") {
        const Heading = block.level === 3 ? "h3" : "h2";
        return <Heading id={block.id} className={block.level === 3 ? "scroll-mt-28 pt-2 text-xl font-semibold leading-tight tracking-tight" : "scroll-mt-28 pt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"}>{block.text}</Heading>;
    }
    if (block.type === "list") {
        const List = block.ordered ? "ol" : "ul";
        return <List className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-3 pl-6 text-base leading-7 text-slate-600 marker:text-[#3DB268] dark:text-slate-300`}>{block.items.map((item) => <li key={item} className="pl-1">{item}</li>)}</List>;
    }
    if (block.type === "image") return (
        <figure className="space-y-3 py-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#3DB268]/10">
                <Image fill loading="lazy" sizes="(max-width: 768px) 100vw, 720px" src={block.src} alt={block.alt} className="object-cover" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#3DB268]/10 mix-blend-multiply" />
            </div>
            <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400">{block.caption}</figcaption>
        </figure>
    );
    if (block.type === "quote") return <blockquote className="rounded-r-xl border-l-4 border-[#3DB268] bg-[#3DB268]/[0.07] px-6 py-5 text-lg font-medium leading-7 text-slate-700 dark:text-slate-200">“{block.text}”</blockquote>;
    if (block.type === "dataCallout") return (
        <section aria-label={block.title} className="rounded-2xl border border-[#3DB268]/30 bg-[#3DB268]/[0.06] p-5 sm:p-6">
            <h3 className="font-semibold">{block.title}</h3>
            <dl className="mt-4 divide-y divide-[#3DB268]/15">{block.rows.map(([label, value]) => <div key={label} className="grid grid-cols-[6rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[8rem_1fr]"><dt className="font-medium text-[#267A47] dark:text-[#75D59A]">{label}</dt><dd className="text-slate-600 dark:text-slate-300">{value}</dd></div>)}</dl>
        </section>
    );
    if (block.type === "takeaways") return (
        <section aria-label={block.title} className="rounded-2xl border border-[#3DB268]/25 bg-[#3DB268]/[0.08] p-6">
            <h3 className="text-lg font-semibold">{block.title}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{block.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#3DB268]" />{item}</li>)}</ul>
        </section>
    );
    return null;
}

export default function BlogArticle({ post, allPosts, previousPost, nextPost, relatedPosts }) {
    const [activeSection, setActiveSection] = useState("");
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const pageRef = useRef(null);
    const progressBarRef = useRef(null);
    const contents = useMemo(() => post.body.filter((block) => block.type === "heading").map(({ id, text, level }) => ({ id, text, level })), [post.body]);
    const categories = useMemo(() => [...new Set(allPosts.map((article) => article.category))], [allPosts]);
    const searchResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return query ? allPosts.filter((article) => `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query)).slice(0, 3) : [];
    }, [allPosts, searchQuery]);

    useEffect(() => {
        let frame = 0;
        let maxScroll = 0;
        const updateProgress = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(() => {
                frame = 0;
                const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
                if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${progress})`;
            });
        };
        const measureScrollRange = () => {
            maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            updateProgress();
        };
        const resizeObserver = new ResizeObserver(measureScrollRange);
        if (pageRef.current) resizeObserver.observe(pageRef.current);
        measureScrollRange();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", measureScrollRange);
        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", measureScrollRange);
            resizeObserver.disconnect();
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    useEffect(() => {
        const headings = Array.from(document.querySelectorAll("#article-body h2[id], #article-body h3[id]"));
        if (!headings.length) return;
        setActiveSection(headings[0].id);
        const observer = new IntersectionObserver((entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (visible.length) setActiveSection(visible[0].target.id);
        }, { rootMargin: "-15% 0px -70% 0px" });
        headings.forEach((heading) => observer.observe(heading));
        return () => observer.disconnect();
    }, [post.slug]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.01 });
        if (pageRef.current) observer.observe(pageRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    };
    const jumpLink = (heading) => <a key={heading.id} href={`#${heading.id}`} onClick={() => setActiveSection(heading.id)} aria-current={activeSection === heading.id ? "location" : undefined} className={`block rounded-md py-1.5 text-sm transition-colors hover:text-[#267A47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:hover:text-[#75D59A] ${heading.level === 3 ? "pl-4" : "font-medium"} ${activeSection === heading.id ? "text-[#267A47] dark:text-[#75D59A]" : "text-slate-500 dark:text-slate-400"}`}>{heading.text}</a>;

    return (
        <main ref={pageRef} className="relative px-6 pb-16 pt-28 md:px-10 lg:px-16">
            <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 bg-slate-200/70 dark:bg-slate-800"><div ref={progressBarRef} className="h-full origin-left bg-[#3DB268]" style={{ transform: "scaleX(0)" }} /></div>
            <span aria-hidden="true" className="pointer-events-none absolute right-0 top-20 -z-10 size-[30rem] rounded-full bg-[#3DB268]/[0.07] blur-3xl" />
            <div className={`mx-auto max-w-7xl transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Link href="/" className="rounded-sm hover:text-[#267A47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:hover:text-[#75D59A]">Home</Link><span aria-hidden="true">/</span>
                    <Link href="/#blog" className="rounded-sm hover:text-[#267A47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:hover:text-[#75D59A]">Blog</Link><span aria-hidden="true">/</span>
                    <span className="max-w-[min(60vw,32rem)] truncate text-slate-700 dark:text-slate-200" aria-current="page">{post.title}</span>
                </nav>
                <Link href="/#blog" className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-[#267A47] hover:text-[#1E663A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:text-[#75D59A]"><ArrowLeft size={16} />Back to all articles</Link>
                <header className="mx-auto mt-10 max-w-4xl text-center">
                    <span className="inline-flex rounded-full border border-[#3DB268]/20 bg-[#3DB268]/10 px-4 py-1.5 text-sm font-semibold text-[#267A47] dark:text-[#75D59A]">{post.category}</span>
                    <h1 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[3.5rem]">{post.title}</h1>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">{post.excerpt}</p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2.5 text-left"><Image src={post.author.avatar} alt={`${post.author.name} portrait`} width={40} height={40} className="size-10 rounded-full object-cover" /><span><span className="block font-semibold text-slate-800 dark:text-white">{post.author.name}</span><span className="text-xs">{post.author.role}</span></span></div>
                        <time dateTime={post.date}>{new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time><span aria-hidden="true">·</span><span>{post.readTime}</span><span aria-hidden="true">·</span><span>{post.views} views</span>
                    </div>
                </header>
                <figure className="mx-auto mt-10 max-w-6xl">
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#3DB268]/10 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:rounded-3xl"><Image fill priority sizes="(max-width: 768px) 100vw, 1152px" src={post.coverImage} alt={post.coverImageAlt} className="object-cover" /><span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3DB268]/10 via-transparent to-[#267A47]/15 mix-blend-multiply" /></div>
                    <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">{post.coverCaption}</figcaption>
                </figure>
                <details className="group mt-10 rounded-xl border border-slate-200 bg-white p-4 lg:hidden dark:border-slate-800 dark:bg-slate-900">
                    <summary className="cursor-pointer list-none rounded-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268]">On this page <span aria-hidden="true" className="float-right text-[#267A47] dark:text-[#75D59A]">⌄</span></summary>
                    <nav aria-label="Article contents" className="mt-3 border-t border-slate-200 pt-2 dark:border-slate-800">{contents.map(jumpLink)}</nav>
                </details>
                <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(230px,0.9fr)] lg:gap-8 xl:grid-cols-[minmax(0,720px)_minmax(250px,320px)] xl:justify-between xl:gap-12">
                    <article id="article-body" className="mx-auto flex w-full max-w-[720px] flex-col gap-6 text-base leading-7">
                        {post.body.map((block, index) => <ArticleBlock key={block.id ?? `${block.type}-${index}`} block={block} />)}
                        <div role="group" aria-label="Article tags" className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6 dark:border-slate-800"><span className="mr-1 text-sm font-semibold">Tags</span>{post.tags.map((tag) => <Link key={tag} href="/#blog" className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:border-[#3DB268] hover:text-[#267A47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:border-slate-700 dark:text-slate-300 dark:hover:text-[#75D59A]">{tag}</Link>)}</div>
                        <section aria-labelledby="author-heading" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
                            <h2 id="author-heading" className="sr-only">About the author</h2>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center"><Image src={post.author.avatar} alt={`${post.author.name} portrait`} width={88} height={88} className="size-20 shrink-0 rounded-full object-cover" /><div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-wide text-[#267A47] dark:text-[#75D59A]">Written by</p><h3 className="mt-1 text-lg font-semibold">{post.author.name}</h3><p className="text-sm text-slate-500 dark:text-slate-400">{post.author.role}</p><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.author.bio}</p><div className="mt-3 flex gap-2">{post.author.socialLinks.map((link) => { const Icon = socialIconMap[link.label] ?? ArrowUpRight; return <a key={link.label} href={link.href} target={link.label === "Email" ? undefined : "_blank"} rel={link.label === "Email" ? undefined : "noopener noreferrer"} aria-label={link.label === "Email" ? "Email the author" : `${link.label} profile`} title={link.label} className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-[#267A47] transition hover:border-[#3DB268] hover:bg-[#3DB268]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:border-slate-700 dark:text-[#75D59A]"><Icon size={16} aria-hidden="true" /></a>; })}</div></div></div>
                        </section>
                    </article>
                    <aside className="space-y-5 lg:sticky lg:top-28">
                        <section className="hidden rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block"><h2 className="font-semibold">On this page</h2><nav aria-label="Article contents" className="mt-3">{contents.map(jumpLink)}</nav></section>
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-semibold">Share this article</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Pass this story along.</p><div className="mt-4"><ShareLinks post={post} onCopy={handleCopy} copied={copied} /></div></section>
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-semibold">Search stories</h2><label className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 px-3 focus-within:border-[#3DB268] dark:border-slate-700"><Search size={16} className="shrink-0 text-slate-400" /><input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search articles" className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400" aria-label="Search articles" /></label>{searchQuery && <div className="mt-2 space-y-2">{searchResults.length ? searchResults.map((article) => <Link key={article.slug} href={`/blog/${article.slug}`} className="block rounded-sm text-sm text-[#267A47] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:text-[#75D59A]">{article.title}</Link>) : <p className="text-xs text-slate-500">No matching articles.</p>}</div>}</section>
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-semibold">Categories</h2><ul className="mt-3 space-y-2">{categories.map((category) => <li key={category}><Link href="/#blog" className="rounded-sm text-sm text-slate-600 transition hover:text-[#267A47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:text-slate-300 dark:hover:text-[#75D59A]">{category}</Link></li>)}</ul></section>
                        <section className="rounded-2xl bg-[#267A47] p-5 text-white shadow-[0_14px_32px_rgba(61,178,104,0.18)]"><h2 className="text-lg font-semibold">Grow with us</h2><p className="mt-2 text-sm leading-6 text-white/80">Connect with a community working toward stronger agricultural value chains.</p><Link href="/#get-involved" className="mt-4 inline-flex items-center gap-2 rounded-sm text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get Involved <ArrowUpRight size={15} /></Link></section>
                    </aside>
                </div>
                <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 backdrop-blur xl:hidden dark:border-slate-800 dark:bg-slate-950/95"><ShareLinks post={post} onCopy={handleCopy} copied={copied} compact /></div>
                <nav aria-label="Article navigation" className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2">{[{ article: previousPost, label: "Previous article", icon: ArrowLeft }, { article: nextPost, label: "Next article", icon: ArrowRight }].map(({ article, label, icon: Icon }) => <Link key={label} href={`/blog/${article.slug}`} className="group flex min-h-28 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-[#3DB268] hover:shadow-[0_12px_28px_rgba(61,178,104,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900">{label === "Previous article" && <Image src={article.coverImage} alt="" width={88} height={72} className="h-[72px] w-[88px] shrink-0 rounded-lg object-cover" />}<span className="min-w-0 flex-1"><span className="block text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span><span className="mt-1 line-clamp-2 block font-semibold group-hover:text-[#267A47] dark:group-hover:text-[#75D59A]">{article.title}</span></span>{label === "Next article" && <Image src={article.coverImage} alt="" width={88} height={72} className="h-[72px] w-[88px] shrink-0 rounded-lg object-cover" />}<Icon size={17} className="shrink-0 text-[#267A47] dark:text-[#75D59A]" /></Link>)}</nav>
                <section aria-labelledby="related-heading" className="mx-auto mt-20 max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wide text-[#267A47] dark:text-[#75D59A]">Keep exploring</p><h2 id="related-heading" className="mt-2 text-3xl font-semibold">Related articles</h2></div><Link href="/#blog" className="rounded-sm text-sm font-semibold text-[#267A47] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:text-[#75D59A]">All articles</Link></div><div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{relatedPosts.map((article) => <BlogCard key={article.slug} article={article} />)}</div></section>
                <section aria-labelledby="newsletter-heading" className="mx-auto mt-20 max-w-5xl rounded-3xl bg-[#267A47] px-6 py-10 text-white shadow-[0_24px_60px_rgba(61,178,104,0.18)] sm:px-10 sm:py-12"><div className="grid items-center gap-7 md:grid-cols-[1fr_auto]"><div><p className="text-sm font-semibold uppercase tracking-wide text-white/75">Stay connected</p><h2 id="newsletter-heading" className="mt-2 text-3xl font-semibold">Join the Bedebo community</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/80">Get field stories, practical insights, and updates delivered to your inbox.</p></div><NewsletterForm /></div></section>
            </div>
        </main>
    );
}

function NewsletterForm() {
    const [subscribed, setSubscribed] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubscribed(true);
    };
    return <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row md:w-auto"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" className="h-12 min-w-0 rounded-lg border border-white/30 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-white sm:w-64" /><button type="submit" className="h-12 rounded-lg bg-white px-5 text-sm font-semibold text-[#267A47] transition hover:bg-[#E8F7EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{subscribed ? "Subscribed" : "Subscribe"}</button><span className="sr-only" aria-live="polite">{subscribed ? "Thanks for joining the Bedebo community." : ""}</span></form>;
}

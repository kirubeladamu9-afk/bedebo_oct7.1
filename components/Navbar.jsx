"use client";
import { navLinks } from "@/data/navLinks";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useThemeContext } from "@/context/ThemeContext";

export default function Navbar() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { theme } = useThemeContext();

    useEffect(() => {
        const updateScrolledState = () => setIsScrolled(window.scrollY > 20);
        updateScrolledState();
        window.addEventListener("scroll", updateScrolledState, { passive: true });
        return () => window.removeEventListener("scroll", updateScrolledState);
    }, []);

    useEffect(() => {
        if (openMobileMenu) {
            document.body.classList.add("max-md:overflow-hidden");
        } else {
            document.body.classList.remove("max-md:overflow-hidden");
        }

        return () => document.body.classList.remove("max-md:overflow-hidden");
    }, [openMobileMenu]);

    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
            return;
        }

        const targets = navLinks
            .map(({ href }) => href === "/" ? "home" : href.split("#").pop())
            .filter((target) => target !== "home");

        const updateActiveSection = () => {
            let currentSection = "home";
            targets.forEach((target) => {
                const section = document.getElementById(target);
                if (section && section.getBoundingClientRect().top <= 104) {
                    currentSection = target;
                }
            });
            setActiveSection(currentSection);
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);
        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, [pathname]);

    const resolveHref = (href) => {
        if (pathname === "/" || href === "/") return href;
        return href.startsWith("/#") ? href : `/${href}`;
    };

    const isActiveLink = (link) => {
        if (pathname.startsWith("/blog/")) return link.name === "Blog";
        const target = link.href === "/" ? "home" : link.href.split("#").pop();
        return activeSection === target;
    };

    return (
        <nav className={`bedebo-navbar bedebo-site-container fixed inset-x-0 top-0 z-50 flex items-center justify-between ${isScrolled ? "bedebo-navbar--scrolled" : ""} ${openMobileMenu ? "" : "backdrop-blur"} ${pathname === "/" ? "text-[#1E2841]" : ""}`}>
            <a href="/">
                <Image className="bedebo-navbar-logo h-16 w-auto shrink-0 md:h-17" src="/assets/bedebo-ethiopia.webp" alt="Bedebo Ethiopia" width={140} height={140} priority fetchPriority="high" />
            </a>
            <div className="hidden flex-1 items-center justify-center gap-5 xl:flex xl:gap-7">
                {navLinks.map((link) => {
                    const active = isActiveLink(link);
                    return <Link key={link.name} href={resolveHref(link.href)} aria-current={active ? "location" : undefined} className={`bedebo-nav-link rounded-sm transition-colors hover:text-[#3DB268] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3DB268] ${active ? "font-semibold text-[#3DB268]" : ""}`}>{link.name}</Link>;
                })}
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link href={resolveHref("#contact")} className="hidden rounded-md bg-[#267A47] px-4 py-2 text-white transition hover:bg-[#1E663A] xl:block">
                    Contact Us
                </Link>
                <button onClick={() => setOpenMobileMenu(!openMobileMenu)} className="xl:hidden" aria-label={openMobileMenu ? "Close navigation menu" : "Open navigation menu"}>
                    {openMobileMenu ? <XIcon size={26} /> : <MenuIcon size={26} className="active:scale-90 transition" />}
                </button>
            </div>
            <div className={`bedebo-mobile-menu fixed inset-0 flex flex-col items-center justify-center gap-6 bg-white/60 text-lg font-medium backdrop-blur-md transition duration-300 dark:bg-black/40 xl:hidden ${openMobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
                {navLinks.map((link) => {
                    const active = isActiveLink(link);
                    return <Link key={link.name} href={resolveHref(link.href)} aria-current={active ? "location" : undefined} className={`bedebo-nav-link rounded-sm transition-colors hover:text-[#3DB268] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3DB268] ${active ? "font-semibold text-[#3DB268]" : ""}`} onClick={() => setOpenMobileMenu(false)}>{link.name}</Link>;
                })}
                <Link href={resolveHref("#contact")} className="rounded-md bg-[#267A47] px-6 py-3 text-white transition hover:bg-[#1E663A]" onClick={() => setOpenMobileMenu(false)}>
                    Contact Us
                </Link>
                <button className="flex size-10 items-center justify-center rounded-md bg-[#267A47] text-white transition hover:bg-[#1E663A]" onClick={() => setOpenMobileMenu(false)} aria-label="Close navigation menu">
                    <XIcon />
                </button>
            </div>
        </nav>
    );
}

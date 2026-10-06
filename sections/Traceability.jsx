"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, Check, Image as ImageIcon, Package, PackageCheck, QrCode, Sprout, Truck, Warehouse, Boxes, ClipboardCheck, ShoppingBasket } from "lucide-react";

const traceabilitySteps = [
    {
        title: "Farm",
        actors: "Farmers and producer organizations",
        icon: Sprout,
        preview: "https://images.pexels.com/photos/2049001/pexels-photo-2049001.jpeg",
        previewAlt: "Farmers cultivating a green field",
        previewCaption: "Known origin and planned production",
        actions: [
            "Quality production and organized farmers.",
            "Produce according to planned demand and quality requirements.",
            "A reliable production base with a known origin.",
        ],
    },
    {
        title: "Harvest",
        actors: "Farmers, ASPs, and ALAs",
        icon: ClipboardCheck,
        preview: "https://images.pexels.com/photos/7843985/pexels-photo-7843985.jpeg",
        previewAlt: "Fresh produce prepared for distribution",
        previewCaption: "Standardized harvesting and handling",
        actions: [
            "Standardized harvesting and handling.",
            "ASPs provide mechanization.",
            "ALAs coordinate farmers and capture data in real time.",
        ],
    },
    {
        title: "Aggregate",
        actors: "ASPs and ALAs",
        icon: Boxes,
        preview: "https://images.pexels.com/photos/7513430/pexels-photo-7513430.jpeg",
        previewAlt: "Produce crates organized in a warehouse",
        previewCaption: "Crate-based collection and quality control",
        actions: [
            "Crate-based collection.",
            "Quality control at collection.",
            "Supply and demand are aggregated together.",
        ],
    },
    {
        title: "Cool",
        actors: "Logistics and cold-chain partners",
        icon: Warehouse,
        preview: "https://images.pexels.com/photos/11114142/pexels-photo-11114142.jpeg",
        previewAlt: "Organized storage inside a warehouse",
        previewCaption: "Pre-cooling and cold storage",
        actions: [
            "Pre-cooling after harvest.",
            "Cold storage preserves freshness.",
            "Less post-harvest loss.",
        ],
    },
    {
        title: "Move",
        actors: "Logistics partners and BEDEBO",
        icon: Truck,
        preview: "https://images.pexels.com/photos/12418935/pexels-photo-12418935.jpeg",
        previewAlt: "A delivery truck outside a warehouse",
        previewCaption: "Coordinated, traceable movement",
        actions: [
            "Coordinated transport.",
            "Traceable movement from stage to stage.",
            "Reliable delivery that protects quality.",
        ],
    },
    {
        title: "Grade",
        actors: "BEDEBO and ASPs",
        icon: Check,
        preview: "https://images.pexels.com/photos/7513430/pexels-photo-7513430.jpeg",
        previewAlt: "Produce crates ready for quality checks",
        previewCaption: "Quality classification for the right market",
        actions: [
            "Products classified by quality.",
            "Matched to buyer specifications.",
            "Premium value for premium quality, and affordable channels for other acceptable grades.",
        ],
    },
    {
        title: "Connect",
        actors: "BEDEBO",
        icon: QrCode,
        preview: "https://images.pexels.com/photos/11114142/pexels-photo-11114142.jpeg",
        previewAlt: "Produce inventory organized for distribution",
        previewCaption: "Digital market linkage and payment tracking",
        actions: [
            "Digital market linkage.",
            "Transactions and payment tracking.",
            "One platform links the commercial value chain.",
        ],
    },
    {
        title: "Deliver",
        actors: "Market buyers and final customers",
        icon: ShoppingBasket,
        preview: "https://images.pexels.com/photos/7843985/pexels-photo-7843985.jpeg",
        previewAlt: "Fresh produce ready to reach customers",
        previewCaption: "Freshness, quality, safety, and value",
        actions: [
            "Reliable supply to the right customer.",
            "Buyers set demand and give feedback.",
            "Customers receive freshness, quality, safety, and value.",
        ],
    },
];

function TraceabilityStep({ step, index, active, currentStep, registerBadge }) {
    const Icon = step.icon;
    const isLeft = index % 2 === 0;
    const badgeRef = useCallback((node) => registerBadge(index, node), [index, registerBadge]);

    return (
        <div className="relative grid min-h-[420px] grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 md:h-[420px] md:min-h-0 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-4">
            <article className={`group relative z-10 col-start-2 row-start-1 flex h-[420px] flex-col rounded-2xl border p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition-all duration-500 ease-out hover:shadow-[0_16px_42px_rgba(61,178,104,0.2)] dark:bg-slate-900/90 sm:p-6 md:row-start-1 ${isLeft ? "md:col-start-1" : "md:col-start-3"} ${active ? "translate-x-0 border-[#3DB268] bg-white opacity-100 shadow-[0_12px_36px_rgba(61,178,104,0.12)] dark:border-[#3DB268]/80" : `${isLeft ? "md:-translate-x-8" : "md:translate-x-8"} border-slate-200 bg-white/80 opacity-45 dark:border-slate-800 dark:bg-slate-900/70`} motion-reduce:translate-x-0 motion-reduce:transition-none motion-reduce:opacity-100`}>
                <div className="flex items-start justify-between gap-3">
                    <span className={`text-4xl font-semibold leading-none tracking-tight transition-colors ${active ? "text-[#3DB268]" : "text-[#3DB268]/60"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="rounded-full bg-[#3DB268]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#267A47] dark:text-[#75D59A]">STAGE</span>
                </div>
                <h3 className="mt-4 min-h-12 text-base font-semibold leading-6 sm:text-lg">{step.title}</h3>
                <p className="mt-2 min-h-10 text-[11px] leading-5 text-slate-500 dark:text-slate-400"><span className="font-semibold text-slate-700 dark:text-slate-300">Actors:</span> {step.actors}</p>
                <ul className="mt-3 space-y-2.5">
                    {step.actions.map((action) => (
                        <li key={action} className="flex gap-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                            <Check size={14} className="mt-0.5 shrink-0 text-[#3DB268]" strokeWidth={2.4} />
                            <span>{action}</span>
                        </li>
                    ))}
                </ul>
                <span className="relative z-30 mt-auto hidden min-h-8 items-center gap-2 self-start pt-3 text-xs font-semibold text-[#267A47] md:inline-flex dark:text-[#75D59A]">
                    <ImageIcon size={15} />
                    View sample
                </span>
                <div className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block motion-reduce:transition-none">
                    <Image fill loading="lazy" sizes="(max-width: 1280px) 40vw, 32vw" className="object-cover" src={step.preview} alt={step.previewAlt} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14532d]/90 via-[#3DB268]/15 to-[#3DB268]/5" />
                    <p className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md">{step.previewCaption}</p>
                </div>
            </article>
            <div ref={badgeRef} className={`relative z-20 col-start-1 row-start-1 flex size-12 items-center justify-center justify-self-center rounded-full border-2 transition-colors duration-500 md:col-start-2 md:size-16 ${active ? "border-[#3DB268] bg-[#3DB268] text-white shadow-[0_0_0_8px_rgba(61,178,104,0.18),0_0_24px_rgba(61,178,104,0.5)]" : "border-[#3DB268]/60 bg-white text-[#267A47] shadow-[0_0_0_6px_rgba(61,178,104,0.08)] dark:bg-slate-950 dark:text-[#75D59A]"}`}>
                {currentStep === index && <span className="absolute inset-0 rounded-full bg-[#3DB268]/15" />}
                <Icon className="relative z-10" size={26} strokeWidth={1.7} />
            </div>
        </div>
    );
}

export default function Traceability() {
    const timelineRef = useRef(null);
    const pathRef = useRef(null);
    const desktopPackageRef = useRef(null);
    const mobilePathRef = useRef(null);
    const mobilePackageRef = useRef(null);
    const desktopArrowRefs = useRef([]);
    const mobileArrowRefs = useRef([]);
    const badgeRefs = useRef([]);
    const activeStepRef = useRef(-1);
    const [activeStep, setActiveStep] = useState(-1);
    const [reducedMotion, setReducedMotion] = useState(false);
    const registerBadge = useCallback((index, node) => {
        badgeRefs.current[index] = node;
    }, []);

    useEffect(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setReducedMotion(motionQuery.matches);
        updatePreference();
        motionQuery.addEventListener("change", updatePreference);
        return () => motionQuery.removeEventListener("change", updatePreference);
    }, []);

    useEffect(() => {
        const path = pathRef.current;
        const pathLength = path?.getTotalLength() ?? 0;
        if (path && pathLength) path.style.strokeDasharray = `${pathLength}`;

        let frame = 0;
        const updateProgress = () => {
            frame = 0;
            const timeline = timelineRef.current;
            const bounds = timeline?.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const progress = reducedMotion || !bounds
                ? 1
                : Math.max(0, Math.min(1, (viewportHeight * 0.7 - bounds.top) / (bounds.height + viewportHeight * 0.4)));

            const nextActiveStep = progress === 0 ? -1 : Math.min(traceabilitySteps.length - 1, Math.floor(progress * traceabilitySteps.length + 0.5) - 1);
            if (activeStepRef.current !== nextActiveStep) {
                activeStepRef.current = nextActiveStep;
                setActiveStep(nextActiveStep);
            }

            if (path && pathLength) {
                path.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
                if (bounds && window.matchMedia("(min-width: 768px)").matches) {
                    const matrix = path.getScreenCTM();
                    if (matrix) {
                        const point = path.getPointAtLength(pathLength * progress).matrixTransform(matrix);
                        if (desktopPackageRef.current) {
                            desktopPackageRef.current.style.left = `${point.x - bounds.left}px`;
                            desktopPackageRef.current.style.top = `${point.y - bounds.top}px`;
                            desktopPackageRef.current.style.opacity = reducedMotion || progress === 0 ? "0" : "1";
                        }
                        [0.2, 0.4, 0.6, 0.8].forEach((position, index) => {
                            const arrow = desktopArrowRefs.current[index];
                            if (!arrow) return;
                            const arrowPoint = path.getPointAtLength(pathLength * position).matrixTransform(matrix);
                            const nextPoint = path.getPointAtLength(Math.min(pathLength, pathLength * position + 1)).matrixTransform(matrix);
                            const angle = Math.atan2(nextPoint.y - arrowPoint.y, nextPoint.x - arrowPoint.x) * 180 / Math.PI;
                            arrow.style.left = `${arrowPoint.x - bounds.left}px`;
                            arrow.style.top = `${arrowPoint.y - bounds.top}px`;
                            arrow.style.transform = `translate(-50%, -50%) rotate(${angle - 90}deg)`;
                            arrow.style.opacity = progress >= position ? "1" : "0.2";
                        });
                    }
                }
            }

            if (bounds && mobilePathRef.current && badgeRefs.current.length) {
                const firstBadge = badgeRefs.current[0]?.getBoundingClientRect();
                const lastBadge = badgeRefs.current[traceabilitySteps.length - 1]?.getBoundingClientRect();
                if (firstBadge && lastBadge) {
                    const start = firstBadge.top + firstBadge.height / 2 - bounds.top;
                    const end = lastBadge.top + lastBadge.height / 2 - bounds.top;
                    const length = Math.max(0, end - start);
                    mobilePathRef.current.style.top = `${start}px`;
                    mobilePathRef.current.style.height = `${length}px`;
                    mobilePathRef.current.style.background = `linear-gradient(to bottom, #3DB268 0%, #3DB268 ${progress * 100}%, rgba(61,178,104,0.2) ${progress * 100}%, rgba(61,178,104,0.2) 100%)`;
                    if (mobilePackageRef.current) {
                        mobilePackageRef.current.style.top = `${start + length * progress}px`;
                        mobilePackageRef.current.classList.toggle("hidden", reducedMotion || progress === 0);
                    }
                    [0.25, 0.5, 0.75].forEach((position, index) => {
                        const arrow = mobileArrowRefs.current[index];
                        if (!arrow) return;
                        arrow.style.top = `${start + length * position}px`;
                        arrow.style.opacity = progress >= position ? "0.9" : "0.2";
                    });
                }
            }
        };
        const scheduleProgress = () => {
            if (!frame) frame = window.requestAnimationFrame(updateProgress);
        };

        updateProgress();
        if (reducedMotion) return () => window.cancelAnimationFrame(frame);

        window.addEventListener("scroll", scheduleProgress, { passive: true });
        window.addEventListener("resize", scheduleProgress);
        const resizeObserver = new ResizeObserver(scheduleProgress);
        if (timelineRef.current) resizeObserver.observe(timelineRef.current);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", scheduleProgress);
            window.removeEventListener("resize", scheduleProgress);
            resizeObserver.disconnect();
        };
    }, [reducedMotion]);

    return (
        <div id="traceability" className="scroll-mt-24">
            <div ref={timelineRef} className="relative mx-auto mt-10 max-w-6xl">
                <div ref={mobilePathRef} aria-hidden="true" className="absolute left-[23px] z-0 w-[3px] rounded-full md:hidden" />
                <div ref={mobilePackageRef} aria-hidden="true" className="absolute left-[1px] z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#3DB268] text-white shadow-[0_0_18px_rgba(61,178,104,0.75)] md:hidden">
                    <Package size={22} strokeWidth={1.8} />
                </div>
                {[0.25, 0.5, 0.75].map((position, index) => (
                    <ArrowDown key={position} ref={(element) => { mobileArrowRefs.current[index] = element; }} aria-hidden="true" size={16} className="absolute left-[16px] z-10 -translate-y-1/2 text-[#3DB268] md:hidden" />
                ))}
                {[0.2, 0.4, 0.6, 0.8].map((position, index) => (
                    <ArrowDown key={position} ref={(element) => { desktopArrowRefs.current[index] = element; }} aria-hidden="true" size={17} className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 text-[#3DB268] md:block" />
                ))}
                <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible md:block" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none">
                    <defs>
                        <filter id="traceability-path-glow" x="-30%" y="-10%" width="160%" height="120%">
                            <feGaussianBlur stdDeviation="1.8" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>
                    <path d="M50 0 C44 38 32 65 50 95 C68 130 73 185 50 298 C27 368 27 438 50 500 C73 562 73 632 50 702 C27 772 32 845 50 906 C68 950 56 980 50 1000" stroke="#3DB268" strokeOpacity="0.16" strokeWidth="1.5" />
                    <path ref={pathRef} d="M50 0 C44 38 32 65 50 95 C68 130 73 185 50 298 C27 368 27 438 50 500 C73 562 73 632 50 702 C27 772 32 845 50 906 C68 950 56 980 50 1000" stroke="#3DB268" strokeWidth="1.3" strokeLinecap="round" filter="url(#traceability-path-glow)" />
                </svg>
                <div ref={desktopPackageRef} aria-hidden="true" className="absolute z-10 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3DB268] text-white shadow-[0_0_0_5px_rgba(61,178,104,0.18),0_0_18px_rgba(61,178,104,0.75)] transition-opacity md:flex">
                    <Package size={22} strokeWidth={1.8} />
                </div>
                <div className="relative z-10 space-y-6 md:space-y-7">
                    {traceabilitySteps.map((step, index) => (
                        <TraceabilityStep key={step.title} step={step} index={index} active={index <= activeStep} currentStep={activeStep} registerBadge={registerBadge} />
                    ))}
                </div>
            </div>
            <div className="mx-auto mt-12 flex max-w-5xl items-center gap-4 rounded-2xl border border-[#3DB268]/20 bg-[#3DB268]/[0.08] px-5 py-5 dark:bg-[#3DB268]/[0.1] sm:px-8">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#3DB268]/15 text-[#267A47] dark:text-[#75D59A]">
                    <Check size={22} strokeWidth={2.5} />
                </span>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-200 sm:text-base"><span className="font-semibold text-[#267A47] dark:text-[#75D59A]">End-to-End Visibility:</span> from production through delivery, every stage is connected.</p>
            </div>
        </div>
    );
}

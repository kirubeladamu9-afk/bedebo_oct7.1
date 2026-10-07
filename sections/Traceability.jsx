"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, Package } from "lucide-react";

const traceabilitySteps = [
    {
        title: "Farmer",
        paragraphs: [
            <>More than <strong>200+ international certified farmers</strong> produce according to planned demand and quality requirements.</>,
            <>The source of every crate: farmers grow and harvest horticulture produce to standard and join one connected network with direct links to buyers.</>,
        ],
        tags: ["Quality at the farm", "Harvest", "Digital registration"],
    },
    {
        title: "CAMS/ASPs",
        paragraphs: [
            <><strong>CAMS:</strong> standards, mechanization, ASP development and technical systems.</>,
            <><strong>ASPs:</strong> mechanization, aggregation, first-mile logistics and cold-chain services.</>,
            <><strong>CAMS-led</strong> physical service infrastructure and standards. Agricultural Service Providers support farmers with aggregation, grading, and packaging.</>,
        ],
        tags: ["Aggregation", "Grading", "Packaging", "Standards"],
    },
    {
        title: "BEDEBO/ALAs",
        paragraphs: [
            <><strong>BEDEBO-led</strong> digital coordination and market linkage. Orders, data, and prices stay visible and traceable across the whole chain.</>,
            <><strong>ALA:</strong> farmer coordination, demand aggregation, data capture and market support.</>,
        ],
        tags: ["Digital coordination", "Market linkage", "Traceability"],
    },
    {
        title: "Cold-Chain Partners/Transit",
        paragraphs: [
            <>Transport, pre-cooling, cold storage and delivery. Logistics and cold-chain operators protect freshness and quality while produce moves from aggregation to market.</>,
        ],
        tags: ["Cold storage", "Cold transport", "Custody log"],
    },
    {
        title: "Market Buyers",
        paragraphs: [
            <>Demand, specifications, purchasing and feedback.</>,
        ],
        tags: ["Market pull and commercial sustainability"],
    },
    {
        title: "Consumers",
        paragraphs: [
            <>End customers get fresh, trusted produce at a fair and transparent price, with more of the farmer&apos;s harvest reaching the table.</>,
        ],
        tags: ["Fresh", "Quality", "Traceable", "Fair price"],
    },
];

function TraceabilityStep({ step, index, active, currentStep, registerBadge, reducedMotion }) {
    const isLeft = index % 2 === 1;
    const isHighlighted = reducedMotion || index === currentStep;
    const badgeRef = useCallback((node) => registerBadge(index, node), [index, registerBadge]);

    return (
        <div className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:gap-4">
            <article aria-current={currentStep === index ? "step" : undefined} className={`relative z-10 col-start-2 row-start-1 rounded-xl border bg-white px-4 py-4 shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition-[opacity,transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:border-[#3DB268]/50 hover:opacity-100 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-slate-900 md:row-start-1 md:px-5 ${isHighlighted ? "border-[#3DB268]/40 opacity-100 shadow-[0_6px_24px_rgba(39,150,90,0.12)] dark:border-[#3DB268]/50" : "border-slate-200 opacity-60 dark:border-slate-800"} ${isLeft ? "md:col-start-1" : "md:col-start-3"}`}>
                <h3 className="text-sm font-semibold leading-5 text-slate-800 dark:text-slate-100 sm:text-[15px]">{step.title}</h3>
                <div className="mt-2 space-y-1.5 text-[11px] leading-[1.6] text-slate-600 dark:text-slate-300 sm:text-xs">
                    {step.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#27965a]/[0.08] px-2.5 py-1 text-[10px] font-medium leading-4 text-[#267A47] dark:bg-[#27965a]/20 dark:text-[#8de0ae]"><span aria-hidden="true" className="size-1 rounded-full bg-[#27965a]" />{tag}</span>)}
                </div>
            </article>
            <div ref={badgeRef} aria-label={`Stage ${index + 1}: ${step.title}`} className={`relative z-20 col-start-1 row-start-1 flex size-8 items-center justify-center justify-self-center rounded-full border-2 text-xs font-semibold transition-colors duration-500 md:col-start-2 md:size-9 ${active ? "border-[#27965a] bg-[#27965a] text-white shadow-[0_0_0_4px_rgba(39,150,90,0.12)]" : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400"}`}>
                {currentStep === index && <span aria-hidden="true" className="absolute inset-0 rounded-full ring-2 ring-[#27965a]/30" />}
                <span className="relative">{index + 1}</span>
            </div>
        </div>
    );
}

export default function Traceability() {
    const timelineRef = useRef(null);
    const pathRef = useRef(null);
    const trackPathRef = useRef(null);
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
        const trackPath = trackPathRef.current;
        let frame = 0;
        const updateProgress = () => {
            frame = 0;
            const timeline = timelineRef.current;
            const bounds = timeline?.getBoundingClientRect();
            if (!bounds) return;
            const points = badgeRefs.current.slice(0, traceabilitySteps.length).map((badge) => {
                const rect = badge?.getBoundingClientRect();
                return rect ? { x: rect.left + rect.width / 2 - bounds.left, y: rect.top + rect.height / 2 - bounds.top } : null;
            }).filter(Boolean);
            if (path && trackPath && points.length === traceabilitySteps.length) {
                const pathData = points.reduce((data, point, index) => {
                    if (index === 0) return `M${point.x},${point.y}`;
                    const previous = points[index - 1];
                    const side = index % 2 ? 1 : -1;
                    const offset = Math.min(bounds.width * 0.06, 30) * side;
                    const distance = point.y - previous.y;
                    return `${data} C${previous.x + offset},${previous.y + distance / 3} ${point.x + offset},${previous.y + distance * 2 / 3} ${point.x},${point.y}`;
                }, "");
                path.setAttribute("d", pathData);
                trackPath.setAttribute("d", pathData);
                path.ownerSVGElement.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
            }
            const pathLength = path?.getTotalLength() ?? 0;
            if (path && pathLength) path.style.strokeDasharray = `${pathLength}`;
            const viewportHeight = window.innerHeight;
            const progress = reducedMotion
                ? 1
                : Math.max(0, Math.min(1, (viewportHeight * 0.7 - bounds.top) / (bounds.height + viewportHeight * 0.4)));

            const markerPoint = path && pathLength ? path.getPointAtLength(pathLength * progress) : null;
            const nearestStep = markerPoint && points.length
                ? points.reduce((nearest, point, index) => {
                    const distance = Math.hypot(markerPoint.x - point.x, markerPoint.y - point.y);
                    return distance < nearest.distance ? { index, distance } : nearest;
                }, { index: -1, distance: Infinity }).index
                : Math.min(traceabilitySteps.length - 1, Math.floor(progress * traceabilitySteps.length + 0.5) - 1);
            const nextActiveStep = progress === 0 ? -1 : nearestStep;
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
            <div ref={timelineRef} className="relative mt-3 w-full">
                <div ref={mobilePathRef} aria-hidden="true" className="absolute left-[18px] z-0 w-[3px] rounded-full md:hidden" />
                <div ref={mobilePackageRef} aria-hidden="true" className="absolute left-1 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#3DB268] text-white shadow-[0_0_18px_rgba(61,178,104,0.75)] md:hidden">
                    <Package size={22} strokeWidth={1.8} />
                </div>
                {[0.25, 0.5, 0.75].map((position, index) => (
                    <ArrowDown key={position} ref={(element) => { mobileArrowRefs.current[index] = element; }} aria-hidden="true" size={16} className="absolute left-3 z-10 -translate-y-1/2 text-[#3DB268] md:hidden" />
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
                    <path ref={trackPathRef} stroke="#3DB268" strokeOpacity="0.16" strokeWidth="4" />
                    <path ref={pathRef} stroke="#27965a" strokeWidth="3" strokeLinecap="round" filter="url(#traceability-path-glow)" />
                </svg>
                <div ref={desktopPackageRef} aria-hidden="true" className="absolute z-10 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3DB268] text-white shadow-[0_0_0_5px_rgba(61,178,104,0.18),0_0_18px_rgba(61,178,104,0.75)] transition-opacity md:flex">
                    <Package size={22} strokeWidth={1.8} />
                </div>
                <div className="relative z-10 space-y-5 md:space-y-6">
                    {traceabilitySteps.map((step, index) => (
                        <TraceabilityStep key={step.title} step={step} index={index} active={index <= activeStep} currentStep={activeStep} registerBadge={registerBadge} reducedMotion={reducedMotion} />
                    ))}
                </div>
            </div>
        </div>
    );
}

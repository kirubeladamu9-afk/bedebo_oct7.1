'use client';

import { useEffect, useRef, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Boxes,
    Check,
    ChevronLeft,
    ChevronRight,
    CircleDot,
    ClipboardList,
    Factory,
    Leaf,
    MapPinned,
    PackageCheck,
    ShieldCheck,
    Snowflake,
    Sprout,
    Store,
    Target,
    Truck,
    Users,
    Warehouse,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const coreValues = [
    {
        title: "Quality at Every Stage",
        quote: "Quality starts at the farm and must be protected until delivery.",
        description: "BEDEBO's first core value is to build quality into the entire horticultural journey rather than inspect quality only when products reach the market.",
        accent: "#27965a",
        soft: "rgba(39, 150, 90, 0.1)",
    },
    {
        title: "Farm-to-Market Traceability",
        quote: "Know the product. Know the source. Know the journey.",
        description: "BEDEBO seeks to make the horticultural value chain visible and accountable from production through final market delivery.",
        accent: "#6b4fd8",
        soft: "rgba(107, 79, 216, 0.1)",
    },
    {
        title: "Freshness & Post-Harvest Loss Reduction",
        quote: "Protect more of what farmers produce.",
        description: "The project model targets a reduction in overall farm-to-consumer losses from approximately 46% to approximately 23%, with its illustrative case showing 77 kg rather than 54 kg reaching consumers from the same 100 kg.",
        accent: "#0e93a8",
        soft: "rgba(14, 147, 168, 0.1)",
        figures: [
            { value: "46% to 23%", label: "farm-to-consumer losses" },
            { value: "54 kg to 77 kg", label: "reaching consumers per 100 kg" },
        ],
    },
    {
        title: "Digital Market Connection",
        quote: "Connecting the right product to the right buyer at the right time.",
        description: "BEDEBO's defining capability is the integration of physical horticultural supply with digital market coordination.",
        accent: "#2f6fed",
        soft: "rgba(47, 111, 237, 0.1)",
    },
    {
        title: "Fair & Transparent Value",
        quote: "Quality determines value, and value should be visible across the chain.",
        description: "This allows BEDEBO to pursue two objectives simultaneously: premium value for premium quality and appropriate, affordable market channels for other commercially acceptable grades.",
        accent: "#d9822b",
        soft: "rgba(217, 130, 43, 0.1)",
    },
    {
        title: "Reliable & Shared Growth",
        quote: "A stronger value chain must create value for every critical actor.",
        description: "BEDEBO combines CAMS-led physical service infrastructure and standards with BEDEBO-led digital coordination and market linkage.",
        additional: "When farmers produce better, service providers operate efficiently, logistics protect quality, BEDEBO coordinates transparently and buyers receive reliable products, the entire horticulture ecosystem grows together.",
        accent: "#c2477a",
        soft: "rgba(194, 71, 122, 0.1)",
    },
];

const tabs = [
    {
        id: "value-chain",
        title: "Value chain integration",
        shortTitle: "Value chain integration",
        layer: "The partnership layer",
        description: "All actors work as partners, not as disconnected middlemen.",
        points: ["Farm-to-market linkages", "Coordinated production", "Shared services", "Value addition", "Shared benefit"],
        accent: "#27965a",
        soft: "rgba(39, 150, 90, 0.12)",
        icon: Users,
    },
    {
        id: "digital-integration",
        title: "Digital integration",
        shortTitle: "Digital integration",
        layer: "The information layer",
        description: "BEDEBO supports farmer coordination, aggregation, logistics, market linkage, payment tracking and end-to-end visibility.",
        points: ["Connected platforms", "Real-time visibility", "Data-driven decisions", "Digital transactions", "Inclusion for all farmers"],
        accent: "#2f6fed",
        soft: "rgba(47, 111, 237, 0.12)",
        icon: CircleDot,
    },
    {
        id: "cold-chain",
        title: "Freshness & Post-Harvest Loss Reduction",
        shortTitle: "Freshness & Post-Harvest Loss Reduction",
        layer: "The freshness layer",
        description: "Fresh horticultural products lose value quickly when harvesting, handling, transport, storage and market access are poorly coordinated. BEDEBO therefore treats loss reduction as value creation, not merely as an operational issue.",
        points: ["Continuous temperature control", "Less post-harvest loss", "Longer shelf life and reach", "Sensor monitoring", "Food safety"],
        accent: "#0e93a8",
        soft: "rgba(14, 147, 168, 0.12)",
        icon: Snowflake,
    },
    {
        id: "quality-traceability",
        title: "Quality and traceability",
        shortTitle: "Quality and traceability",
        layer: "The trust layer",
        description: "Customers can verify where a product came from and follow its journey from production to delivery.",
        points: ["Quality standards", "Batch traceability", "Rapid response", "Consumer confidence"],
        accent: "#6b4fd8",
        soft: "rgba(107, 79, 216, 0.12)",
        icon: ShieldCheck,
    },
];

const actors = [
    {
        title: "Farmers and producer organizations",
        icon: Sprout,
        role: "Farmers grow and harvest horticultural produce to standard and join one connected network with direct links to buyers.",
        value: "A traceable source and coordinated supply from the farm.",
        tags: ["Quality at the farm", "Harvest", "Digital registration"],
    },
    {
        title: "CAMS Engineering and ASPs",
        icon: Factory,
        role: "CAMS provides standards and physical service infrastructure. ASPs support farmers with mechanization, aggregation, grading, packaging and first-mile logistics.",
        value: "Standards, mechanization and practical services close to production.",
        tags: ["Aggregation", "Grading", "Packaging", "Standards"],
    },
    {
        title: "ALAs and BEDEBO",
        icon: MapPinned,
        role: "ALAs support farmer coordination, demand aggregation, data capture and market support. BEDEBO leads digital coordination and market linkage.",
        value: "A connected information and market-linkage layer.",
        tags: ["Digital coordination", "Market linkage", "Traceability"],
    },
    {
        title: "Logistics and cold-chain partners",
        icon: Truck,
        role: "Partners provide transport, pre-cooling, cold storage and delivery.",
        value: "Freshness and quality protected while produce moves from aggregation to market.",
        tags: ["Cold storage", "Cold transport", "Custody log"],
    },
    {
        title: "Market buyers",
        icon: Store,
        role: "Buyers share demand, specifications, purchasing and feedback.",
        value: "Market pull and commercial sustainability.",
        tags: ["Demand", "Specifications", "Feedback"],
    },
    {
        title: "Consumers",
        icon: Users,
        role: "End customers receive produce at a fair and transparent price.",
        value: "Fresh, quality produce with more of the harvest reaching the table.",
        tags: ["Fresh", "Quality", "Traceable", "Fair value"],
    },
];

const digitalPlatforms = [
    {
        id: "farm",
        name: "Farm",
        icon: Sprout,
        steps: [
            "The farmer is registered in the Bedebo App.",
            "Product and type are selected and recorded.",
            "Weight is registered and produce is graded.",
            "Produce leaves in 100 kg woven sacks, shipped to the Union, and data goes to central Bedebo.",
        ],
    },
    {
        id: "union",
        name: "Union and ALAs",
        icon: Boxes,
        steps: [
            "Product is checked in and received by the ALAs.",
            "Sacks are converted to QR-labeled crates, one set per farmer with no mixing.",
            "Data is stored at central Bedebo.",
            "When the warehouse requests stock, crates are checked out and loaded onto the cold truck.",
        ],
    },
    {
        id: "warehouse",
        name: "Warehouse (cold storage)",
        icon: Warehouse,
        steps: [
            "The warehouse requests stock through central Bedebo.",
            "The cold truck carries the crates from the Union.",
            "Crates are checked in to cold storage.",
            "Data is sent to central Bedebo.",
        ],
    },
    {
        id: "vendor",
        name: "Vendor",
        icon: Store,
        steps: [
            "The vendor places an order in the Bedebo platform.",
            "Crates are checked out and loaded onto the cold truck.",
            "The truck carries the order to the vendor.",
            "Crates are received and delivery is confirmed to central Bedebo.",
        ],
    },
];

const crops = [
    { id: "tomato", name: "Tomato", range: "13–15°C", humidity: "85–90% RH", note: "Chilling sensitive. Avoid temperatures below 10°C to help prevent flavor loss and pitting." },
    { id: "onion", name: "Onion", range: "0–2°C", humidity: "65–70% RH", note: "Keep humidity low to reduce root sprouting and rot. Store separately due to strong odors." },
    { id: "cabbage", name: "Cabbage", range: "0–2°C", humidity: "95–100% RH", note: "Sensitive to ethylene, which can cause yellowing and leaf drop." },
    { id: "papaya", name: "Papaya", range: "7–10°C", humidity: "85–90% RH", note: "Susceptible to chilling injury below 7°C." },
    { id: "pepper", name: "Pepper", range: "7–10°C", humidity: "90–95% RH", note: "Shrivelling can occur quickly if humidity drops. Keep away from ethylene producers." },
    { id: "green-bean", name: "Green Bean", range: "5–7.5°C", humidity: "90–95% RH", note: "Sensitive to chilling injury below 4°C and highly perishable." },
];

const traceSteps = [
    { title: "Customer", detail: "The product reaches the customer.", gate: null },
    { title: "Market delivery", detail: "Delivery is confirmed to the market partner.", gate: null },
    { title: "Cold storage", detail: "Crates are held in cold storage before dispatch.", gate: "Pre-cooling and cold storage" },
    { title: "Grading", detail: "Produce is graded against its specifications.", gate: "Grading" },
    { title: "Transport", detail: "Movement and custody are tracked along the route.", gate: null },
    { title: "Pre-cooling", detail: "Produce is cooled before storage and onward movement.", gate: null },
    { title: "Aggregation", detail: "Produce is packed and moved in crates linked to its source.", gate: "Crate-based movement" },
    { title: "Harvest", detail: "Produce is harvested and handled to a consistent standard.", gate: "Standardized harvesting and handling" },
    { title: "Production", detail: "Production is planned for quality and market needs.", gate: "Planned production" },
];

const qualityGates = [
    "Planned production",
    "Standardized harvesting and handling",
    "Crate-based movement",
    "Pre-cooling and cold storage",
    "Grading",
];

function ObjectiveAndSummary() {
    const brandLineRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const element = brandLineRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            element.classList.add("is-visible");
            observer.disconnect();
        }, { threshold: 0.4 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="core-overview">
                <article className="core-objective">
                    <span className="core-overview-icon"><Target size={21} aria-hidden="true" /></span>
                    <h3>Objective</h3>
                    <p>To build a <strong>digitally integrated</strong>, <strong>quality-driven</strong> and <strong>market-connected</strong> horticulture supply system that delivers the right product, at the right quality, to the right customer, at the right time and at a fair and transparent price.</p>
                </article>
                <article className="core-summary">
                    <span className="core-overview-icon"><ClipboardList size={21} aria-hidden="true" /></span>
                    <h3>Executive Summary</h3>
                    <p ref={brandLineRef} className="core-brand-line" aria-label="Freshness Protected. Quality Assured. Markets Connected. Value Shared.">
                        <span>Freshness Protected.</span>
                        <span>Quality Assured.</span>
                        <span>Markets Connected.</span>
                        <span>Value Shared.</span>
                    </p>
                    <p>BEDEBO Ethiopia Share Company builds a digitally integrated, market-driven horticulture value chain connecting farmers, Agricultural Service Providers (ASPs), logistics and cold-chain operators, market partners, and end customers.</p>
                </article>
            </div>
            <div className="core-crops" aria-label="Crops">
                <span className="core-crops-label">Crops</span>
                {crops.map((crop) => <span className="core-crop-tag" key={crop.id}>{crop.name}</span>)}
            </div>
        </>
    );
}

function ValuesCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef(null);
    const activeValue = coreValues[activeIndex];

    const goTo = (index) => setActiveIndex(Math.max(0, Math.min(coreValues.length - 1, index)));
    const onKeyDown = (event) => {
        if (event.key === "ArrowRight") goTo(activeIndex + 1);
        if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    };

    return (
        <section className="core-values-carousel" aria-label="Six values that guide us">
            <div className="core-subheading">
                <h3>Six values that guide us</h3>
                <p>Choose a value to explore what it means.</p>
            </div>
            <div
                className="core-value-card"
                style={{ "--value-accent": activeValue.accent, "--value-soft": activeValue.soft }}
                role="region"
                aria-roledescription="carousel"
                aria-label={`${activeValue.title}, value ${activeIndex + 1} of ${coreValues.length}`}
                onKeyDown={onKeyDown}
                onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
                onTouchEnd={(event) => {
                    if (touchStartX.current === null) return;
                    const delta = event.changedTouches[0].clientX - touchStartX.current;
                    if (Math.abs(delta) > 40) goTo(activeIndex + (delta < 0 ? 1 : -1));
                    touchStartX.current = null;
                }}
            >
                <div className="core-value-heading">
                    <span className="core-value-number">{String(activeIndex + 1).padStart(2, "0")}</span>
                    <span className="core-value-counter">Core value {activeIndex + 1} of {coreValues.length}</span>
                </div>
                <h4>{activeValue.title}</h4>
                <blockquote>“{activeValue.quote}”</blockquote>
                <p className="core-value-description">{activeValue.description}</p>
                {activeValue.additional && <p className="core-value-description core-value-additional">{activeValue.additional}</p>}
                {activeValue.figures && (
                    <div className="core-value-figures">
                        {activeValue.figures.map((figure) => (
                            <div className="core-value-figure" key={figure.value}>
                                <strong>{figure.value}</strong>
                                <span>{figure.label}</span>
                            </div>
                        ))}
                        <p>Project target based on an illustrative case</p>
                    </div>
                )}
                <div className="core-carousel-controls">
                    <button type="button" className="core-icon-button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous core value">
                        <ChevronLeft size={20} aria-hidden="true" />
                    </button>
                    <div className="core-value-dots" role="group" aria-label="Choose a core value">
                        {coreValues.map((value, index) => (
                            <button
                                type="button"
                                key={value.title}
                                className={`core-value-dot${index === activeIndex ? " is-active" : ""}`}
                                onClick={() => goTo(index)}
                                aria-label={`Show ${value.title}`}
                                aria-current={index === activeIndex ? "true" : undefined}
                            />
                        ))}
                    </div>
                    <button type="button" className="core-icon-button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === coreValues.length - 1} aria-label="Next core value">
                        <ChevronRight size={20} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
}

function TabIntro({ tab }) {
    const Icon = tab.icon;
    return (
        <div className="core-tab-intro">
            <span className="core-tab-icon"><Icon size={26} aria-hidden="true" /></span>
            <div className="core-tab-intro-copy">
                <span className="core-layer-label">{tab.layer}</span>
                <h3>{tab.title}</h3>
                <p>{tab.description}</p>
                <div className="core-tab-points">
                    {tab.points.map((point) => <span key={point}>{point}</span>)}
                </div>
            </div>
        </div>
    );
}

function ValueChainJourney() {
    const flowRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => {
            frame = 0;
            if (reducedMotion.matches) {
                setProgress(1);
                return;
            }
            const bounds = flowRef.current?.getBoundingClientRect();
            if (!bounds) return;
            const next = Math.max(0, Math.min(1, (window.innerHeight * 0.66 - bounds.top) / (bounds.height + window.innerHeight * 0.15)));
            setProgress(next);
        };
        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        reducedMotion.addEventListener("change", schedule);
        const observer = new ResizeObserver(schedule);
        if (flowRef.current) observer.observe(flowRef.current);
        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            reducedMotion.removeEventListener("change", schedule);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="core-actor-flow" ref={flowRef} style={{ "--flow-progress": `${progress * 100}%` }}>
            <svg className="core-flow-path" viewBox="0 0 100 1200" preserveAspectRatio="none" aria-hidden="true">
                <path className="core-flow-track" d="M50 100 C24 160 24 240 50 300 C76 360 76 440 50 500 C24 560 24 640 50 700 C76 760 76 840 50 900 C24 960 24 1040 50 1100" />
                <path className="core-flow-progress" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress} d="M50 100 C24 160 24 240 50 300 C76 360 76 440 50 500 C24 560 24 640 50 700 C76 760 76 840 50 900 C24 960 24 1040 50 1100" />
            </svg>
            <div className="core-actor-list">
                {actors.map((actor, index) => {
                    const Icon = actor.icon;
                    const lit = progress >= index / (actors.length - 1);
                    return (
                        <div className={`core-actor-row${index % 2 === 0 ? " actor-left" : " actor-right"}`} key={actor.title}>
                            <article className="core-actor-card">
                                <div className="core-actor-card-heading">
                                    <span className="core-actor-icon"><Icon size={19} aria-hidden="true" /></span>
                                    <h4>{actor.title}</h4>
                                </div>
                                <p><strong>Role</strong>{actor.role}</p>
                                <p><strong>Value created</strong>{actor.value}</p>
                                <div className="core-actor-tags">
                                    {actor.tags.map((tag) => <span key={tag}>{tag}</span>)}
                                </div>
                            </article>
                            <span className={`core-actor-step${lit ? " is-lit" : ""}`} aria-label={`Step ${index + 1}`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function DigitalIntegration() {
    const [selectedId, setSelectedId] = useState("farm");
    const [stepIndex, setStepIndex] = useState(0);
    const selected = digitalPlatforms.find((platform) => platform.id === selectedId);

    const choosePlatform = (id) => {
        setSelectedId(id);
        setStepIndex(0);
    };

    return (
        <div className="core-digital-panel">
            <div className="core-isometric-scene" aria-label="Digital platforms linked through central Bedebo">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M17 17 L50 50 L83 17 M50 50 L17 83 M50 50 L83 83" />
                </svg>
                <button type="button" className={`core-platform platform-farm${selectedId === "farm" ? " is-selected" : ""}`} onClick={() => choosePlatform("farm")} aria-pressed={selectedId === "farm"}>
                    <Sprout size={20} aria-hidden="true" /><span>Farm</span>
                </button>
                <button type="button" className={`core-platform platform-union${selectedId === "union" ? " is-selected" : ""}`} onClick={() => choosePlatform("union")} aria-pressed={selectedId === "union"}>
                    <Boxes size={20} aria-hidden="true" /><span>Union and ALAs</span>
                </button>
                <div className="core-central-platform"><span>Central Bedebo</span><small>Digital coordination</small></div>
                <button type="button" className={`core-platform platform-warehouse${selectedId === "warehouse" ? " is-selected" : ""}`} onClick={() => choosePlatform("warehouse")} aria-pressed={selectedId === "warehouse"}>
                    <Warehouse size={20} aria-hidden="true" /><span>Warehouse</span>
                    <small>(cold storage)</small>
                </button>
                <button type="button" className={`core-platform platform-vendor${selectedId === "vendor" ? " is-selected" : ""}`} onClick={() => choosePlatform("vendor")} aria-pressed={selectedId === "vendor"}>
                    <Store size={20} aria-hidden="true" /><span>Vendor</span>
                </button>
            </div>
            <div className="core-platform-steps" aria-live="polite">
                <div className="core-platform-step-heading">
                    <h4>{selected.name}</h4>
                    <span>Step {stepIndex + 1} of {selected.steps.length}</span>
                </div>
                <p>{selected.steps[stepIndex]}</p>
                <div className="core-step-controls">
                    <button type="button" onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0}>
                        <ArrowLeft size={16} aria-hidden="true" /> Back
                    </button>
                    <button type="button" onClick={() => setStepIndex(Math.min(selected.steps.length - 1, stepIndex + 1))} disabled={stepIndex === selected.steps.length - 1}>
                        Next <ArrowRight size={16} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function ColdChainIntegration() {
    const [selectedCropId, setSelectedCropId] = useState(crops[0].id);
    const selectedCrop = crops.find((crop) => crop.id === selectedCropId);
    const measures = ["Crate-based handling", "Solar pre-cooling", "Cold rooms", "Coordinated logistics", "Digital scheduling"];

    return (
        <div className="core-cold-panel">
            <div className="core-cold-topline">
                <div>
                    <span className="core-layer-label">Recommended storage range</span>
                    <label className="core-crop-select-label" htmlFor="core-crop-select">Select a crop</label>
                    <select id="core-crop-select" value={selectedCropId} onChange={(event) => setSelectedCropId(event.target.value)}>
                        {crops.map((crop) => <option key={crop.id} value={crop.id}>{crop.name}</option>)}
                    </select>
                </div>
                <div className="core-storage-ranges" aria-live="polite">
                    <div><span>Temperature</span><strong>{selectedCrop.range}</strong></div>
                    <div><span>Humidity</span><strong>{selectedCrop.humidity}</strong></div>
                </div>
            </div>
            <p className="core-crop-note"><strong>{selectedCrop.name}:</strong> {selectedCrop.note}</p>
            <div className="core-loss-comparison" aria-label="Project target comparison for 100 kilograms">
                <div className="core-loss-label"><span>100 kg</span><span>Project target</span></div>
                <div className="core-loss-row">
                    <span>Reaching consumers today</span>
                    <div className="core-loss-track"><span style={{ width: "54%" }} /></div>
                    <strong>54 kg</strong>
                </div>
                <div className="core-loss-row is-target">
                    <span>With the BEDEBO model</span>
                    <div className="core-loss-track"><span style={{ width: "77%" }} /></div>
                    <strong>77 kg</strong>
                </div>
                <p>Project target based on an illustrative case</p>
            </div>
            <div className="core-measures">
                {measures.map((measure) => <div className="core-measure" key={measure}><Check size={16} aria-hidden="true" />{measure}</div>)}
            </div>
        </div>
    );
}

function QualityTraceability() {
    const [started, setStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const step = traceSteps[currentStep];
    const completedGates = qualityGates.filter((gate) => traceSteps.findIndex((entry) => entry.gate === gate) <= currentStep && traceSteps.some((entry) => entry.gate === gate));

    const startTrace = () => {
        setStarted(true);
        setCurrentStep(0);
    };

    return (
        <div className="core-trace-panel">
            <div className="core-trace-main">
                <div className="core-trace-controls">
                    <div className="core-trace-mark" aria-hidden="true"><PackageCheck size={42} strokeWidth={1.5} /></div>
                    {!started ? (
                        <button type="button" className="core-primary-button" onClick={startTrace}>Trace this product <ArrowRight size={17} aria-hidden="true" /></button>
                    ) : (
                        <>
                            <button type="button" className="core-primary-button" onClick={startTrace}>Restart trace</button>
                            <div className="core-step-controls">
                                <button type="button" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}><ArrowLeft size={16} aria-hidden="true" /> Back</button>
                                <button type="button" onClick={() => setCurrentStep(Math.min(traceSteps.length - 1, currentStep + 1))} disabled={currentStep === traceSteps.length - 1}>Next <ArrowRight size={16} aria-hidden="true" /></button>
                            </div>
                        </>
                    )}
                </div>
                <div className="core-trace-journey" aria-live="polite">
                    <div className="core-trace-current">
                        <span>Trace step {started ? currentStep + 1 : 0} of {traceSteps.length}</span>
                        <h4>{started ? step.title : "Start with a customer delivery"}</h4>
                        <p>{started ? step.detail : "Follow one product backwards through the chain, from customer to production."}</p>
                    </div>
                    <ol className="core-trace-timeline">
                        {traceSteps.map((item, index) => (
                            <li key={item.title} className={`${started && index < currentStep ? "is-traced" : ""} ${started && index === currentStep ? "is-current" : ""}`}>
                                <span className="core-trace-node">{String(index + 1).padStart(2, "0")}</span>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="core-quality-checks">
                <div className="core-quality-checks-heading">
                    <h4>Quality protection</h4>
                    <span>{completedGates.length} of {qualityGates.length} checks</span>
                </div>
                {qualityGates.map((gate) => (
                    <div className={`core-quality-gate${completedGates.includes(gate) ? " is-complete" : ""}`} key={gate}>
                        <span><Check size={13} aria-hidden="true" /></span>{gate}
                    </div>
                ))}
                <div className="core-trace-outcomes">
                    <h4>Outcomes</h4>
                    <ul>
                        <li>Better freshness</li>
                        <li>Consistent specifications</li>
                        <li>Less physical damage</li>
                        <li>Fewer buyer rejections</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function CoreValues() {
    const [activeTab, setActiveTab] = useState(0);
    const active = tabs[activeTab];

    const focusTab = (index) => {
        const next = (index + tabs.length) % tabs.length;
        setActiveTab(next);
        document.getElementById(`core-tab-${tabs[next].id}`)?.focus();
    };

    const renderTab = () => {
        if (active.id === "value-chain") return <ValueChainJourney />;
        if (active.id === "digital-integration") return <DigitalIntegration />;
        if (active.id === "cold-chain") return <ColdChainIntegration />;
        return <QualityTraceability />;
    };

    return (
        <section id="core-values" className="core-values-section scroll-mt-24" aria-labelledby="core-values-title">
            <div className="bedebo-site-container">
                <SectionTitle label="CORE VALUES" title="Our Core" highlight="Values" headingId="core-values-title" />
                <ObjectiveAndSummary />
                <ValuesCarousel />
                <div className="core-tabs-scroller">
                    <div className="core-tabs" role="tablist" aria-label="Core value integrations" onKeyDown={(event) => {
                        if (event.key === "ArrowRight") { event.preventDefault(); focusTab(activeTab + 1); }
                        if (event.key === "ArrowLeft") { event.preventDefault(); focusTab(activeTab - 1); }
                        if (event.key === "Home") { event.preventDefault(); focusTab(0); }
                        if (event.key === "End") { event.preventDefault(); focusTab(tabs.length - 1); }
                    }}>
                        {tabs.map((tab, index) => (
                            <button
                                type="button"
                                role="tab"
                                id={`core-tab-${tab.id}`}
                                aria-selected={activeTab === index}
                                aria-controls="core-tab-panel"
                                tabIndex={activeTab === index ? 0 : -1}
                                key={tab.id}
                                onClick={() => setActiveTab(index)}
                                style={{ "--tab-accent": tab.accent, "--tab-soft": tab.soft }}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="core-tab-content" id="core-tab-panel" role="tabpanel" aria-labelledby={`core-tab-${active.id}`} style={{ "--core-accent": active.accent, "--core-soft": active.soft }}>
                    <TabIntro tab={active} />
                    <div className="core-visual-card">
                        {renderTab()}
                    </div>
                </div>
                <div className="core-closing-banner"><Leaf size={22} aria-hidden="true" /><span>Coordinating the journey from production to market</span></div>
            </div>
        </section>
    );
}

'use client';

import { useEffect, useRef, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Boxes,
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    CircleDot,
    ClipboardList,
    Factory,
    Leaf,
    MapPinned,
    Package,
    ShieldCheck,
    Snowflake,
    Sprout,
    Sun,
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
        name: "Farm: registration and grading",
        steps: [
            "The farmer is registered in the Bedebo App.",
            "Product and type are selected and recorded.",
            "Weight is registered and produce is graded.",
            "Produce leaves in 100 kg woven sacks, shipped to the Union, and data goes to central Bedebo.",
        ],
    },
    {
        id: "union",
        name: "Union: check-in and QR crates",
        steps: [
            "Product is checked in and received by the ALAs.",
            "Sacks are converted to QR-labeled crates, one set per farmer with no mixing.",
            "Data is stored at central Bedebo.",
            "When the warehouse requests stock, crates are checked out and loaded onto the cold truck.",
        ],
    },
    {
        id: "warehouse",
        name: "Warehouse: request and cold storage",
        steps: [
            "The warehouse requests stock. The request goes through central Bedebo to the Union.",
            "The cold truck carries the crates from the Union.",
            "Crates are checked in to cold storage.",
            "Data is sent to central Bedebo.",
        ],
    },
    {
        id: "vendor",
        name: "Vendor: order and delivery",
        steps: [
            "The vendor places an order in the Bedebo platform.",
            "Crates are checked out and loaded onto the cold truck.",
            "The truck carries the order from the warehouse to the vendor.",
            "Crates are received and delivery is confirmed to central Bedebo.",
        ],
    },
    {
        id: "central-bedebo",
        name: "Central Bedebo platform",
        steps: [
            "Every registration, check-in, check-out, request, and order is recorded here.",
            "The whole journey stays visible and traceable, from the farmer to the vendor.",
        ],
    },
];

function isoSceneSVG(){
var P=function(x,y,z){return[Math.round(360+(x-y)*30),Math.round(100+(x+y)*17.32-z)]},
Q=function(a,f){return'<polygon points="'+a.map(function(q){return P(q[0],q[1],q[2])}).join(' ')+'" fill="'+f+'"/>'},
B=function(x,y,a,b,h,z,c){var t=z+h;return Q([[x+a,y,z],[x+a,y+b,z],[x+a,y+b,t],[x+a,y,t]],c[2])+Q([[x,y+b,z],[x+a,y+b,z],[x+a,y+b,t],[x,y+b,t]],c[1])+Q([[x,y,t],[x+a,y,t],[x+a,y+b,t],[x,y+b,t]],c[0])},
WH=['#fff','#e1eaf6','#c8d6eb'],CR=['#f2cc8b','#d29c4c','#b5843b'],SK=['#efe0b8','#d9c28a','#c2a96f'],GR=['#63c48c','#3da56b','#2f8a58'],TL=['#aadde8','#7cc2d1','#5ca8b8'],BL=['#7399ec','#4a76d6','#3a60b8'],DK=['#51639e','#33427a','#27346a'],RD=['#f3917f','#da6550','#bf5340'],GN=['#8fe6b2','#27965a','#1f7a49'];
var N=[
{n:'Farm',x:-2,y:4,o:function(x,y){var r='';[.4,1.3,2.1].forEach(function(a){r+=B(x+.4,y+a,.5,.5,8,0,GR)+B(x+1,y+a,.5,.5,8,0,GR)});return r+B(x+1.9,y+.6,.8,.8,15,0,SK)+B(x+1.9,y+1.7,.8,.8,15,0,SK)}},
{n:'Union and ALAs',x:4,y:-2,o:function(x,y){return[[.4,.3],[1.3,.3],[.4,1.1],[1.3,1.1]].map(function(a){return B(x+a[0],y+a[1],.8,.8,14,0,CR)}).join('')+B(x+.4,y+.3,.8,.8,14,14,CR)+B(x+.3,y+2,1.7,.8,18,0,WH)+B(x+2,y+2.05,.7,.7,13,0,BL)}},
{n:'Warehouse (cold storage)',x:10,y:4,o:function(x,y){var c=P(x+1.5,y+1.5,40),s='';for(var a=0;a<3;a++){var t=a*Math.PI/3,dx=8*Math.cos(t),dy=8*Math.sin(t);s+='<line x1="'+(c[0]-dx)+'" y1="'+(c[1]-dy)+'" x2="'+(c[0]+dx)+'" y2="'+(c[1]+dy)+'" stroke="#fff" stroke-width="2.4"/>'}return B(x+.5,y+.5,2,2,40,0,TL)+B(x+.9,y+2.5,.6,.04,24,0,WH)+s}},
{n:'Vendor',x:4,y:10,o:function(x,y){return B(x+.6,y+.8,1.8,1.3,14,0,WH)+B(x+.5,y+.7,.95,1.5,6,26,RD)+B(x+1.45,y+.7,.95,1.5,6,26,WH)+B(x+.7,y+2.2,.5,.5,8,0,CR)+B(x+1.4,y+2.2,.5,.5,8,0,GR)}},
{n:'Central Bedebo platform',x:4,y:4,o:function(x,y){var c=P(x+1.5,y+1.5,78);return B(x+.4,y+.6,.8,1.2,46,0,DK)+B(x+1.3,y+.6,.8,1.2,46,0,DK)+B(x+2.2,y+.6,.6,1.2,46,0,DK)+[10,22].map(function(z){return B(x+.5,y+1.8,.5,.05,3,z,GN)+B(x+1.4,y+1.8,.5,.05,3,z,GN)}).join('')+'<g stroke="#3b6fd8" stroke-width="2" fill="#fff"><circle cx="'+(c[0]-17)+'" cy="'+(c[1]+3)+'" r="13"/><circle cx="'+(c[0]+17)+'" cy="'+(c[1]+3)+'" r="13"/><circle cx="'+c[0]+'" cy="'+(c[1]-6)+'" r="18"/></g><rect x="'+(c[0]-27)+'" y="'+(c[1]-2)+'" width="54" height="17" fill="#fff"/>'}}],
s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" role="group" aria-label="Isometric diagram of the central Bedebo platform connected to farm, Union, warehouse and vendor"><rect width="720" height="540" fill="#cfe3ff"/>',
F=function(x,y,w,d,z,f){return Q([[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z]],f)};
[[40,200,330,45],[40,330,300,150],[690,230,430,50],[690,380,300,150]].forEach(function(l){s+='<line x1="'+l[0]+'" y1="'+l[1]+'" x2="'+l[2]+'" y2="'+l[3]+'" stroke="#fff" stroke-opacity=".55" stroke-dasharray="4 7"/>'});
var W=[[5,1,1,3],[5,7,1,3],[1,5,3,1],[7,5,3,1]];
N.forEach(function(p){s+=F(p.x+.4,p.y+.9,3,3,-46,'rgba(50,90,170,.2)')});
W.forEach(function(w){s+=F(w[0]+.4,w[1]+.9,w[2],w[3],-46,'rgba(50,90,170,.15)')+B(w[0],w[1],w[2],w[3],14,-14,WH)});
N.forEach(function(p){s+=B(p.x,p.y,3,3,14,-14,WH)});
N.map(function(p,i){return[p,i]}).sort(function(a,b){return a[0].x+a[0].y-b[0].x-b[0].y}).forEach(function(q){
var p=q[0],f=P(p.x+3,p.y+3,-14),w=Math.round(p.n.length*6.6+24);
s+='<g class="iso-n" data-i="'+q[1]+'" tabindex="0" role="button" aria-label="'+p.n+'">'+Q([[p.x,p.y,0],[p.x+3,p.y,0],[p.x+3,p.y+3,0],[p.x,p.y+3,0]],'none').replace('fill="none"','class="iso-hl"')+'<g class="iso-ob">'+p.o(p.x,p.y)+'</g><rect x="'+(f[0]-w/2)+'" y="'+(f[1]+8)+'" width="'+w+'" height="22" rx="11" fill="#fff"/><text x="'+f[0]+'" y="'+(f[1]+23)+'" text-anchor="middle" font-size="12" font-weight="500" fill="#14304f">'+p.n+'</text></g>'});
return s+'</svg>'}

const crops = [
    { id: "tomato", name: "Tomato", range: "13–15°C", humidity: "85–90% RH", note: "Chilling sensitive. Avoid temperatures below 10°C to help prevent flavor loss and pitting." },
    { id: "onion", name: "Onion", range: "0–2°C", humidity: "65–70% RH", note: "Keep humidity low to reduce root sprouting and rot. Store separately due to strong odors." },
    { id: "cabbage", name: "Cabbage", range: "0–2°C", humidity: "95–100% RH", note: "Sensitive to ethylene, which can cause yellowing and leaf drop." },
    { id: "papaya", name: "Papaya", range: "7–10°C", humidity: "85–90% RH", note: "Susceptible to chilling injury below 7°C." },
    { id: "pepper", name: "Pepper", range: "7–10°C", humidity: "90–95% RH", note: "Shrivelling can occur quickly if humidity drops. Keep away from ethylene producers." },
    { id: "green-bean", name: "Green Bean", range: "5–7.5°C", humidity: "90–95% RH", note: "Sensitive to chilling injury below 4°C and highly perishable." },
];

const traceSteps = [
    { title: "Customer", detail: "The product reaches the right customer at the right quality.", icon: Users },
    { title: "Market delivery", detail: "Delivered to the market.", icon: Store },
    { title: "Cold storage", detail: "Held in cold storage.", icon: Warehouse },
    { title: "Grading", detail: "Classified by quality.", icon: BadgeCheck, gate: "Grading" },
    { title: "Transport", detail: "Moved by coordinated, traceable logistics.", icon: Truck },
    { title: "Pre-cooling", detail: "Cooled to protect freshness.", icon: Snowflake, gate: "Pre-cooling and cold storage" },
    { title: "Aggregation", detail: "Collected in crates with quality control.", icon: Boxes, gate: "Crate-based movement" },
    { title: "Harvest", detail: "Harvested and handled to a standard.", icon: Sprout, gate: "Standardized harvesting and handling" },
    { title: "Production", detail: "The farm and origin of the product are known.", icon: Leaf, gate: "Planned production" },
];

const qualityGates = [
    { label: "Planned production", step: "Production" },
    { label: "Standardized harvesting and handling", step: "Harvest" },
    { label: "Crate-based movement", step: "Aggregation" },
    { label: "Pre-cooling and cold storage", step: "Pre-cooling" },
    { label: "Grading", step: "Grading" },
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
    const sceneRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selected = digitalPlatforms[selectedIndex];

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;
        scene.innerHTML = isoSceneSVG();
        const groups = [...scene.querySelectorAll(".iso-n")];
        const choose = (index) => setSelectedIndex(index);
        const handlers = groups.map((group) => {
            const index = Number(group.dataset.i);
            const onClick = () => choose(index);
            const onFocus = () => choose(index);
            const onKeyDown = (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    choose(index);
                }
            };
            group.addEventListener("click", onClick);
            group.addEventListener("mouseenter", onFocus);
            group.addEventListener("focus", onFocus);
            group.addEventListener("keydown", onKeyDown);
            return { group, onClick, onFocus, onKeyDown };
        });
        return () => handlers.forEach(({ group, onClick, onFocus, onKeyDown }) => {
            group.removeEventListener("click", onClick);
            group.removeEventListener("mouseenter", onFocus);
            group.removeEventListener("focus", onFocus);
            group.removeEventListener("keydown", onKeyDown);
        });
    }, []);

    useEffect(() => {
        sceneRef.current?.querySelectorAll(".iso-n").forEach((group) => {
            group.classList.toggle("sel", Number(group.dataset.i) === selectedIndex);
        });
    }, [selectedIndex]);

    const move = (direction) => setSelectedIndex((selectedIndex + direction + digitalPlatforms.length) % digitalPlatforms.length);

    return (
        <div className="core-digital-panel">
            <div ref={sceneRef} className="core-isometric-scene" aria-label="Digital platforms linked through central Bedebo" />
            <div className="iso-caption" aria-live="polite">
                <div className="iso-caption-heading">
                    <h4>{selected.name}</h4>
                    <span>Step {selectedIndex + 1} of {digitalPlatforms.length}</span>
                </div>
                <ol>
                    {selected.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
                <div className="iso-caption-controls">
                    <button type="button" onClick={() => move(-1)}><ArrowLeft size={16} aria-hidden="true" /> Back</button>
                    <button type="button" onClick={() => move(1)}>Next <ArrowRight size={16} aria-hidden="true" /></button>
                </div>
            </div>
        </div>
    );
}

function ColdChainIntegration() {
    const [selectedCropId, setSelectedCropId] = useState(crops[0].id);
    const selectedCrop = crops.find((crop) => crop.id === selectedCropId);
    const measures = [
        { label: "Crate-based handling", icon: Package },
        { label: "Solar pre-cooling", icon: Sun },
        { label: "Cold rooms", icon: Snowflake },
        { label: "Coordinated logistics", icon: Truck },
        { label: "Digital scheduling", icon: CalendarDays },
    ];

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
                {measures.map(({ label, icon: Icon }) => <div className="core-measure" key={label}><Icon className="core-measure-icon" size={17} aria-hidden="true" />{label}</div>)}
            </div>
        </div>
    );
}

function QualityTraceability() {
    const [started, setStarted] = useState(false);
    const [litSteps, setLitSteps] = useState(0);
    const [runId, setRunId] = useState(0);

    useEffect(() => {
        if (!started) return undefined;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let timer;
        const showAll = () => {
            window.clearInterval(timer);
            setLitSteps(traceSteps.length);
        };
        if (reducedMotion.matches) {
            showAll();
        } else {
            timer = window.setInterval(() => {
                setLitSteps((count) => {
                    const next = Math.min(traceSteps.length, count + 1);
                    if (next === traceSteps.length) window.clearInterval(timer);
                    return next;
                });
            }, 500);
        }
        const onMotionChange = () => {
            if (reducedMotion.matches) showAll();
        };
        reducedMotion.addEventListener("change", onMotionChange);
        return () => {
            window.clearInterval(timer);
            reducedMotion.removeEventListener("change", onMotionChange);
        };
    }, [started, runId]);

    const startTrace = () => {
        setLitSteps(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? traceSteps.length : 0);
        setStarted(true);
        setRunId((current) => current + 1);
    };
    const completedGates = qualityGates.filter((gate) => {
        const relatedStep = traceSteps.findIndex((step) => step.title === gate.step);
        return relatedStep >= 0 && litSteps > relatedStep;
    });
    const outcomes = [
        { label: "better freshness", icon: Snowflake },
        { label: "consistent specifications", icon: BadgeCheck },
        { label: "less physical damage", icon: Package },
        { label: "fewer buyer rejections", icon: ShieldCheck },
    ];

    return (
        <div className="core-trace-panel">
            <div className="core-trace-layout">
                <div className="core-trace-journey">
                    <div className="core-trace-heading">
                        <div>
                            <h4>Product journey</h4>
                            <p>Follow one product from customer back to production.</p>
                        </div>
                        <button type="button" className="core-primary-button" onClick={startTrace}>{started ? "Replay" : "Trace this product"}</button>
                    </div>
                    <ol className="core-trace-timeline" aria-label="Product trace from customer to production" aria-live="polite" style={{ "--trace-progress": `${litSteps / traceSteps.length * 100}%` }}>
                        {traceSteps.map((step, index) => {
                            const Icon = step.icon;
                            const isLit = index < litSteps;
                            return (
                                <li className={`core-trace-step${isLit ? " is-lit" : ""}`} key={step.title}>
                                    <span className="core-trace-marker">
                                        <span className="core-trace-number">{index + 1}</span>
                                        <Check className="core-trace-check" size={14} aria-hidden="true" />
                                    </span>
                                    <Icon className="core-trace-step-icon" size={18} aria-hidden="true" />
                                    <span className="core-trace-step-copy"><strong>{step.title}</strong><span>{step.detail}</span></span>
                                </li>
                            );
                        })}
                    </ol>
                </div>
                <aside className="core-quality-checks">
                    <div className="core-quality-checks-heading">
                        <h4>Quality protection</h4>
                        <span>{completedGates.length} of {qualityGates.length} checks</span>
                    </div>
                    <ul className="core-quality-gates">
                        {qualityGates.map((gate) => (
                            <li className={`core-quality-gate${completedGates.includes(gate) ? " is-complete" : ""}`} key={gate.label}>
                                <span><Check size={13} aria-hidden="true" /></span>{gate.label}
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
            <div className="core-trace-outcomes" aria-label="Traceability outcomes">
                {outcomes.map((outcome) => {
                    const Icon = outcome.icon;
                    return <div className="core-trace-outcome" key={outcome.label}><Icon size={19} aria-hidden="true" /><span>{outcome.label}</span></div>;
                })}
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

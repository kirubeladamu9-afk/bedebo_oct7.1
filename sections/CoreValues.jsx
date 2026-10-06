"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Check, ClipboardCheck, Clock3, HandCoins, Leaf, Package, ShieldCheck, Truck, Warehouse, CalendarClock, Snowflake, Thermometer, Target, FileText, Share2, Smartphone } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Traceability from "@/sections/Traceability";

const tabIcons = [Share2, Smartphone, Snowflake, ShieldCheck];

const tabItems = [
    { label: "Value chain integration", role: "The partnership layer", points: ["Eight connected stages", "Clear roles across the chain", "Quality protected from farm to market"], tone: "green" },
    { label: "Digital integration", role: "The information layer", points: ["One connected platform", "Recorded movement and transactions", "Journey visibility from farm to vendor"], tone: "blue" },
    { label: "Cold chain integration", role: "The freshness layer", title: "Freshness & Post-Harvest Loss Reduction", description: "Fresh horticultural products lose value quickly when harvesting, handling, transport, storage and market access are poorly coordinated. BEDEBO therefore treats loss reduction as value creation, not merely as an operational issue.", points: ["Continuous temperature control", "Less post-harvest loss", "Longer shelf life and reach", "Sensor monitoring", "Food safety"], icon: Snowflake, tone: "teal" },
    { label: "Quality and traceability", role: "The trust layer", title: "The trust layer, farm to table", description: "Customers can trust what they eat and verify where it came from.", points: ["Quality standards", "Batch traceability", "Rapid response", "Consumer confidence", "Export readiness"], icon: ShieldCheck, tone: "violet" },
];

const values = [
    { title: "Quality at Every Stage", quote: "Quality starts at the farm and must be protected until delivery.", detail: "BEDEBO builds quality into the entire horticultural journey rather than inspecting it only when products reach the market.", color: "#27965a" },
    { title: "Farm-to-Market Traceability", quote: "Know the product. Know the source. Know the journey.", detail: "Make the horticultural value chain visible and accountable from production through final market delivery.", color: "#6b4fd8" },
    { title: "Freshness & Post-Harvest Loss Reduction", quote: "Protect more of what farmers produce.", detail: "An illustrative project target is reducing farm-to-consumer losses from 46% to 23%, with 77 kg rather than 54 kg reaching consumers per 100 kg.", color: "#0e93a8", metrics: true },
    { title: "Digital Market Connection", quote: "Connecting the right product to the right buyer at the right time.", detail: "Integrate physical horticultural supply with digital market coordination.", color: "#2f6fed" },
    { title: "Fair & Transparent Value", quote: "Quality determines value, and value should be visible across the chain.", detail: "Support premium value for premium quality and appropriate, affordable channels for other commercially acceptable grades.", color: "#d9822b" },
    { title: "Reliable & Shared Growth", quote: "A stronger value chain must create value for every critical actor.", detail: "BEDEBO combines physical service infrastructure and standards with digital coordination and market linkage to support shared growth across critical actors.", color: "#c2477a" },
];

const crops = [
    { name: "Tomato (Mature Green)", min: 13, max: 15, humidity: "85% to 90%", note: "Chilling sensitive. Never drop below 10°C to avoid flavor loss and pitting. Highly ethylene-producing.", fahrenheit: "55°F to 60°F", stages: [26, 15, 14, 14, 14] },
    { name: "Onion (Cured/Dry)", min: 0, max: 2, humidity: "65% to 70%", note: "Low humidity exception. High humidity triggers root sprouting and rot. Keep separate due to strong odors.", fahrenheit: "32°F to 36°F", stages: [26, 2, 1, 1, 1] },
    { name: "Cabbage", min: 0, max: 2, humidity: "95% to 100%", note: "Hardy crop but highly sensitive to ethylene gas, which causes yellowing and leaf drop.", fahrenheit: "32°F to 36°F", stages: [24, 2, 1, 1, 1] },
    { name: "Papaya", min: 7, max: 10, humidity: "85% to 90%", note: "Tropical fruit. Susceptible to chilling injury if kept at standard vegetable temperatures below 7°C.", fahrenheit: "45°F to 50°F", stages: [27, 9, 8, 8, 8] },
    { name: "Pepper (Bell/Chili)", min: 7, max: 10, humidity: "90% to 95%", note: "Shrivelling occurs quickly if humidity drops. Do not store with ethylene producers.", fahrenheit: "45°F to 50°F", stages: [26, 9, 8, 8, 8] },
    { name: "Green Bean", min: 5, max: 7.5, humidity: "90% to 95%", note: "Sensitive to chilling injury below 4°C, which causes rusty brown spots. Highly perishable.", fahrenheit: "41°F to 45°F", stages: [25, 7, 6, 6, 6] },
];

const platforms = [
    { title: "Farm: registration and grading", steps: ["The farmer is registered in the Bedebo App.", "Product and type are selected and recorded.", "Weight is registered and the produce is graded.", "Produce leaves in 100 kg woven sacks, shipped to the Union.", "Data goes to central Bedebo."] },
    { title: "Union: check-in and QR crates", steps: ["Product is checked in and received by the ALAs.", "Sacks are converted to QR-labeled crates, one set per farmer with no mixing.", "Data is stored at central Bedebo.", "When the warehouse requests stock, crates are checked out and loaded onto the cold truck."] },
    { title: "Warehouse: request and cold storage", steps: ["The warehouse requests stock.", "The request goes through central Bedebo to the Union.", "The cold truck carries the crates from the Union to the warehouse.", "Crates are unloaded and checked in to cold storage.", "Data is sent to central Bedebo."] },
    { title: "Vendor: order and delivery", steps: ["The vendor places an order in the Bedebo platform.", "Crates are checked out and loaded onto the cold truck.", "The truck carries the order from the warehouse to the vendor.", "Crates are received and delivery is confirmed to central Bedebo."] },
    { title: "Central Bedebo platform", steps: ["Every registration, check-in, check-out, request, and order is recorded here.", "The whole journey stays visible and traceable, from the farmer to the vendor."] },
];

const qualitySteps = [
    { title: "Vendor order", text: "Crate ID scanned out and assigned to the order." },
    { title: "Warehouse", text: "Crate count and quality verified on arrival." },
    { title: "Cold transit", text: "Custody transferred and conditions logged." },
    { title: "Union check-in", text: "Packed in a standard 20 to 25 kg crate, linked to the farmer." },
    { title: "Farm", text: "Certified harvest, graded at collection, with farmer ID and location on record." },
];

const protectionChecks = [
    { title: "Certified farm (Organic, GlobalGAP)", step: 4 },
    { title: "Graded at collection", step: 3 },
    { title: "Weight verified", step: 3 },
    { title: "Cold chain kept in range", step: 2 },
    { title: "Arrival quality check", step: 1 },
];

const measures = [
    { title: "Crate-based handling", icon: Package },
    { title: "Solar pre-cooling", icon: Clock3 },
    { title: "Cold rooms", icon: Warehouse },
    { title: "Coordinated logistics", icon: Truck },
    { title: "Digital scheduling", icon: CalendarClock },
];

const outcomes = [
    { title: "Better freshness", icon: Leaf },
    { title: "Consistent specifications", icon: ClipboardCheck },
    { title: "Less physical damage", icon: ShieldCheck },
    { title: "Fewer buyer rejections", icon: HandCoins },
];

function isoSceneSVG() {
    var P = function (x, y, z) { return [Math.round(360 + (x - y) * 30), Math.round(100 + (x + y) * 17.32 - z)]; },
        Q = function (a, f) { return '<polygon points="' + a.map(function (q) { return P(q[0], q[1], q[2]); }).join(' ') + '" fill="' + f + '"/>'; },
        B = function (x, y, w, d, h, z, c) { var t = z + h; return Q([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, t], [x + w, y, t]], c[2]) + Q([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, t], [x, y + d, t]], c[1]) + Q([[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]], c[0]); },
        WH = ['#fff', '#e1eaf6', '#c8d6eb'], CR = ['#f2cc8b', '#d29c4c', '#b5843b'], SK = ['#efe0b8', '#d9c28a', '#c2a96f'], GR = ['#63c48c', '#3da56b', '#2f8a58'], TL = ['#aadde8', '#7cc2d1', '#5ca8b8'], BL = ['#7399ec', '#4a76d6', '#3a60b8'], DK = ['#51639e', '#33427a', '#27346a'], RD = ['#f3917f', '#da6550', '#bf5340'], GN = ['#8fe6b2', '#27965a', '#1f7a49'];
    var N = [
        { n: 'Farm', x: -2, y: 4, o: function (x, y) { var r = ''; [.4, 1.3, 2.1].forEach(function (a) { r += B(x + .4, y + a, .5, .5, 8, 0, GR) + B(x + 1, y + a, .5, .5, 8, 0, GR); }); return r + B(x + 1.9, y + .6, .8, .8, 15, 0, SK) + B(x + 1.9, y + 1.7, .8, .8, 15, 0, SK); } },
        { n: 'Union and ALAs', x: 4, y: -2, o: function (x, y) { return [[.4, .3], [1.3, .3], [.4, 1.1], [1.3, 1.1]].map(function (a) { return B(x + a[0], y + a[1], .8, .8, 14, 0, CR); }).join('') + B(x + .4, y + .3, .8, .8, 14, 14, CR) + B(x + .3, y + 2, 1.7, .8, 18, 0, WH) + B(x + 2, y + 2.05, .7, .7, 13, 0, BL); } },
        { n: 'Warehouse (cold storage)', x: 10, y: 4, o: function (x, y) { var c = P(x + 1.5, y + 1.5, 40), s = ''; for (var a = 0; a < 3; a++) { var t = a * Math.PI / 3, dx = 8 * Math.cos(t), dy = 8 * Math.sin(t); s += '<line x1="' + (c[0] - dx) + '" y1="' + (c[1] - dy) + '" x2="' + (c[0] + dx) + '" y2="' + (c[1] + dy) + '" stroke="#fff" stroke-width="2.4"/>'; } return B(x + .5, y + .5, 2, 2, 40, 0, TL) + B(x + .9, y + 2.5, .6, .04, 24, 0, WH) + s; } },
        { n: 'Vendor', x: 4, y: 10, o: function (x, y) { return B(x + .6, y + .8, 1.8, 1.3, 14, 0, WH) + B(x + .5, y + .7, .95, 1.5, 6, 26, RD) + B(x + 1.45, y + .7, .95, 1.5, 6, 26, WH) + B(x + .7, y + 2.2, .5, .5, 8, 0, CR) + B(x + 1.4, y + 2.2, .5, .5, 8, 0, GR); } },
        { n: 'Central Bedebo platform', x: 4, y: 4, o: function (x, y) { var c = P(x + 1.5, y + 1.5, 78); return B(x + .4, y + .6, .8, 1.2, 46, 0, DK) + B(x + 1.3, y + .6, .8, 1.2, 46, 0, DK) + B(x + 2.2, y + .6, .6, 1.2, 46, 0, DK) + [10, 22].map(function (z) { return B(x + .5, y + 1.8, .5, .05, 3, z, GN) + B(x + 1.4, y + 1.8, .5, .05, 3, z, GN); }).join('') + '<g stroke="#3b6fd8" stroke-width="2" fill="#fff"><circle cx="' + (c[0] - 17) + '" cy="' + (c[1] + 3) + '" r="13"/><circle cx="' + (c[0] + 17) + '" cy="' + (c[1] + 3) + '" r="13"/><circle cx="' + c[0] + '" cy="' + (c[1] - 6) + '" r="18"/></g><rect x="' + (c[0] - 27) + '" y="' + (c[1] - 2) + '" width="54" height="17" fill="#fff"/>'; } },
    ], s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" role="group" aria-label="Isometric diagram of the central Bedebo platform connected to farm, Union, warehouse and vendor"><rect width="720" height="540" fill="#cfe3ff"/>',
        F = function (x, y, w, d, z, f) { return Q([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]], f); };
    [[40, 200, 330, 45], [40, 330, 300, 150], [690, 230, 430, 50], [690, 380, 300, 150]].forEach(function (l) { s += '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '" stroke="#fff" stroke-opacity=".55" stroke-dasharray="4 7"/>'; });
    var W = [[5, 1, 1, 3], [5, 7, 1, 3], [1, 5, 3, 1], [7, 5, 3, 1]];
    N.forEach(function (p) { s += F(p.x + .4, p.y + .9, 3, 3, -46, 'rgba(50,90,170,.2)'); });
    W.forEach(function (w) { s += F(w[0] + .4, w[1] + .9, w[2], w[3], -46, 'rgba(50,90,170,.15)') + B(w[0], w[1], w[2], w[3], 14, -14, WH); });
    N.forEach(function (p) { s += B(p.x, p.y, 3, 3, 14, -14, WH); });
    N.map(function (p, i) { return [p, i]; }).sort(function (a, b) { return a[0].x + a[0].y - b[0].x - b[0].y; }).forEach(function (q) {
        var p = q[0], f = P(p.x + 3, p.y + 3, -14), w = Math.round(p.n.length * 6.6 + 24);
        s += '<g class="iso-n" data-i="' + q[1] + '" role="button" aria-label="' + p.n + '">' + Q([[p.x, p.y, 0], [p.x + 3, p.y, 0], [p.x + 3, p.y + 3, 0], [p.x, p.y + 3, 0]], 'none').replace('fill="none"', 'class="iso-hl"') + '<g class="iso-ob">' + p.o(p.x, p.y) + '</g><rect x="' + (f[0] - w / 2) + '" y="' + (f[1] + 8) + '" width="' + w + '" height="22" rx="11" fill="#fff"/><text x="' + f[0] + '" y="' + (f[1] + 23) + '" text-anchor="middle" font-size="12" font-weight="500" fill="#14304f">' + p.n + '</text></g>';
    });
    return s + '</svg>';
}

function IntroCard({ item }) {
    const tones = {
        green: "border-[#3DB268]/20 bg-[#3DB268]/[0.06] text-[#267A47] dark:bg-[#3DB268]/[0.1] dark:text-[#75D59A]",
        blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300",
        teal: "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-300",
        violet: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300",
    };
    const Chip = item.tone === "teal" ? "bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200" : "bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200";
    const Icon = item.icon;
    return (
        <div className={`mx-auto mb-8 min-h-[176px] max-w-6xl rounded-2xl border p-5 sm:p-7 ${tones[item.tone]}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">{item.role}</p>
            {item.description ? (
                <div className="mt-4 flex gap-4">
                    <Icon size={24} aria-hidden="true" className="mt-1 shrink-0" />
                    <div className="min-w-0">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {item.points.map((point) => <li key={point} className={`rounded-full px-3 py-1.5 text-xs font-medium ${Chip}`}>{point}</li>)}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{item.label}</h3>
                    <ul className="grid gap-2 text-sm leading-5 text-slate-600 dark:text-slate-300 sm:grid-cols-3 md:gap-3">
                        {item.points.map((point) => <li key={point} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0" /><span>{point}</span></li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

function DigitalIntegration() {
    const sceneRef = useRef(null);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const svg = isoSceneSVG().replace(/class="iso-n"/g, 'class="iso-n" tabindex="0"');
        if (sceneRef.current) sceneRef.current.innerHTML = svg;
    }, []);

    useEffect(() => {
        sceneRef.current?.querySelectorAll(".iso-n").forEach((node) => {
            const isSelected = Number(node.dataset.i) === selected;
            node.classList.toggle("sel", isSelected);
            node.setAttribute("aria-pressed", String(isSelected));
        });
    }, [selected]);

    const selectNode = (node) => {
        const value = Number(node?.dataset.i);
        if (Number.isInteger(value) && value >= 0 && value < platforms.length) setSelected(value);
    };
    const move = (direction) => setSelected((current) => (current + direction + platforms.length) % platforms.length);

    return (
        <div className="mx-auto max-w-6xl">
            <div ref={sceneRef} className="iso-scene w-full overflow-visible rounded-2xl bg-[#cfe3ff]" onClick={(event) => selectNode(event.target.closest(".iso-n[data-i]"))} onMouseOver={(event) => selectNode(event.target.closest(".iso-n[data-i]"))} onFocus={(event) => selectNode(event.target.closest(".iso-n[data-i]"))} onKeyDown={(event) => {
                const node = event.target.closest(".iso-n[data-i]");
                if (node && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    selectNode(node);
                }
            }} />
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                    <h3 className="text-base font-semibold text-[#267A47] dark:text-[#75D59A] sm:text-lg">{platforms[selected].title}</h3>
                    <span className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">Step {selected + 1} of 5</span>
                </div>
                <ol className="mt-5 grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {platforms[selected].steps.map((step, index) => <li key={step} className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-200">{index + 1}</span><span>{step}</span></li>)}
                </ol>
                <div className="mt-6 flex justify-between gap-3">
                    <button type="button" onClick={() => move(-1)} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Back</button>
                    <button type="button" onClick={() => move(1)} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">Next</button>
                </div>
            </div>
        </div>
    );
}

function FreshnessTab() {
    const [selectedCrop, setSelectedCrop] = useState(0);
    const [stage, setStage] = useState(3);
    const [auto, setAuto] = useState(false);
    const crop = crops[selectedCrop];
    const stageNames = ["Farm", "Aggregation", "Cold transit", "Warehouse", "Delivery"];
    const temperatures = crop.stages;
    const yPositions = temperatures.map((temperature) => 186 - temperature * 4);
    const bandHeight = Math.max((crop.max - crop.min) * 4, 22);
    const bandY = 186 - ((crop.min + crop.max) / 2) * 4 - bandHeight / 2;
    const xPositions = [68, 212, 356, 500, 644];
    const loss = Math.round(46 - (23 * stage) / 4);
    const reaching = 100 - loss;
    const idealFahrenheit = crop.fahrenheit ?? `${Math.round((crop.min * 9) / 5 + 32)}°F to ${Math.round((crop.max * 9) / 5 + 32)}°F`;
    const rangeLabel = `${crop.min} to ${crop.max} °C`;
    const solidPoints = xPositions.slice(0, stage + 1).map((x, index) => `${x},${yPositions[index]}`).join(" ");
    const dottedPoints = xPositions.slice(stage).map((x, index) => `${x},${yPositions[index + stage]}`).join(" ");

    useEffect(() => {
        if (!auto) return undefined;
        if (stage >= stageNames.length - 1) {
            setAuto(false);
            return undefined;
        }
        const timer = window.setInterval(() => setStage((current) => Math.min(current + 1, stageNames.length - 1)), 2400);
        return () => window.clearInterval(timer);
    }, [auto, stage, stageNames.length]);

    const chooseStage = (index) => {
        setAuto(false);
        setStage(index);
    };
    const chooseCrop = (event) => {
        setSelectedCrop(Number(event.target.value));
        setAuto(false);
    };

    return (
        <article className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-teal-500 bg-white shadow-sm dark:border-slate-800 dark:border-t-teal-400 dark:bg-slate-900">
            <div className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(190px,0.9fr)_minmax(330px,1.6fr)_auto] xl:items-start">
                <div>
                    <div className="flex items-end gap-3">
                        <p className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">{temperatures[stage]}°C</p>
                        <p className="pb-1 text-sm font-semibold text-teal-700 dark:text-teal-300">{stageNames[stage]}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <label className="sr-only" htmlFor="cold-chain-crop">Crop</label>
                        <select id="cold-chain-crop" value={selectedCrop} onChange={chooseCrop} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            {crops.map((item, index) => <option key={item.name} value={index}>{item.name}</option>)}
                        </select>
                        <button type="button" aria-pressed={auto} onClick={() => setAuto((current) => current || !window.matchMedia("(prefers-reduced-motion: reduce)").matches)} className={`rounded-lg border px-3 py-2.5 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${auto ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}`}>Auto {auto ? "On" : "Off"}</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-red-50 p-3 dark:bg-red-950/30 sm:p-4">
                        <div className="flex items-center gap-2 text-xs font-medium leading-4 text-slate-600 dark:text-slate-300"><span className="flex size-7 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300"><span className="relative"><Thermometer size={16} aria-hidden="true" /><ArrowDown className="absolute -bottom-1 -right-2" size={9} aria-hidden="true" /></span></span>Farm-to-consumer losses</div>
                        <p className="mt-3 text-3xl font-semibold text-red-600 dark:text-red-400">{loss}%</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">46% to 23%</p>
                    </div>
                    <div className="rounded-xl bg-teal-50 p-3 dark:bg-teal-950/30 sm:p-4">
                        <div className="flex items-center gap-2 text-xs font-medium leading-4 text-slate-600 dark:text-slate-300"><span className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300"><span className="relative"><Thermometer size={16} aria-hidden="true" /><ArrowUp className="absolute -right-2 -top-1" size={9} aria-hidden="true" /></span></span>Reaching consumers per 100 kg</div>
                        <p className="mt-3 text-3xl font-semibold text-teal-700 dark:text-teal-300">{reaching} kg</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">54 kg to 77 kg</p>
                    </div>
                </div>
                <div className="xl:justify-self-end">
                    <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${stage === 0 ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300" : "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200"}`}>{stage === 0 ? "Above safe range" : "In safe range"}</span>
                </div>
            </div>
            <div className="px-4 sm:px-7">
                <svg viewBox="0 0 700 230" role="img" aria-label={`Temperature journey for ${crop.name}. Ideal range ${rangeLabel}. Current stage ${stageNames[stage]}.`} className="block h-auto w-full overflow-visible">
                    <text x="350" y="23" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="600">Without a cold chain, produce spoils in the heat</text>
                    <line x1="48" y1="42" x2="665" y2="42" stroke="#ef4444" strokeWidth="2" strokeDasharray="7 6" />
                    <rect x="48" y={bandY} width="618" height={bandHeight} rx="8" fill="#ccfbf1" />
                    <line x1="48" y1={bandY} x2="666" y2={bandY} stroke="#5eead4" strokeWidth="1" />
                    <line x1="48" y1={bandY + bandHeight} x2="666" y2={bandY + bandHeight} stroke="#5eead4" strokeWidth="1" />
                    <text x="658" y={bandY + bandHeight / 2 + 4} textAnchor="end" fill="#0f766e" fontSize="12" fontWeight="600">{rangeLabel}</text>
                    {stage > 0 && <polyline points={solidPoints} fill="none" stroke="#0f9f8c" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />}
                    {stage === 0 && <circle cx={xPositions[0]} cy={yPositions[0]} r="3.5" fill="#0f9f8c" />}
                    {stage < stageNames.length - 1 && <polyline points={dottedPoints} fill="none" stroke="#0f9f8c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 10" />}
                    <circle cx={xPositions[stage]} cy={yPositions[stage]} r="17" fill="#14b8a6" fillOpacity=".18" />
                    <circle cx={xPositions[stage]} cy={yPositions[stage]} r="8" fill="#0f9f8c" />
                </svg>
                <div className="grid grid-cols-5 gap-1 pb-4">
                    {stageNames.map((name, index) => <button key={name} type="button" aria-pressed={stage === index} onClick={() => chooseStage(index)} className={`min-w-0 rounded-md px-1 py-2 text-[10px] leading-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:text-xs ${stage === index ? "font-bold text-teal-700 dark:text-teal-300" : "text-slate-500 dark:text-slate-400"}`}>{name}</button>)}
                </div>
            </div>
            <div className="mx-5 mb-4 rounded-xl bg-teal-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-teal-950/40 dark:text-slate-200 sm:mx-7 sm:px-5">
                <p><strong>{crop.name}</strong> · Ideal {crop.min}°C to {crop.max}°C ({idealFahrenheit}) · RH {crop.humidity}.</p>
                <p>{crop.note}</p>
            </div>
            <p className="px-5 pb-5 text-[11px] leading-5 text-slate-500 dark:text-slate-400 sm:px-7">Ideal ranges follow the BEDEBO crop portfolio. Stage temperatures and loss figures are illustrative; the 46% to 23% and 54 kg to 77 kg figures are project targets.</p>
        </article>
    );
}

function CrateQr() {
    const cells = Array.from({ length: 29 }, (_, row) => Array.from({ length: 29 }, (_, column) => {
        const finders = [[0, 0], [0, 22], [22, 0]];
        for (const [top, left] of finders) {
            const y = row - top;
            const x = column - left;
            if (x >= 0 && x < 7 && y >= 0 && y < 7) return x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4);
        }
        return (row * 7 + column * 11 + row * column) % 5 < 2;
    }));
    return <svg viewBox="0 0 64 64" role="img" aria-label="QR code crate label" className="size-48 max-w-full bg-white p-2"><rect width="64" height="64" fill="white" />{cells.flatMap((row, y) => row.map((dark, x) => dark && <rect key={`${x}-${y}`} x={3 + x * 2} y={3 + y * 2} width="2" height="2" fill="#111827" />))}</svg>;
}

function QualityTrace() {
    const [traceStep, setTraceStep] = useState(qualitySteps.length - 1);
    const [traceRunning, setTraceRunning] = useState(false);
    const [scanId, setScanId] = useState(0);

    useEffect(() => {
        if (!traceRunning) return undefined;
        if (traceStep >= qualitySteps.length - 1) {
            setTraceRunning(false);
            return undefined;
        }
        const timer = window.setTimeout(() => setTraceStep((current) => current + 1), 560);
        return () => window.clearTimeout(timer);
    }, [traceRunning, traceStep]);

    const startTrace = () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTraceStep(qualitySteps.length - 1);
            setTraceRunning(false);
            return;
        }
        setScanId((current) => current + 1);
        setTraceStep(-1);
        setTraceRunning(true);
    };
    const completedChecks = protectionChecks.filter(({ step }) => traceStep >= step).length;

    return (
        <article className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-violet-500 bg-white p-5 shadow-sm dark:border-slate-800 dark:border-t-violet-400 dark:bg-slate-900 sm:p-7">
            <div className="grid gap-8 lg:grid-cols-2">
                <div>
                    <div className="relative flex flex-col items-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50/40 p-5 dark:border-violet-800 dark:bg-violet-950/20">
                        <div className="relative overflow-hidden rounded-lg p-2">
                            <CrateQr />
                            <span key={scanId} aria-hidden="true" className={`pointer-events-none absolute inset-x-2 top-0 h-0.5 bg-violet-500 shadow-[0_0_12px_3px_rgba(139,92,246,0.45)] ${traceRunning ? "qr-scan-line" : "opacity-0"}`} />
                        </div>
                        <p className="mt-3 text-center text-sm font-medium text-slate-600 dark:text-slate-300">Crate label with unique QR or batch ID</p>
                        <button type="button" onClick={startTrace} disabled={traceRunning} className="mt-5 w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:cursor-wait disabled:opacity-70">Scan crate and trace it</button>
                    </div>
                    <div className="mt-7">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-lg font-semibold">Quality checks</h3>
                            <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-800 dark:bg-violet-900/50 dark:text-violet-200">{completedChecks} of 5 passed</span>
                        </div>
                        <ul className="mt-4 space-y-3" aria-live="polite">
                            {protectionChecks.map(({ title, step }) => {
                                const passed = traceStep >= step;
                                return <li key={title} className="flex items-center gap-3"><span className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${passed ? "bg-violet-600 text-white" : "bg-violet-100 text-transparent dark:bg-violet-950"}`}><Check size={14} /></span><span className={`text-sm leading-5 ${passed ? "text-slate-800 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>{title}</span></li>;
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Trace back to the farmer</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">One scan follows the crate backwards through every step.</p>
                    <ol className="mt-6 space-y-0" aria-live="polite">
                        {qualitySteps.map(({ title, text }, index) => {
                            const passed = index <= traceStep;
                            return <li key={title} className="relative flex min-h-[78px] gap-3 pb-4 last:pb-0">
                                {index < qualitySteps.length - 1 && <span aria-hidden="true" className={`absolute left-3 top-7 h-[calc(100%-8px)] w-px ${index < traceStep ? "bg-violet-400" : "bg-slate-200 dark:bg-slate-700"}`} />}
                                <span className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${passed ? "bg-violet-600 text-white" : "bg-violet-100 text-transparent dark:bg-violet-950"}`}><Check size={14} /></span>
                                <div className={`min-w-0 flex-1 rounded-xl px-3 py-2 transition-colors ${passed ? "bg-violet-50 dark:bg-violet-950/40" : "bg-slate-50 dark:bg-slate-800/50"}`}>
                                    <h4 className={`text-sm font-semibold ${passed ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>{title}</h4>
                                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{text}</p>
                                </div>
                            </li>;
                        })}
                        <li className={`flex gap-3 rounded-xl bg-violet-50 p-3 transition-opacity dark:bg-violet-950/40 ${traceStep >= qualitySteps.length - 1 ? "opacity-100" : "opacity-0"}`}>
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white"><Check size={14} /></span>
                            <p className="text-xs font-medium leading-5 text-violet-900 dark:text-violet-100">Traced end to end: from the vendor shipment back to the individual farmer&apos;s harvest.</p>
                        </li>
                    </ol>
                </div>
            </div>
        </article>
    );
}

export default function CoreValues() {
    const [activeTab, setActiveTab] = useState(0);
    const [activeValue, setActiveValue] = useState(0);
    const [brandPhrase, setBrandPhrase] = useState(0);
    const [tabPill, setTabPill] = useState({ left: 5, width: 0 });
    const touchStart = useRef(null);
    const tabRefs = useRef([]);
    const tabColors = ["#27965a", "#2f6fed", "#0e93a8", "#6b4fd8"];
    const phraseParts = ["Freshness Protected.", "Quality Assured.", "Markets Connected.", "Value Shared."];
    const selectTab = (index) => setActiveTab((index + tabItems.length) % tabItems.length);

    useEffect(() => {
        const updatePill = () => {
            const tab = tabRefs.current[activeTab];
            if (tab) setTabPill({ left: tab.offsetLeft, width: tab.offsetWidth });
        };
        updatePill();
        window.addEventListener("resize", updatePill);
        return () => window.removeEventListener("resize", updatePill);
    }, [activeTab]);

    const handleTabKeyDown = (event) => {
        let nextTab = activeTab;
        if (event.key === "ArrowRight") nextTab = (activeTab + 1) % tabItems.length;
        if (event.key === "ArrowLeft") nextTab = (activeTab - 1 + tabItems.length) % tabItems.length;
        if (event.key === "Home") nextTab = 0;
        if (event.key === "End") nextTab = tabItems.length - 1;
        if (nextTab !== activeTab) {
            event.preventDefault();
            selectTab(nextTab);
            tabRefs.current[nextTab]?.focus();
        }
    };
    const moveValue = (direction) => setActiveValue((current) => (current + direction + values.length) % values.length);
    const handleValueTouchEnd = (event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 45) moveValue(delta < 0 ? 1 : -1);
        touchStart.current = null;
    };
    const value = values[activeValue];

    return (
        <section id="core-values" aria-labelledby="core-values-title" className="scroll-mt-24 px-6 pb-20 md:px-10 lg:px-16">
            <SectionTitle label="CORE VALUES" title="Our Core" highlight="Values" headingId="core-values-title" />
            <div className="mx-auto mt-10 max-w-[1040px]">
                <div className="grid items-stretch gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                    <article className="relative flex min-h-[250px] flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#23a062] to-[#17613f] p-6 text-white sm:p-8">
                        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full border border-white/20" />
                        <span aria-hidden="true" className="pointer-events-none absolute -right-7 -top-7 size-32 rounded-full border border-white/20" />
                        <span className="relative mb-4 flex size-11 items-center justify-center rounded-xl bg-white/15"><Target size={23} aria-hidden="true" /></span>
                        <h3 className="relative text-xl font-semibold">Objective</h3>
                        <p className="relative mt-2 text-sm leading-6 text-white/95">To build a <strong className="border-b-2 border-white/40">digitally integrated</strong>, <strong className="border-b-2 border-white/40">quality-driven</strong> and <strong className="border-b-2 border-white/40">market-connected</strong> horticulture supply system that delivers the right product, at the right quality, to the right customer, at the right time and at a fair and transparent price.</p>
                    </article>
                    <article className="flex min-h-[250px] flex-col rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                        <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400"><FileText size={23} aria-hidden="true" /></span>
                        <h3 className="text-xl font-semibold">Executive Summary</h3>
                        <div className="mt-3 rounded-r-xl border-l-4 border-[#27965a] bg-[#27965a]/[0.08] px-4 py-2.5" role="group" aria-label="Freshness Protected. Quality Assured. Markets Connected. Value Shared.">
                            {phraseParts.map((phrase, index) => <button key={phrase} type="button" aria-pressed={brandPhrase === index} onClick={() => setBrandPhrase(index)} className={`block text-left text-sm font-semibold leading-6 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] ${brandPhrase === index ? "opacity-100" : "opacity-45"}`} style={{ color: ["#1f8a52", "#6b4fd8", "#2f6fed", "#c27a14"][index] }}>{phrase}</button>)}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">BEDEBO Ethiopia Share Company builds a digitally integrated, market-driven horticulture value chain connecting farmers, Agricultural Service Providers (ASPs), logistics and cold-chain operators, market partners, and end customers.</p>
                    </article>
                </div>
                <div className="mt-4 flex flex-wrap gap-2" aria-label="Crops">
                    {["Tomato", "Onion", "Cabbage", "Papaya", "Pepper", "Green Bean"].map((crop) => <span key={crop} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{crop}</span>)}
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-[1040px]">
                <div className="mb-4 text-center">
                    <h3 className="text-2xl font-semibold">Six values that guide us</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use the dots to move back and forth.</p>
                </div>
                <article className="relative min-h-[300px] overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm after:pointer-events-none after:absolute after:-bottom-16 after:-right-16 after:size-52 after:rounded-full after:bg-[var(--value-soft)] dark:border-slate-800 dark:bg-slate-900 sm:min-h-[270px] sm:p-8" style={{ borderTop: `5px solid ${value.color}`, "--value-color": value.color, "--value-soft": `${value.color}1a` }} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleValueTouchEnd}>
                    <div className="relative z-10 flex min-h-[210px] flex-col justify-between gap-6 sm:min-h-[205px]">
                        <div>
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex size-11 items-center justify-center rounded-xl text-base font-semibold text-white" style={{ backgroundColor: value.color }}>{activeValue + 1}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Core value {activeValue + 1} of 6</span>
                            </div>
                            <h4 className="text-xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-2xl">{value.title}</h4>
                            <blockquote className="mt-2 text-base font-medium italic leading-6" style={{ color: value.color }}>“{value.quote}”</blockquote>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{value.detail}</p>
                            {value.metrics && <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-700 dark:text-slate-200"><span className="min-w-36 rounded-xl px-4 py-2.5" style={{ backgroundColor: `${value.color}1a` }}><strong className="block text-lg" style={{ color: value.color }}>46% → 23%</strong><span className="text-slate-500 dark:text-slate-400">farm-to-consumer losses</span></span><span className="min-w-36 rounded-xl px-4 py-2.5" style={{ backgroundColor: `${value.color}1a` }}><strong className="block text-lg" style={{ color: value.color }}>54 kg → 77 kg</strong><span className="text-slate-500 dark:text-slate-400">reaching consumers per 100 kg</span></span><span className="basis-full text-[11px] text-slate-500 dark:text-slate-400">Project target based on an illustrative case.</span></div>}
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <button type="button" onClick={() => moveValue(-1)} aria-label="Previous value" className="flex size-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] dark:border-slate-700 dark:text-slate-300"><ArrowLeft size={17} /></button>
                            <button type="button" onClick={() => moveValue(1)} aria-label="Next value" className="flex size-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] dark:border-slate-700 dark:text-slate-300"><ArrowRight size={17} /></button>
                        </div>
                    </div>
                </article>
                <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Choose a core value">
                    {values.map((item, index) => <button key={item.title} type="button" aria-label={`Show core value ${index + 1}: ${item.title}`} aria-pressed={activeValue === index} onClick={() => setActiveValue(index)} className={`size-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] ${activeValue === index ? "w-11" : "w-2.5 bg-slate-300 dark:bg-slate-700"}`} style={activeValue === index ? { backgroundColor: item.color } : undefined}><span className="sr-only">{item.title}</span></button>)}
                </div>
            </div>

            <div className="mx-auto mt-16 max-w-6xl">
                <div role="tablist" aria-label="Core value chain layers" aria-orientation="horizontal" className="relative mx-auto mb-6 flex w-full max-w-[880px] gap-1 overflow-x-auto rounded-[18px] border border-slate-200 bg-white p-[5px] dark:border-slate-800 dark:bg-slate-900" onKeyDown={handleTabKeyDown}>
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-[5px] top-[5px] z-0 rounded-[14px] transition-[left,width,background-color] duration-300" style={{ left: tabPill.left, width: tabPill.width, backgroundColor: tabColors[activeTab] }} />
                    {tabItems.map((item, index) => {
                        const Icon = tabIcons[index];
                        return <button key={item.label} ref={(node) => { tabRefs.current[index] = node; }} id={`core-tab-${index}`} type="button" role="tab" aria-selected={activeTab === index} aria-controls={`core-panel-${index}`} tabIndex={activeTab === index ? 0 : -1} onClick={() => selectTab(index)} className={`relative z-10 flex min-w-max flex-1 items-center justify-center gap-2 rounded-[14px] px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] ${activeTab === index ? "text-white" : "text-slate-600 dark:text-slate-300"}`}><Icon size={18} aria-hidden="true" />{item.label}</button>;
                    })}
                </div>
                <div id={`core-panel-${activeTab}`} role="tabpanel" aria-labelledby={`core-tab-${activeTab}`} tabIndex={0} className="min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27965a]">
                    <IntroCard item={tabItems[activeTab]} />
                    {activeTab === 0 && <Traceability />}
                    {activeTab === 1 && <DigitalIntegration />}
                    {activeTab === 2 && <FreshnessTab />}
                    {activeTab === 3 && <QualityTrace />}
                </div>
            </div>

            <div className="mx-auto mt-14 flex max-w-6xl items-center justify-center rounded-2xl bg-[#27965a] px-6 py-8 text-center text-lg font-semibold leading-7 text-white sm:px-10 sm:py-10 sm:text-2xl">Coordinating the journey from production to market</div>
        </section>
    );
}

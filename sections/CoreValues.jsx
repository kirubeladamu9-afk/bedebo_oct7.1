"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, ClipboardCheck, House, ShieldCheck, Sun, Truck, Snowflake, Target, FileText, Share2, Smartphone } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Traceability from "@/sections/Traceability";

const tabIcons = [Share2, Smartphone, Snowflake, ShieldCheck];

const tabItems = [
    { label: "Value chain integration", role: "The partnership layer", title: "The partnership layer", description: "All actors work as partners, not as disconnected middlemen.", points: ["Farm-to-market linkages", "Coordinated production", "Shared services", "Value addition", "Shared benefit"], icon: Share2, tone: "green" },
    { label: "Digital integration", role: "The information layer", title: "The information layer", description: "BEDEBO supports farmer coordination, aggregation, logistics, market linkage, payment tracking and end-to-end visibility.", points: ["Connected platforms", "Real-time visibility", "Data-driven decisions", "Digital transactions", "Inclusion for all farmers"], icon: Smartphone, tone: "green" },
    { label: "Cold chain integration", role: "The freshness layer", title: "Freshness & Post-Harvest Loss Reduction", description: "Fresh horticultural products lose value quickly when harvesting, handling, transport, storage and market access are poorly coordinated. BEDEBO treats loss reduction as value creation, not merely as an operational issue.", points: ["Crate-based handling", "Solar pre-cooling", "Cold rooms", "Coordinated logistics", "Digital scheduling"], icon: Snowflake, tone: "green" },
    { label: "Quality and traceability", role: "The trust layer", title: "The trust layer, farm to table", description: "Customers can trust what they eat and verify where it came from.", points: ["Quality standards", "Batch traceability", "Rapid response", "Consumer confidence", "Export readiness"], icon: ShieldCheck, tone: "green" },
];

const phraseParts = ["Freshness Protected.", "Quality Assured.", "Markets Connected.", "Value Shared."];
const phraseColors = ["#27965a", "#6b4fd8", "#2f6fed", "#c27a14"];

const values = [
    { title: "Quality at Every Stage", quote: "Quality starts at the farm and must be protected until delivery.", detail: "BEDEBO's first core value is to build quality into the entire horticultural journey rather than inspect quality only when products reach the market.", color: "#27965a" },
    { title: "Farm to Market Traceability", quote: "Know the product. Know the source. Know the journey.", detail: "BEDEBO seeks to make the horticultural value chain visible and accountable from production through final market delivery.", color: "#27965a" },
    { title: "Freshness & Postharvest Loss", quote: "Protect more of what farmers produce.", detail: "The project model targets a reduction in overall farm-to-consumer losses from approximately 46% to approximately 23%, with its illustrative case showing 77 kg rather than 54 kg reaching consumers from the same 100 kg.", color: "#27965a", metrics: true },
    { title: "Digital Market Connection", quote: "Connecting the right product to the right buyer at the right time.", detail: "BEDEBO's defining capability is the integration of physical horticultural supply with digital market coordination.", color: "#27965a" },
    { title: "Fair & Transparent Value", quote: "Quality determines value—and value should be visible across the chain.", detail: "This allows BEDEBO to pursue two objectives simultaneously: premium value for premium quality and appropriate, affordable market channels for other commercially acceptable grades.", color: "#27965a" },
    { title: "Reliable & Shared Growth", quote: "A stronger value chain must create value for every critical actor.", detail: "The existing model explicitly combines CAMS-led physical service infrastructure and standards with BEDEBO-led digital coordination and market linkage. When farmers produce better, service providers operate efficiently, logistics protect quality, BEDEBO coordinates transparently and buyers receive reliable products, the entire horticulture ecosystem grows together.", color: "#27965a" },
];

const crops = [
    { name: "Tomato (mature green)", min: "12.5 to 15°C", humidity: "90 to 95%", note: "Chilling sensitive. Colder storage causes flavor loss and pitting." },
    { name: "Onion (dry, cured)", min: "0°C", humidity: "60 to 80%", note: "Keep dry and well ventilated to limit sprouting and rot." },
    { name: "Cabbage", min: "0°C", humidity: "95 to 100%", note: "Cold and humid storage prevents wilting." },
    { name: "Papaya*", min: "10 to 15°C", humidity: "85 to 90%", note: "Chilling sensitive. Handle gently to avoid bruising." },
    { name: "Pepper*", min: "7 to 12°C", humidity: "90 to 95%", note: "Chilling sensitive. Best range depends on pepper type." },
    { name: "Green bean", min: "4 to 7°C", humidity: "about 95%", note: "Short storage life, about 7 to 10 days." },
];

const platforms = [
    { title: "Farm: registration and grading", steps: ["The farmer is registered in the Bedebo App.", "Product and type are selected and recorded.", "Weight is registered and the produce is graded.", "Produce leaves in 100 kg woven sacks, shipped to the Union.", "Data goes to central Bedebo."] },
    { title: "Union: check-in and QR crates", steps: ["Product is checked in and received by the ALAs.", "Sacks are converted to QR-labeled crates, one set per farmer with no mixing.", "Data is stored at central Bedebo.", "When the warehouse requests stock, crates are checked out and loaded onto the cold truck."] },
    { title: "Warehouse: request and cold storage", steps: ["The warehouse requests stock.", "The request goes through central Bedebo to the Union.", "The cold truck carries the crates from the Union to the warehouse.", "Crates are unloaded and checked in to cold storage.", "Data is sent to central Bedebo."] },
    { title: "Vendor: order and delivery", steps: ["The vendor places an order in the Bedebo platform.", "Crates are checked out and loaded onto the cold truck.", "The truck carries the order from the warehouse to the vendor.", "Crates are received and delivery is confirmed to central Bedebo."] },
    { title: "Bedebo central", steps: ["Every registration, check-in, check-out, request, and order is recorded here.", "The whole journey stays visible and traceable, from the farmer to the vendor."] },
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

const freshnessSteps = [
    { title: "Solar pre-cooling", detail: "Field heat is removed soon after harvest, powered by renewable energy.", icon: Sun },
    { title: "Cold rooms and storage", detail: "Crates are held at the right temperature for each crop.", icon: House },
    { title: "Coordinated logistics", detail: "Transport is timed and traceable from stage to stage.", icon: Truck },
    { title: "Digital scheduling", detail: "Loss is reported across stages, so problems are found and fixed.", icon: ClipboardCheck },
];

function isoSceneSVG() {
    var P = function (x, y, z) { return [Math.round(360 + (x - y) * 30), Math.round(100 + (x + y) * 17.32 - z)]; },
        Q = function (a, f) { return '<polygon points="' + a.map(function (q) { return P(q[0], q[1], q[2]); }).join(' ') + '" fill="' + f + '"/>'; },
        B = function (x, y, w, d, h, z, c) { var t = z + h; return Q([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, t], [x + w, y, t]], c[2]) + Q([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, t], [x, y + d, t]], c[1]) + Q([[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]], c[0]); },
        WH = ['#fff', '#e2e8f0', '#cbd5e1'], CR = ['#f2cc8b', '#d29c4c', '#b5843b'], SK = ['#efe0b8', '#d9c28a', '#c2a96f'], GR = ['#63c48c', '#3da56b', '#2f8a58'], TL = ['#8fe6b2', '#3DB268', '#267A47'], BL = ['#8fe6b2', '#3DB268', '#267A47'], DK = ['#3f7652', '#267A47', '#1e5935'], RD = ['#f3917f', '#da6550', '#bf5340'], GN = ['#8fe6b2', '#27965a', '#1f7a49'];
    var N = [
        { n: 'Farm', x: -2, y: 4, o: function (x, y) { var r = ''; [.4, 1.3, 2.1].forEach(function (a) { r += B(x + .4, y + a, .5, .5, 8, 0, GR) + B(x + 1, y + a, .5, .5, 8, 0, GR); }); return r + B(x + 1.9, y + .6, .8, .8, 15, 0, SK) + B(x + 1.9, y + 1.7, .8, .8, 15, 0, SK); } },
        { n: 'Union', x: 4, y: -2, o: function (x, y) { return [[.4, .3], [1.3, .3], [.4, 1.1], [1.3, 1.1]].map(function (a) { return B(x + a[0], y + a[1], .8, .8, 14, 0, CR); }).join('') + B(x + .4, y + .3, .8, .8, 14, 14, CR) + B(x + .3, y + 2, 1.7, .8, 18, 0, WH) + B(x + 2, y + 2.05, .7, .7, 13, 0, BL); } },
        { n: 'Warehouse (cold storage)', x: 10, y: 4, o: function (x, y) { var c = P(x + 1.5, y + 1.5, 40), s = ''; for (var a = 0; a < 3; a++) { var t = a * Math.PI / 3, dx = 8 * Math.cos(t), dy = 8 * Math.sin(t); s += '<line x1="' + (c[0] - dx) + '" y1="' + (c[1] - dy) + '" x2="' + (c[0] + dx) + '" y2="' + (c[1] + dy) + '" stroke="#fff" stroke-width="2.4"/>'; } return B(x + .5, y + .5, 2, 2, 40, 0, TL) + B(x + .9, y + 2.5, .6, .04, 24, 0, WH) + s; } },
        { n: 'Vendor/Market', x: 4, y: 10, o: function (x, y) { return B(x + .6, y + .8, 1.8, 1.3, 14, 0, WH) + B(x + .5, y + .7, .95, 1.5, 6, 26, RD) + B(x + 1.45, y + .7, .95, 1.5, 6, 26, WH) + B(x + .7, y + 2.2, .5, .5, 8, 0, CR) + B(x + 1.4, y + 2.2, .5, .5, 8, 0, GR); } },
        { n: 'Bedebo central', x: 4, y: 4, o: function (x, y) {
            var r = B(x + .4, y + .6, .8, 1.2, 46, 0, DK) + B(x + 1.3, y + .6, .8, 1.2, 46, 0, DK) + B(x + 2.2, y + .6, .6, 1.2, 46, 0, DK), L = '';
            [10, 22].forEach(function (z) { r += B(x + .5, y + 1.8, .5, .05, 3, z, GN) + B(x + 1.4, y + 1.8, .5, .05, 3, z, GN); });
            [.8, 1.7, 2.5].forEach(function (a) {
                var p = P(x + a, y + 1.2, 46), q = P(x + a, y + 1.2, 64);
                L += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="#27965a" stroke-width="2" stroke-dasharray="3 3"/>';
            });
            r += L + B(x + .7, y + 1.15, 1.9, .08, 32, 64, WH);
            [[1, 8], [1.35, 16], [1.7, 24], [2.05, 13], [2.4, 20]].forEach(function (b) { r += B(x + b[0], y + 1.24, .18, .03, b[1], 70, GN); });
            var c = P(x + 1.65, y + 1.2, 112);
            [10, 18, 26].forEach(function (k, i) { r += '<path d="M' + (c[0] - k) + ' ' + c[1] + 'A' + k + ' ' + k + ' 0 0 1 ' + (+c[0] + k) + ' ' + c[1] + '" fill="none" stroke="#27965a" stroke-width="2.6" stroke-linecap="round" opacity="' + [1, .6, .3][i] + '"/>'; });
            return r + '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="3.5" fill="#27965a"/>';
        } },
    ], s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" role="group" aria-label="Isometric diagram of the Bedebo central platform connected to farm, Union, warehouse and Vendor/Market">',
        F = function (x, y, w, d, z, f) { return Q([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]], f); };
    [[40, 200, 330, 45], [40, 330, 300, 150], [690, 230, 430, 50], [690, 380, 300, 150]].forEach(function (l) { s += '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '" stroke="#94a3b8" stroke-opacity=".55" stroke-dasharray="4 7"/>'; });
    var W = [[5, 1, 1, 3], [5, 7, 1, 3], [1, 5, 3, 1], [7, 5, 3, 1]];
    N.forEach(function (p) { s += F(p.x + .4, p.y + .9, 3, 3, -46, 'rgba(15,23,42,.12)'); });
    W.forEach(function (w) { s += F(w[0] + .4, w[1] + .9, w[2], w[3], -46, 'rgba(15,23,42,.1)') + B(w[0], w[1], w[2], w[3], 14, -14, WH); });
    N.forEach(function (p) { s += B(p.x, p.y, 3, 3, 14, -14, WH); });
    N.map(function (p, i) { return [p, i]; }).sort(function (a, b) { return a[0].x + a[0].y - b[0].x - b[0].y; }).forEach(function (q) {
        var p = q[0], f = P(p.x + 3, p.y + 3, -14), w = Math.round(p.n.length * 6.6 + 24);
        s += '<g class="iso-n" data-i="' + q[1] + '" role="button" aria-label="' + p.n + '">' + Q([[p.x, p.y, 0], [p.x + 3, p.y, 0], [p.x + 3, p.y + 3, 0], [p.x, p.y + 3, 0]], 'none').replace('fill="none"', 'class="iso-hl"') + '<g class="iso-ob">' + p.o(p.x, p.y) + '</g><rect x="' + (f[0] - w / 2) + '" y="' + (f[1] + 8) + '" width="' + w + '" height="22" rx="11" fill="#fff"/><text x="' + f[0] + '" y="' + (f[1] + 23) + '" text-anchor="middle" font-size="12" font-weight="500" fill="#14304f">' + p.n + '</text></g>';
    });
    return s + '</svg>';
}

function IntroCard({ item }) {
    const tone = "border-slate-200 border-l-[#27965a] bg-white dark:border-slate-800 dark:border-l-[#3DB268] dark:bg-slate-900";
    const chipTone = "bg-[#27965a]/10 text-[#267A47] dark:bg-[#27965a]/20 dark:text-[#8de0ae]";
    const Chip = chipTone;
    const Icon = item.icon;
    return (
        <div className={`mb-6 w-full rounded-[18px] border p-4 sm:p-5 ${item.description ? "border-l-[5px]" : ""} ${tone}`}>
            {item.description ? (
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-[#27965a]/10 text-[#27965a] dark:bg-[#27965a]/20 dark:text-[#8de0ae]"><Icon size={25} aria-hidden="true" /></span>
                    <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                        <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">{item.description}</p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                            {item.points.map((point) => <li key={point} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${Chip}`}><span aria-hidden="true" className="size-1.5 rounded-full bg-current opacity-70" />{point}</li>)}
                        </ul>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em]">{item.role}</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{item.label}</h3>
                        <ul className="grid gap-2 text-sm leading-5 text-slate-600 dark:text-slate-300 sm:grid-cols-3 md:gap-3">
                            {item.points.map((point) => <li key={point} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0" /><span>{point}</span></li>)}
                        </ul>
                    </div>
                </>
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

    return (
        <div className="w-full">
            <div ref={sceneRef} className="iso-scene mx-auto w-full overflow-visible rounded-2xl md:w-4/5 md:max-w-[900px]" onClick={(event) => selectNode(event.target.closest(".iso-n[data-i]"))} onMouseOver={(event) => selectNode(event.target.closest(".iso-n[data-i]"))} onFocus={(event) => selectNode(event.target.closest(".iso-n[data-i]"))} onKeyDown={(event) => {
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
                    {platforms[selected].steps.map((step, index) => <li key={step} className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#27965a]/10 text-xs font-semibold text-[#267A47] dark:bg-[#27965a]/20 dark:text-[#8de0ae]">{index + 1}</span><span>{step}</span></li>)}
                </ol>
            </div>
        </div>
    );
}

function FreshnessTab() {
    return (
        <div className="space-y-6 text-slate-800 dark:text-slate-100">
            <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl bg-gradient-to-br from-[#27965a] to-[#208454] p-5 text-white sm:p-6">
                    <p className="text-xs font-medium text-white/85">Farm-to-consumer losses</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">46% <span className="text-white/60">→</span> 23%</p>
                    <p className="mt-1 text-xs text-white/85">Project target: losses cut by half</p>
                </article>
                <article className="rounded-2xl bg-gradient-to-br from-[#27965a] to-[#208454] p-5 text-white sm:p-6">
                    <p className="text-xs font-medium text-white/85">Reaching consumers, per 100 kg harvested</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">54 kg <span className="text-white/60">→</span> 77 kg</p>
                    <p className="mt-1 text-xs text-white/85">Project target based on an illustrative case</p>
                </article>
            </div>

            <section aria-labelledby="freshness-steps-title">
                <h3 id="freshness-steps-title" className="text-lg font-semibold">How the cold chain protects freshness</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Cooling starts soon after harvest and never breaks until delivery.</p>
                <ol className="relative mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                    {freshnessSteps.map((step, index) => {
                        const Icon = step.icon;
                        return <li key={step.title} className="relative min-h-36 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                            {index < freshnessSteps.length - 1 && <span aria-hidden="true" className="absolute -right-3 top-7 z-10 hidden h-px w-3 bg-[#27965a]/60 xl:block" />}
                            <span aria-hidden="true" className="absolute right-3 top-1 text-3xl font-semibold text-[#27965a]/[0.08]">0{index + 1}</span>
                            <span className="mb-3 grid size-9 place-items-center rounded-xl bg-[#27965a]/10 text-[#27965a] dark:bg-[#27965a]/20 dark:text-[#8de0ae]"><Icon size={18} /></span>
                            <h4 className="text-sm font-semibold">{step.title}</h4>
                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{step.detail}</p>
                        </li>;
                    })}
                </ol>
            </section>

            <section aria-labelledby="crop-storage-title">
                <h3 id="crop-storage-title" className="text-lg font-semibold">Recommended storage by crop</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Each crop has its own best temperature and humidity.</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {crops.map((crop) => <li key={crop.name} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                        <h4 className="text-sm font-semibold">{crop.name}</h4>
                        <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
                            <div><dt className="text-slate-500 dark:text-slate-400">Temperature</dt><dd className="mt-0.5 font-semibold text-[#267A47] dark:text-[#75D59A]">{crop.min}</dd></div>
                            <div><dt className="text-slate-500 dark:text-slate-400">Humidity</dt><dd className="mt-0.5 font-semibold text-[#267A47] dark:text-[#75D59A]">{crop.humidity}</dd></div>
                        </dl>
                        <p className="mt-3 border-t border-slate-100 pt-2 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">{crop.note}</p>
                    </li>)}
                </ul>
                <p className="mt-3 text-[11px] leading-5 text-slate-500 dark:text-slate-400">Ranges are general guidance from the University of California, Davis Postharvest Technology Center and extension publications. *Varies by cultivar and ripeness; confirm with BEDEBO’s agronomists before publishing.</p>
            </section>
        </div>
    );
}

function CrateQr() {
    return <QRCodeSVG value="BEDEBO-BATCH:BD-ETH-2026-004218|FARMER:BF-2048|CROP:TOMATO" size={144} marginSize={4} level="M" title="Crate trace QR code" className="size-36 max-w-full rounded-lg bg-white p-2" />;
}

function QualityTrace() {
    const [traceStep, setTraceStep] = useState(-1);
    const [traceRunning, setTraceRunning] = useState(true);

    useEffect(() => {
        if (!traceRunning) return undefined;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTraceStep(qualitySteps.length - 1);
            setTraceRunning(false);
            return undefined;
        }
        if (traceStep >= qualitySteps.length - 1) {
            setTraceRunning(false);
            return undefined;
        }
        const timer = window.setTimeout(() => setTraceStep((current) => current + 1), 1200);
        return () => window.clearTimeout(timer);
    }, [traceRunning, traceStep]);
    const completedChecks = protectionChecks.filter(({ step }) => traceStep >= step).length;

    return (
        <article className="w-full overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-[#3DB268] bg-white p-5 shadow-sm dark:border-slate-800 dark:border-t-[#3DB268] dark:bg-slate-900 sm:p-7">
            <div className="grid gap-7 lg:grid-cols-[270px_minmax(0,1fr)]">
                <div>
                    <div className="relative flex flex-col items-center rounded-2xl border-[1.5px] border-dashed border-[#3DB268]/50 bg-[#3DB268]/[0.04] p-4 dark:border-[#3DB268]/40 dark:bg-[#27965a]/10">
                        <div className="relative overflow-hidden rounded-lg p-2">
                            <CrateQr />
                            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-2 top-0 h-0.5 bg-[#3DB268] shadow-[0_0_12px_3px_rgba(61,178,104,0.45)] ${traceRunning ? "qr-scan-line" : "opacity-0"}`} />
                        </div>
                        <p aria-live="polite" className="mt-3 text-center text-sm font-medium text-slate-600 dark:text-slate-300">{traceRunning ? "Auto-scanning crate ID BD-ETH-2026-004218" : "Crate ID BD-ETH-2026-004218 scanned"}</p>
                    </div>
                    <div className="mt-7">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-lg font-semibold">Quality checks</h3>
                            <span className="rounded-full bg-[#27965a]/10 px-3 py-1.5 text-xs font-semibold text-[#267A47] dark:bg-[#27965a]/20 dark:text-[#8de0ae]">{completedChecks} of 5 passed</span>
                        </div>
                        <ul className="mt-4 space-y-3" aria-live="polite">
                            {protectionChecks.map(({ title, step }) => {
                                const passed = traceStep >= step;
                                return <li key={title} className="flex items-center gap-3"><span className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${passed ? "bg-[#27965a] text-white" : "bg-[#27965a]/10 text-transparent dark:bg-[#27965a]/20"}`}><Check size={14} /></span><span className={`text-sm leading-5 ${passed ? "text-slate-800 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>{title}</span></li>;
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
                                {index < qualitySteps.length - 1 && <span aria-hidden="true" className={`absolute left-3 top-7 h-[calc(100%-8px)] w-px ${index < traceStep ? "bg-[#3DB268]" : "bg-slate-200 dark:bg-slate-700"}`} />}
                                <span className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${passed ? "bg-[#27965a] text-white" : "bg-[#27965a]/10 text-transparent dark:bg-[#27965a]/20"}`}><Check size={14} /></span>
                                <div className={`min-w-0 flex-1 rounded-xl px-3 py-2 transition-colors ${passed ? "bg-[#3DB268]/10 dark:bg-[#27965a]/20" : "bg-slate-50 dark:bg-slate-800/50"}`}>
                                    <h4 className={`text-sm font-semibold ${passed ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>{title}</h4>
                                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{text}</p>
                                </div>
                            </li>;
                        })}
                        <li className={`flex gap-3 rounded-xl bg-[#3DB268]/10 p-3 transition-opacity dark:bg-[#27965a]/20 ${traceStep >= qualitySteps.length - 1 ? "opacity-100" : "opacity-0"}`}>
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#27965a] text-white"><Check size={14} /></span>
                            <p className="text-xs font-medium leading-5 text-[#267A47] dark:text-[#8de0ae]">Traced end to end: from the vendor shipment back to the individual farmer&apos;s harvest.</p>
                        </li>
                    </ol>
                </div>
            </div>
        </article>
    );
}

function ExecutiveSummary() {
    const summaryRef = useRef(null);
    const [brandPhrase, setBrandPhrase] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "100px" });
        if (summaryRef.current) observer.observe(summaryRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
        const timer = window.setInterval(() => setBrandPhrase((current) => (current + 1) % phraseParts.length), 5000);
        return () => window.clearInterval(timer);
    }, [isVisible]);

    return (
        <article ref={summaryRef} className="flex min-h-[220px] flex-col rounded-[20px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400"><FileText size={21} aria-hidden="true" /></span>
            <h3 className="text-lg font-semibold">Executive Summary</h3>
            <div className="mt-2 rounded-r-xl border-l-4 px-4 py-1.5 transition-colors duration-500" role="group" aria-label="Freshness Protected. Quality Assured. Markets Connected. Value Shared." style={{ borderLeftColor: phraseColors[brandPhrase], backgroundColor: `${phraseColors[brandPhrase]}14` }}>
                {phraseParts.map((phrase, index) => <button key={phrase} type="button" aria-pressed={brandPhrase === index} onClick={() => setBrandPhrase(index)} className={`block text-left text-[13px] font-semibold leading-5 transition-opacity duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] ${brandPhrase === index ? "opacity-100" : "opacity-45"}`} style={{ color: phraseColors[index] }}>{phrase}</button>)}
            </div>
            <p className="mt-2 text-[13px] leading-5 text-slate-600 dark:text-slate-300">BEDEBO Ethiopia Share Company builds a digitally integrated, market-driven horticulture value chain connecting farmers, Agricultural Service Providers (ASPs), logistics and cold-chain operators, market partners, and end customers.</p>
        </article>
    );
}

export default function CoreValues() {
    const [activeTab, setActiveTab] = useState(0);
    const [slidePosition, setSlidePosition] = useState(1);
    const [carouselTransition, setCarouselTransition] = useState(true);
    const [cardHeight, setCardHeight] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isCarouselFocused, setIsCarouselFocused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(true);
    const [isCarouselVisible, setIsCarouselVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [tabPill, setTabPill] = useState({ left: 5, width: 0 });
    const carouselRef = useRef(null);
    const scrollTimer = useRef(null);
    const scrollingRef = useRef(false);
    const touchStart = useRef(null);
    const activeCardRef = useRef(null);
    const tabRefs = useRef([]);
    const tabColor = "#267A47";
    const activeValue = (slidePosition - 1 + values.length) % values.length;
    const selectTab = (index) => setActiveTab((index + tabItems.length) % tabItems.length);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsCarouselVisible(entry.isIntersecting), { rootMargin: "100px" });
        if (carouselRef.current) observer.observe(carouselRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollingRef.current) {
                scrollingRef.current = true;
                setIsScrolling(true);
            }
            window.clearTimeout(scrollTimer.current);
            scrollTimer.current = window.setTimeout(() => {
                scrollingRef.current = false;
                setIsScrolling(false);
            }, 140);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.clearTimeout(scrollTimer.current);
        };
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateMotionPreference = () => setReducedMotion(media.matches);
        updateMotionPreference();
        media.addEventListener("change", updateMotionPreference);
        return () => media.removeEventListener("change", updateMotionPreference);
    }, []);

    useEffect(() => {
        const updatePill = () => {
            const tab = tabRefs.current[activeTab];
            if (tab) setTabPill({ left: tab.offsetLeft, width: tab.offsetWidth });
        };
        updatePill();
        window.addEventListener("resize", updatePill);
        return () => window.removeEventListener("resize", updatePill);
    }, [activeTab]);

    useEffect(() => {
        const card = activeCardRef.current;
        if (!card) return undefined;
        const updateHeight = () => setCardHeight(card.getBoundingClientRect().height);
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(card);
        return () => observer.disconnect();
    }, [slidePosition]);

    const moveValue = (direction) => setSlidePosition((current) => {
        const next = current + direction;
        if (reducedMotion) {
            if (next <= 0) return values.length;
            if (next >= values.length + 1) return 1;
        }
        return Math.max(0, Math.min(next, values.length + 1));
    });

    const handleTrackTransitionEnd = (event) => {
        if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
        if (slidePosition === 0) {
            setCarouselTransition(false);
            setSlidePosition(values.length);
            requestAnimationFrame(() => requestAnimationFrame(() => setCarouselTransition(true)));
        }
        if (slidePosition === values.length + 1) {
            setCarouselTransition(false);
            setSlidePosition(1);
            requestAnimationFrame(() => requestAnimationFrame(() => setCarouselTransition(true)));
        }
    };

    const handleValueProgressEnd = (event) => {
        if (event.target.classList.contains("core-value-progress") && isCarouselVisible && !isScrolling && !reducedMotion && !isHovered && !isCarouselFocused) moveValue(1);
    };

    const handleCarouselKeyDown = (event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            moveValue(1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveValue(-1);
        }
    };

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
    const handleValueTouchEnd = (event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 45) moveValue(delta < 0 ? 1 : -1);
        touchStart.current = null;
    };

    return (
        <section id="core-values" aria-labelledby="core-values-title" className="bedebo-site-container scroll-mt-24 pb-20">
            <SectionTitle label="CORE VALUES" title="Our Core" highlight="Values" headingId="core-values-title" />
            <div className="mt-7 w-full">
                <div className="grid items-stretch gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                    <article className="relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-[#23a062] to-[#17613f] p-5 text-white sm:p-6">
                        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full border border-white/20" />
                        <span aria-hidden="true" className="pointer-events-none absolute -right-7 -top-7 size-32 rounded-full border border-white/20" />
                        <span className="relative mb-3 flex size-10 items-center justify-center rounded-xl bg-white/15"><Target size={21} aria-hidden="true" /></span>
                        <h3 className="relative text-lg font-semibold">Objective</h3>
                        <p className="relative mt-2 text-sm leading-6 text-white/95">To build a <strong className="border-b-2 border-white/40">digitally integrated</strong>, <strong className="border-b-2 border-white/40">quality-driven</strong> and <strong className="border-b-2 border-white/40">market-connected</strong> horticulture supply system that delivers the right product, at the right quality, to the right customer, at the right time and at a fair and transparent price.</p>
                    </article>
                    <ExecutiveSummary />
                </div>
            </div>

            <div className="mt-6 w-full">
                <div className="mb-4 text-center">
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Six values that guide us</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Hover to pause. Use the dots to move back and forth.</p>
                </div>
                <div ref={carouselRef} className={`core-values-carousel ${isCarouselVisible && !isScrolling ? "is-in-view" : ""}`} role="region" aria-roledescription="carousel" aria-label="BEDEBO core values" tabIndex={0} onAnimationEnd={handleValueProgressEnd} onKeyDown={handleCarouselKeyDown} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onFocus={() => setIsCarouselFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsCarouselFocused(false); }} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleValueTouchEnd}>
                    <div className="core-values-viewport overflow-hidden rounded-[26px] transition-[height] duration-500 motion-reduce:transition-none" style={{ height: cardHeight ? `${cardHeight}px` : undefined }}>
                        <div className="core-values-track flex items-start" onTransitionEnd={handleTrackTransitionEnd} style={{ transform: `translateX(-${slidePosition * 100}%)`, transitionDuration: reducedMotion || !carouselTransition ? "0ms" : "700ms" }}>
                            {[{ item: values[values.length - 1], index: values.length - 1, clone: "last" }, ...values.map((item, index) => ({ item, index, clone: null })), { item: values[0], index: 0, clone: "first" }].map(({ item, index, clone }, position) => {
                                const selected = position === slidePosition;
                                return <div key={clone ?? item.title} className="basis-full shrink-0 px-1" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${values.length}`} aria-hidden={!selected}>
                                    <article ref={selected ? activeCardRef : null} className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm after:pointer-events-none after:absolute after:-bottom-16 after:-right-16 after:size-52 after:rounded-full after:bg-[var(--value-soft)] dark:border-slate-800 dark:bg-slate-900 sm:p-6" style={{ borderTop: `5px solid ${item.color}`, "--value-color": item.color, "--value-soft": `${item.color}1a` }}>
                                        <div className="relative z-10">
                                            <div>
                                                <div className="mb-3 flex items-center gap-3">
                                                    <span className="flex size-11 items-center justify-center rounded-xl text-base font-semibold text-white" style={{ backgroundColor: item.color }}>{index + 1}</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">Core value {index + 1} of 6</span>
                                                </div>
                                                <h4 className="text-xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-2xl">{item.title}</h4>
                                                <blockquote className="mt-2 text-base font-medium italic leading-6" style={{ color: item.color }}>“{item.quote}”</blockquote>
                                                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{item.detail}</p>
                                                {item.metrics && <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-700 dark:text-slate-200"><span className="min-w-36 rounded-xl px-4 py-2.5" style={{ backgroundColor: `${item.color}1a` }}><strong className="block text-lg" style={{ color: item.color }}>46% → 23%</strong><span className="text-slate-500 dark:text-slate-400">farm-to-consumer losses</span></span><span className="min-w-36 rounded-xl px-4 py-2.5" style={{ backgroundColor: `${item.color}1a` }}><strong className="block text-lg" style={{ color: item.color }}>54 kg → 77 kg</strong><span className="text-slate-500 dark:text-slate-400">reaching consumers per 100 kg</span></span><span className="basis-full text-[11px] text-slate-500 dark:text-slate-400">Project target based on an illustrative case.</span></div>}
                                            </div>
                                        </div>
                                    </article>
                                </div>;
                            })}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label="Choose a core value">
                        {values.map((item, index) => <button key={item.title} type="button" aria-label={`Show core value ${index + 1}: ${item.title}`} aria-current={activeValue === index ? "true" : undefined} onClick={() => setSlidePosition(index + 1)} className={`core-value-dot relative size-2.5 overflow-hidden rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] ${activeValue === index ? "w-11" : "bg-slate-300 dark:bg-slate-700"}`} style={activeValue === index ? { backgroundColor: `${item.color}33` } : undefined}><span className="sr-only">{item.title}</span>{activeValue === index && <span className="core-value-progress absolute inset-0 origin-left" style={{ backgroundColor: item.color }} />}</button>)}
                    </div>
                </div>
            </div>

            <div className="mt-14 w-full md:mt-16">
                <div role="tablist" aria-label="Core value chain layers" aria-orientation="horizontal" className="relative mb-6 flex w-full gap-1 overflow-x-auto rounded-[18px] border border-slate-200 bg-white p-[5px] dark:border-slate-800 dark:bg-slate-900" onKeyDown={handleTabKeyDown}>
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-[5px] top-[5px] z-0 rounded-[14px] transition-[left,width,background-color] duration-300" style={{ left: tabPill.left, width: tabPill.width, backgroundColor: tabColor }} />
                    {tabItems.map((item, index) => {
                        const Icon = tabIcons[index];
                        return <button key={item.label} ref={(node) => { tabRefs.current[index] = node; }} id={`core-tab-${index}`} type="button" role="tab" aria-label={item.label} aria-selected={activeTab === index} aria-controls={`core-panel-${index}`} tabIndex={activeTab === index ? 0 : -1} onClick={() => selectTab(index)} className={`relative z-10 flex min-w-max flex-1 items-center justify-center gap-2 rounded-[14px] px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] ${activeTab === index ? "text-white" : "text-slate-600 dark:text-slate-300"}`}><Icon size={18} aria-hidden="true" /><span className="hidden sm:inline">{item.label}</span></button>;
                    })}
                </div>
                <div id={`core-panel-${activeTab}`} role="tabpanel" aria-labelledby={`core-tab-${activeTab}`} tabIndex={0} className={`min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#27965a] ${activeTab === 2 ? "rounded-2xl bg-[#f4faf6] p-3 sm:p-5 dark:bg-slate-950/40" : ""}`}>
                    <IntroCard item={tabItems[activeTab]} />
                    {activeTab === 0 && <Traceability />}
                    {activeTab === 1 && <DigitalIntegration />}
                    {activeTab === 2 && <FreshnessTab />}
                    {activeTab === 3 && <QualityTrace />}
                </div>
            </div>

            <div className="mt-10 flex w-full items-center justify-center rounded-2xl bg-[#27965a] px-5 py-4 text-center text-sm font-semibold leading-5 text-white sm:px-8 sm:py-5 sm:text-base">Coordinating the journey from production to market</div>
        </section>
    );
}

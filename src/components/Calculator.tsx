"use client";

import { useState, useMemo, useEffect } from "react";

const COUNTRIES = [
    { code: "IN", name: "India", currencyCode: "INR", locale: "en-IN", defaultSalary: 800000 },
    { code: "US", name: "United States", currencyCode: "USD", locale: "en-US", defaultSalary: 50000 },
    { code: "GB", name: "United Kingdom", currencyCode: "GBP", locale: "en-GB", defaultSalary: 40000 },
    { code: "AE", name: "United Arab Emirates", currencyCode: "AED", locale: "en-AE", defaultSalary: 180000 },
    { code: "SG", name: "Singapore", currencyCode: "SGD", locale: "en-SG", defaultSalary: 65000 },
    { code: "AU", name: "Australia", currencyCode: "AUD", locale: "en-AU", defaultSalary: 75000 },
    { code: "DE", name: "Germany", currencyCode: "EUR", locale: "de-DE", defaultSalary: 45000 },
    { code: "FR", name: "France", currencyCode: "EUR", locale: "fr-FR", defaultSalary: 45000 },
    { code: "CA", name: "Canada", currencyCode: "CAD", locale: "en-CA", defaultSalary: 55000 },
    { code: "NL", name: "Netherlands", currencyCode: "EUR", locale: "nl-NL", defaultSalary: 48000 },
    { code: "OTHER", name: "Other", currencyCode: "USD", locale: "en-US", defaultSalary: 50000 },
];

const industries = [
    "Manufacturing",
    "Retail / D2C",
    "Distribution",
    "SaaS / Tech",
    "Professional Services",
    "Healthcare",
    "Real Estate",
    "Other",
];

const automationTasks = [
    { name: "Data Entry & Processing", rate: 0.85 },
    { name: "Reporting & Analytics", rate: 0.75 },
    { name: "Customer Support", rate: 0.65 },
    { name: "Inventory Management", rate: 0.6 },
    { name: "Scheduling & Coordination", rate: 0.55 },
    { name: "Content & Document Creation", rate: 0.5 },
    { name: "Invoicing & Billing", rate: 0.7 },
    { name: "Quality Checks & Compliance", rate: 0.45 },
];

const DEFAULT_CURRENCY = { code: "USD", locale: "en-US", defaultSalary: 50000 };

export default function Calculator() {
    const [step, setStep] = useState(1);
    const [country, setCountry] = useState("");
    const [industry, setIndustry] = useState("");
    const [teamSize, setTeamSize] = useState(5);
    const [avgSalary, setAvgSalary] = useState(50000);
    const [manualHours, setManualHours] = useState(10);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

    // Show default cursor on calculator (site uses custom cursor elsewhere)
    useEffect(() => {
        const prev = document.body.style.cursor;
        document.body.style.cursor = "auto";
        return () => {
            document.body.style.cursor = prev;
        };
    }, []);

    const currency = useMemo(() => {
        if (!country) return DEFAULT_CURRENCY;
        const c = COUNTRIES.find((x) => x.code === country);
        return c
            ? { code: c.currencyCode, locale: c.locale, defaultSalary: c.defaultSalary }
            : DEFAULT_CURRENCY;
    }, [country]);

    const formatCurrency = useMemo(
        () =>
            new Intl.NumberFormat(currency.locale, {
                style: "currency",
                currency: currency.code,
                maximumFractionDigits: 0,
            }),
        [currency.locale, currency.code]
    );

    const currencyLabel = useMemo(() => {
        const parts = formatCurrency.formatToParts(0);
        return parts.find((p) => p.type === "currency")?.value ?? currency.code;
    }, [formatCurrency, currency.code]);

    const selectCountry = (code: string) => {
        setCountry(code);
        const c = COUNTRIES.find((x) => x.code === code);
        if (c) setAvgSalary(c.defaultSalary);
    };

    const toggleTask = (taskName: string) => {
        setSelectedTasks((prev) =>
            prev.includes(taskName)
                ? prev.filter((t) => t !== taskName)
                : [...prev, taskName]
        );
    };

    const results = useMemo(() => {
        const hourlyCost = avgSalary / 2080; // 52 weeks × 40 hrs
        const weeklyManualHoursTotal = manualHours * teamSize;
        const annualManualHours = weeklyManualHoursTotal * 52;

        const avgAutomationRate =
            selectedTasks.length > 0
                ? selectedTasks.reduce((sum, taskName) => {
                    const task = automationTasks.find((t) => t.name === taskName);
                    return sum + (task?.rate || 0);
                }, 0) / selectedTasks.length
                : 0.6;

        const hoursSaved = Math.round(annualManualHours * avgAutomationRate);
        const dollarsSaved = Math.round(hoursSaved * hourlyCost);
        const automationPercent = Math.round(avgAutomationRate * 100);

        return {
            hoursSaved,
            dollarsSaved,
            automationPercent,
            monthlyHoursSaved: Math.round(hoursSaved / 12),
            monthlyDollarsSaved: Math.round(dollarsSaved / 12),
        };
    }, [teamSize, avgSalary, manualHours, selectedTasks]);

    const canProceed = () => {
        if (step === 1) return country !== "";
        if (step === 2) return industry !== "";
        if (step === 5) return selectedTasks.length > 0;
        return true;
    };

    const countryName = country
        ? (COUNTRIES.find((c) => c.code === country)?.name ?? "")
        : "";

    const mailtoLink = `mailto:info@garihc.com?subject=Free AI Audit Request&body=Hi GARIHC,%0A%0AI'd like a free AI audit for my business.%0A%0ACountry: ${encodeURIComponent(countryName)}%0AIndustry: ${encodeURIComponent(industry)}%0ATeam size: ${teamSize}%0AEstimated annual savings: ${encodeURIComponent(formatCurrency.format(results.dollarsSaved))}%0AEstimated hours saved: ${results.hoursSaved.toLocaleString()}%0A%0ALooking forward to hearing from you.`;

    const stepLabel = ["Country", "Industry", "Team Size", "Manual Hours", "Tasks", "Results"];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0A0A0A",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "80px 1.5rem 120px",
            }}
        >
            <div style={{ maxWidth: 680, width: "100%" }}>
                {/* Header */}
                <p
                    style={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.3em",
                        fontSize: "0.65rem",
                        color: "#BFA67A",
                        fontWeight: 400,
                        marginBottom: "1rem",
                        textAlign: "center",
                    }}
                >
                    AI SAVINGS CALCULATOR
                </p>
                <h1
                    style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 400,
                        color: "#F5F5F0",
                        margin: "0 0 3rem 0",
                        textAlign: "center",
                        lineHeight: 1.2,
                    }}
                >
                    See how much AI can save
                    <br />
                    <span style={{ color: "var(--text-secondary)" }}>your business.</span>
                </h1>

                {/* Progress bar */}
                <div
                    style={{
                        display: "flex",
                        gap: 6,
                        marginBottom: "3rem",
                    }}
                >
                    {[1, 2, 3, 4, 5, 6].map((s) => (
                        <div
                            key={s}
                            style={{
                                flex: 1,
                                height: 4,
                                borderRadius: 2,
                                background:
                                    s < step
                                        ? "#2A2A2A"
                                        : s === step
                                            ? "#BFA67A"
                                            : "rgba(255,255,255,0.06)",
                                transition: "background 0.4s ease",
                            }}
                        />
                    ))}
                </div>

                {/* Step label */}
                <p
                    style={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "var(--text-muted)",
                        marginBottom: "0.5rem",
                    }}
                >
                    Step {step} of 6 - {stepLabel[step - 1]}
                </p>

                {/* Step 1: Country */}
                {step === 1 && (
                    <div>
                        <h2
                            style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "1.6rem",
                                fontWeight: 400,
                                color: "#F5F5F0",
                                margin: "0 0 2rem 0",
                            }}
                        >
                            Where is your business based?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.85rem",
                                fontWeight: 300,
                                color: "var(--text-muted)",
                                margin: "0 0 1.5rem 0",
                            }}
                        >
                            We&apos;ll show your savings in your local currency.
                        </p>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                gap: 12,
                            }}
                        >
                            {COUNTRIES.map((c) => (
                                <button
                                    key={c.code}
                                    onClick={() => selectCountry(c.code)}
                                    style={{
                                        fontFamily: "var(--font-outfit), sans-serif",
                                        fontSize: "0.85rem",
                                        fontWeight: 300,
                                        padding: "16px 20px",
                                        borderRadius: 12,
                                        border:
                                            country === c.code
                                                ? "1px solid var(--accent-warm)"
                                                : "1px solid rgba(255,255,255,0.06)",
                                        background:
                                            country === c.code
                                                ? "rgba(196,102,58,0.1)"
                                                : "rgba(255,255,255,0.03)",
                                        color: country === c.code ? "#F5F5F0" : "var(--text-secondary)",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {c.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Industry */}
                {step === 2 && (
                    <div>
                        <h2
                            style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "1.6rem",
                                fontWeight: 400,
                                color: "#F5F5F0",
                                margin: "0 0 2rem 0",
                            }}
                        >
                            What industry are you in?
                        </h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                                gap: 12,
                            }}
                        >
                            {industries.map((ind) => (
                                <button
                                    key={ind}
                                    onClick={() => setIndustry(ind)}
                                    style={{
                                        fontFamily: "var(--font-outfit), sans-serif",
                                        fontSize: "0.85rem",
                                        fontWeight: 300,
                                        padding: "16px 20px",
                                        borderRadius: 12,
                                        border:
                                            industry === ind
                                                ? "1px solid var(--accent-warm)"
                                                : "1px solid rgba(255,255,255,0.06)",
                                        background:
                                            industry === ind
                                                ? "rgba(196,102,58,0.1)"
                                                : "rgba(255,255,255,0.03)",
                                        color: industry === ind ? "#F5F5F0" : "var(--text-secondary)",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {ind}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Team size */}
                {step === 3 && (
                    <div>
                        <h2
                            style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "1.6rem",
                                fontWeight: 400,
                                color: "#F5F5F0",
                                margin: "0 0 2rem 0",
                            }}
                        >
                            How large is your team?
                        </h2>
                        <div style={{ marginBottom: "2rem" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--font-outfit), sans-serif",
                                        fontSize: "0.85rem",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    Team members
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-cormorant), serif",
                                        fontSize: "2.5rem",
                                        fontWeight: 300,
                                        color: "#BFA67A",
                                    }}
                                >
                                    {teamSize}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={1}
                                max={100}
                                value={teamSize}
                                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                                style={{
                                    width: "100%",
                                    accentColor: "#C4663A",
                                    height: 4,
                                }}
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    fontFamily: "var(--font-outfit), sans-serif",
                                    fontSize: "0.85rem",
                                    color: "var(--text-secondary)",
                                    display: "block",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                Average annual salary per person ({currencyLabel})
                            </label>
                            <input
                                type="number"
                                value={avgSalary}
                                onChange={(e) => setAvgSalary(parseInt(e.target.value) || 0)}
                                style={{
                                    width: "100%",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: 12,
                                    padding: "14px 18px",
                                    fontFamily: "var(--font-outfit), sans-serif",
                                    fontSize: "1rem",
                                    color: "#F5F5F0",
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Step 4: Manual hours */}
                {step === 4 && (
                    <div>
                        <h2
                            style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "1.6rem",
                                fontWeight: 400,
                                color: "#F5F5F0",
                                margin: "0 0 2rem 0",
                            }}
                        >
                            How many hours per week does each person spend on manual tasks?
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                marginBottom: "0.75rem",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "var(--font-outfit), sans-serif",
                                    fontSize: "0.85rem",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                Hours per person per week
                            </span>
                            <span
                                style={{
                                    fontFamily: "var(--font-cormorant), serif",
                                    fontSize: "2.5rem",
                                    fontWeight: 300,
                                    color: "#BFA67A",
                                }}
                            >
                                {manualHours}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={40}
                            value={manualHours}
                            onChange={(e) => setManualHours(parseInt(e.target.value))}
                            style={{
                                width: "100%",
                                accentColor: "#C4663A",
                                height: 4,
                            }}
                        />
                        <p
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.85rem",
                                fontWeight: 300,
                                color: "var(--text-muted)",
                                marginTop: "1rem",
                            }}
                        >
                            Team total:{" "}
                            <span style={{ color: "#BFA67A" }}>
                                {manualHours * teamSize} hrs/week
                            </span>
                        </p>
                    </div>
                )}

                {/* Step 5: Tasks */}
                {step === 5 && (
                    <div>
                        <h2
                            style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "1.6rem",
                                fontWeight: 400,
                                color: "#F5F5F0",
                                margin: "0 0 0.5rem 0",
                            }}
                        >
                            Which tasks do you want to automate?
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.85rem",
                                fontWeight: 300,
                                color: "var(--text-muted)",
                                margin: "0 0 2rem 0",
                            }}
                        >
                            Select all that apply.
                        </p>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                gap: 10,
                            }}
                        >
                            {automationTasks.map((task) => {
                                const isSelected = selectedTasks.includes(task.name);
                                return (
                                    <button
                                        key={task.name}
                                        onClick={() => toggleTask(task.name)}
                                        style={{
                                            fontFamily: "var(--font-outfit), sans-serif",
                                            fontSize: "0.8rem",
                                            fontWeight: 300,
                                            padding: "14px 16px",
                                            borderRadius: 12,
                                            border: isSelected
                                                ? "1px solid var(--accent-warm)"
                                                : "1px solid rgba(255,255,255,0.06)",
                                            background: isSelected
                                                ? "rgba(196,102,58,0.1)"
                                                : "rgba(255,255,255,0.03)",
                                            color: isSelected ? "#F5F5F0" : "var(--text-secondary)",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        <span style={{ display: "flex", justifyContent: "space-between" }}>
                                            {task.name}
                                            <span
                                                style={{
                                                    fontSize: "0.7rem",
                                                    color: isSelected ? "#BFA67A" : "var(--text-muted)",
                                                }}
                                            >
                                                {Math.round(task.rate * 100)}%
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 6: Results */}
                {step === 6 && (
                    <div>
                        <h2
                            style={{
                                fontFamily: "var(--font-cormorant), serif",
                                fontSize: "1.6rem",
                                fontWeight: 400,
                                color: "#F5F5F0",
                                margin: "0 0 2.5rem 0",
                            }}
                        >
                            Your estimated AI savings
                        </h2>

                        {/* Big numbers */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                                gap: 20,
                                marginBottom: "3rem",
                            }}
                        >
                            {[
                                {
                                    label: "Annual Savings",
                                    value: formatCurrency.format(results.dollarsSaved),
                                },
                                {
                                    label: "Hours Saved / Year",
                                    value: results.hoursSaved.toLocaleString(),
                                },
                                {
                                    label: "Automation Rate",
                                    value: `${results.automationPercent}%`,
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        borderRadius: 16,
                                        padding: "24px",
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "var(--font-cormorant), serif",
                                            fontSize: "2.5rem",
                                            fontWeight: 300,
                                            color: "#BFA67A",
                                            lineHeight: 1,
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "var(--font-outfit), sans-serif",
                                            fontSize: "0.65rem",
                                            fontWeight: 400,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.15em",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Monthly breakdown */}
                        <div
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: 16,
                                padding: "24px",
                                marginBottom: "3rem",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "var(--font-outfit), sans-serif",
                                    fontSize: "0.7rem",
                                    fontWeight: 400,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.15em",
                                    color: "var(--text-muted)",
                                    margin: "0 0 1rem 0",
                                }}
                            >
                                Monthly Breakdown
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    gap: "1rem",
                                }}
                            >
                                <div>
                                    <span
                                        style={{
                                            fontFamily: "var(--font-outfit), sans-serif",
                                            fontSize: "0.85rem",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Money saved:
                                    </span>{" "}
                                    <span
                                        style={{
                                            fontFamily: "var(--font-cormorant), serif",
                                            fontSize: "1.4rem",
                                            color: "#BFA67A",
                                        }}
                                    >
                                        {formatCurrency.format(results.monthlyDollarsSaved)}/mo
                                    </span>
                                </div>
                                <div>
                                    <span
                                        style={{
                                            fontFamily: "var(--font-outfit), sans-serif",
                                            fontSize: "0.85rem",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Hours saved:
                                    </span>{" "}
                                    <span
                                        style={{
                                            fontFamily: "var(--font-cormorant), serif",
                                            fontSize: "1.4rem",
                                            color: "#BFA67A",
                                        }}
                                    >
                                        {results.monthlyHoursSaved.toLocaleString()}/mo
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{ textAlign: "center" }}>
                            <a
                                href={mailtoLink}
                                className="btn-accent"
                                style={{ padding: "18px 44px" }}
                                onMouseEnter={(e) => {
                                    const t = e.currentTarget;
                                    t.style.background = "transparent";
                                    t.style.color = "var(--accent-warm)";
                                    t.style.boxShadow = "0 0 30px rgba(196,102,58,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    const t = e.currentTarget;
                                    t.style.background = "var(--accent-warm)";
                                    t.style.color = "#FFFFFF";
                                    t.style.boxShadow = "none";
                                }}
                            >
                                Get a Free AI Audit
                            </a>
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                {step < 6 && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "3rem",
                            gap: "1rem",
                        }}
                    >
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                style={{
                                    fontFamily: "var(--font-outfit), sans-serif",
                                    fontSize: "0.7rem",
                                    fontWeight: 400,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.15em",
                                    padding: "14px 32px",
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 4,
                                    color: "var(--text-secondary)",
                                    cursor: "pointer",
                                    transition: "all 0.3s",
                                }}
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={() => canProceed() && setStep(step + 1)}
                            disabled={!canProceed()}
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.7rem",
                                fontWeight: 400,
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                padding: "14px 32px",
                                background: canProceed()
                                    ? "var(--accent-warm)"
                                    : "rgba(255,255,255,0.03)",
                                border: canProceed()
                                    ? "1px solid var(--accent-warm)"
                                    : "1px solid rgba(255,255,255,0.06)",
                                borderRadius: 4,
                                color: canProceed() ? "#FFFFFF" : "var(--text-muted)",
                                cursor: canProceed() ? "pointer" : "default",
                                marginLeft: "auto",
                                transition: "all 0.3s",
                            }}
                        >
                            {step === 5 ? "See My Savings" : "Next"}
                        </button>
                    </div>
                )}

                {step === 6 && (
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <button
                            onClick={() => {
                                setStep(1);
                                setCountry("");
                                setIndustry("");
                                setTeamSize(5);
                                setAvgSalary(50000);
                                setManualHours(10);
                                setSelectedTasks([]);
                            }}
                            style={{
                                fontFamily: "var(--font-outfit), sans-serif",
                                fontSize: "0.7rem",
                                fontWeight: 400,
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                padding: "14px 32px",
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 4,
                                color: "var(--text-secondary)",
                                cursor: "pointer",
                                transition: "all 0.3s",
                            }}
                        >
                            Start Over
                        </button>
                    </div>
                )}

                {/* Back to home link */}
                <div style={{ textAlign: "center", marginTop: "4rem" }}>
                    <a
                        href="/"
                        style={{
                            fontFamily: "var(--font-outfit), sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            color: "var(--text-muted)",
                            textDecoration: "none",
                            transition: "color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#BFA67A";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-muted)";
                        }}
                    >
                        ← Back to GARIHC
                    </a>
                </div>
            </div>
        </div>
    );
}

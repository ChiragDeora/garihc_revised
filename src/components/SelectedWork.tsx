"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useInView } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  getProjectIndexFromPath,
  projects,
} from "@/lib/work/projects";

const VIRTUAL_VIEWPORT_WIDTH = 1440;

function getInitialProjectIndex(): number {
  if (typeof window === "undefined") return 0;
  return getProjectIndexFromPath(window.location.pathname) ?? 0;
}

export default function SelectedWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const router = useRouter();
  const pathname = usePathname();
  const initialProjectIndex = getInitialProjectIndex();

  const [openTabs, setOpenTabs] = useState([0, 1, 2, 3]);
  const [activeTab, setActiveTab] = useState(initialProjectIndex);
  const [history, setHistory] = useState([initialProjectIndex]);
  const [histPos, setHistPos] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [closedTabs, setClosedTabs] = useState<number[]>([]);
  const [urlText, setUrlText] = useState(projects[initialProjectIndex].url);

  // Drag state for tab reordering
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Render the iframe at desktop viewport width and scale down to fit the container,
  // so embedded responsive sites always show their desktop layout.
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContentSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = contentSize.width > 0 ? contentSize.width / VIRTUAL_VIEWPORT_WIDTH : 1;
  const iframeHeight = scale > 0 ? contentSize.height / scale : 0;

  const endLoad = useCallback(() => {
    clearTimeout(loadTimerRef.current);
    loadTimerRef.current = setTimeout(() => setLoading(false), 880);
  }, []);

  const syncUrlToProject = useCallback(
    (pi: number) => {
      router.replace(`/work/${projects[pi].slug}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    const pi = getProjectIndexFromPath(pathname);
    if (pi == null || pi === activeTab) return;
    setActiveTab(pi);
    setUrlText(projects[pi].url);
    setLoading(true);
    endLoad();
  }, [pathname, activeTab, endLoad]);

  const navigate = useCallback(
    (pi: number) => {
      if (pi === activeTab) {
        setReloadKey((k) => k + 1);
        setLoading(true);
        endLoad();
        return;
      }
      const newHist = history.slice(0, histPos + 1);
      newHist.push(pi);
      setActiveTab(pi);
      setHistory(newHist);
      setHistPos(newHist.length - 1);
      setUrlText(projects[pi].url);
      setLoading(true);
      syncUrlToProject(pi);
      endLoad();
    },
    [activeTab, history, histPos, endLoad, syncUrlToProject]
  );

  const goBack = useCallback(() => {
    if (histPos <= 0) return;
    const newPos = histPos - 1;
    const pi = history[newPos];
    setHistPos(newPos);
    setActiveTab(pi);
    setUrlText(projects[pi].url);
    setLoading(true);
    syncUrlToProject(pi);
    endLoad();
  }, [histPos, history, endLoad, syncUrlToProject]);

  const goForward = useCallback(() => {
    if (histPos >= history.length - 1) return;
    const newPos = histPos + 1;
    const pi = history[newPos];
    setHistPos(newPos);
    setActiveTab(pi);
    setUrlText(projects[pi].url);
    setLoading(true);
    syncUrlToProject(pi);
    endLoad();
  }, [histPos, history, endLoad, syncUrlToProject]);

  const closeTab = useCallback(
    (pi: number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (openTabs.length <= 1) return;
      const idx = openTabs.indexOf(pi);
      const nextOpen = openTabs.filter((x) => x !== pi);
      let next = activeTab;
      if (next === pi) next = nextOpen[Math.min(idx, nextOpen.length - 1)];
      setOpenTabs(nextOpen);
      setClosedTabs((prev) => [...prev, pi]);
      setActiveTab(next);
      setUrlText(projects[next].url);
      setLoading(true);
      syncUrlToProject(next);
      endLoad();
    },
    [openTabs, activeTab, endLoad, syncUrlToProject]
  );

  const newTab = useCallback(() => {
    let pi: number | undefined;
    if (closedTabs.length > 0) {
      const closed = [...closedTabs];
      pi = closed.pop()!;
      setClosedTabs(closed);
    } else {
      pi = [0, 1, 2, 3].find((x) => !openTabs.includes(x));
    }
    if (pi == null) return;
    const newHist = history.slice(0, histPos + 1);
    newHist.push(pi);
    setOpenTabs((prev) => [...prev, pi!]);
    setActiveTab(pi);
    setHistory(newHist);
    setHistPos(newHist.length - 1);
    setUrlText(projects[pi].url);
    setLoading(true);
    syncUrlToProject(pi);
    endLoad();
  }, [closedTabs, openTabs, history, histPos, endLoad, syncUrlToProject]);

  const reload = useCallback(() => {
    setReloadKey((k) => k + 1);
    setLoading(true);
    endLoad();
  }, [endLoad]);

  const handleUrlKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        (e.target as HTMLInputElement).blur();
        reload();
      }
    },
    [reload]
  );

  // Tab drag reorder handlers
  const onDragStart = useCallback((arrIdx: number) => {
    setDragIdx(arrIdx);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent, arrIdx: number) => {
    e.preventDefault();
    setDragOverIdx(arrIdx);
  }, []);

  const onDrop = useCallback(
    (arrIdx: number) => {
      if (dragIdx == null || dragIdx === arrIdx) {
        setDragIdx(null);
        setDragOverIdx(null);
        return;
      }
      const reordered = [...openTabs];
      const [moved] = reordered.splice(dragIdx, 1);
      reordered.splice(arrIdx, 0, moved);
      setOpenTabs(reordered);
      setDragIdx(null);
      setDragOverIdx(null);
    },
    [dragIdx, openTabs]
  );

  const onDragEnd = useCallback(() => {
    setDragIdx(null);
    setDragOverIdx(null);
  }, []);

  const canBack = histPos > 0;
  const canForward = histPos < history.length - 1;
  const ap = projects[activeTab];
  const hasClosedTabs = closedTabs.length > 0 || [0, 1, 2, 3].some((x) => !openTabs.includes(x));

  return (
    <section id="work" ref={ref} className="selected-work-section">
      <div className="selected-work-inner">
        <div
          className="selected-work-header"
          style={{
            opacity: isInView ? 1 : 0.3,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div>
            <p>Portfolio</p>
            <h2>Selected Work</h2>
          </div>
          <span className="sw-browse-label">Browse the work.</span>
        </div>

        <div className="sw-browser" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)" }}>
          {/* Tab strip */}
          <div className="sw-tab-strip">
            {openTabs.map((pi, arrIdx) => {
              const p = projects[pi];
              const on = pi === activeTab;
              const isDragging = dragIdx === arrIdx;
              const isDragOver = dragOverIdx === arrIdx && dragIdx !== arrIdx;
              return (
                <div
                  key={pi}
                  className={`sw-tab ${on ? "active" : ""} ${isDragOver ? "drag-over" : ""}`}
                  style={{ opacity: isDragging ? 0.4 : 1 }}
                  draggable
                  onDragStart={() => onDragStart(arrIdx)}
                  onDragOver={(e) => onDragOver(e, arrIdx)}
                  onDrop={() => onDrop(arrIdx)}
                  onDragEnd={onDragEnd}
                  onClick={() => navigate(pi)}
                >
                  {p.favicon ? (
                    <img
                      src={p.favicon}
                      alt=""
                      className="sw-tab-favicon"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span
                    className="sw-tab-fav"
                    style={{
                      background: p.favColor,
                      display: p.favicon ? "none" : "flex",
                    }}
                  >
                    {p.favInitial}
                  </span>
                  <span className="sw-tab-name">{p.name}</span>
                  <button
                    type="button"
                    className="sw-tab-close"
                    onClick={(e) => closeTab(pi, e)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
            {hasClosedTabs && (
              <button type="button" className="sw-tab-add" onClick={newTab}>
                +
              </button>
            )}
          </div>

          {/* Toolbar */}
          <div className="sw-toolbar">
            <button
              type="button"
              className={`sw-nav-btn ${canBack ? "" : "disabled"}`}
              onClick={goBack}
            >
              ‹
            </button>
            <button
              type="button"
              className={`sw-nav-btn ${canForward ? "" : "disabled"}`}
              onClick={goForward}
            >
              ›
            </button>
            <button type="button" className="sw-nav-btn" onClick={reload}>
              ⟳
            </button>
            <div className="sw-url-bar">
              <span className="sw-lock">&#128274;</span>
              <input
                value={urlText}
                onChange={(e) => setUrlText(e.target.value)}
                onKeyDown={handleUrlKey}
                className="sw-url-input"
              />
              <span className="sw-live-dot" />
            </div>
            <button type="button" className="sw-nav-btn">⋯</button>
          </div>

          {/* Loading bar */}
          <div className="sw-loadbar">
            {loading && <span className="sw-loadbar-fill" />}
          </div>

          {/* Content */}
          <div className="sw-content" ref={contentRef}>
            {ap.image && (
              <Image
                key={`img-${activeTab}-${reloadKey}`}
                src={ap.image}
                alt={ap.name}
                className="sw-poster"
                width={1440}
                height={900}
                priority={activeTab === 0}
              />
            )}
            {ap.link && (
              <iframe
                key={`if-${activeTab}-${reloadKey}`}
                src={ap.link}
                title={ap.name}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                className="sw-iframe"
                style={{
                  width: contentSize.width > 0 ? VIRTUAL_VIEWPORT_WIDTH : "100%",
                  height: contentSize.width > 0 ? iframeHeight : "100%",
                  transform: contentSize.width > 0 ? `scale(${scale})` : "none",
                  transformOrigin: "top left",
                }}
              />
            )}
          </div>
        </div>

        {/* Project info below browser */}
        <div className="sw-project-info" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)" }}>
          <div className="sw-project-meta">
            <span className="sw-project-tag">{ap.tag}</span>
            <h3 className="sw-project-name">{ap.name}</h3>
            <p className="sw-project-desc">{ap.description}</p>
          </div>
          <div className="sw-project-actions">
            {ap.link ? (
              <a href={ap.link} target="_blank" rel="noopener noreferrer" className="sw-visit-btn">
                Visit Site <span>&rarr;</span>
              </a>
            ) : (
              <span className="sw-nda-badge">Under NDA</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

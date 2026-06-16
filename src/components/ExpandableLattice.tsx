"use client";

import { useEffect, useRef } from "react";

interface LatticeProps {
  className?: string;
  style?: React.CSSProperties;
}

const GOLD = { r: 201, g: 119, b: 69 };
const GOLD2 = { r: 191, g: 166, b: 122 };
const NUM_POINTS = 330;
const HOVER_RADIUS = 180;
const HOVER_FORCE = 18;

function fibSphere(n: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = ga * i;
    pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
  }
  return pts;
}

// Chevron target positions — particles line up along two V arms
function buildChevronTargets(n: number, cx: number, cy: number) {
  const targets: { x: number; y: number }[] = [];
  const armW = 20;
  const armH = 12;
  const half = Math.floor(n / 2);

  for (let i = 0; i < n; i++) {
    if (i < half) {
      // Left arm: top-left → tip
      const t = i / (half - 1);
      targets.push({ x: cx - armW * (1 - t), y: cy - armH + armH * t });
    } else {
      // Right arm: tip → top-right
      const t = (i - half) / (n - 1 - half);
      targets.push({ x: cx + armW * t, y: cy - armH * t });
    }
  }
  return targets;
}

export default function ExpandableLattice({ className, style }: LatticeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    scrollProgress: 0,
    mouseX: -9999,
    mouseY: -9999,
    smx: -9999,
    smy: -9999,
    time: 0,
    width: 0,
    height: 0,
    dpr: 1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const s = stateRef.current;
    let animFrame: number;
    const sphere = fibSphere(NUM_POINTS);
    let chevronTgts: { x: number; y: number }[] = [];
    let chevronCy = 0;

    const px = new Float32Array(NUM_POINTS);
    const py = new Float32Array(NUM_POINTS);
    const dz = new Float32Array(NUM_POINTS);

    function resize() {
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.width = canvas!.clientWidth;
      s.height = canvas!.clientHeight;
      canvas!.width = s.width * s.dpr;
      canvas!.height = s.height * s.dpr;
      ctx!.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      chevronCy = s.height * 0.86;
      chevronTgts = buildChevronTargets(NUM_POINTS, s.width / 2, chevronCy);
    }

    function onScroll() {
      const el = canvas!.closest("section") || canvas!.parentElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      s.scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.45)));
    }

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouse = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      s.mouseX = e.clientX - r.left;
      s.mouseY = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMouse);

    function draw() {
      s.time += 1 / 60;
      const { width: w, height: h } = s;
      const cx = w / 2, cy = h / 2;
      const sp = s.scrollProgress;

      // Smooth mouse
      if (s.smx < -9000) { s.smx = s.mouseX; s.smy = s.mouseY; }
      if (s.mouseX < -9000) { s.smx = -9999; s.smy = -9999; }
      else { s.smx += (s.mouseX - s.smx) * 0.07; s.smy += (s.mouseY - s.smy) * 0.07; }
      const mx = s.smx, my = s.smy;

      const sphereR = Math.min(w, h) * 0.44;

      const rotY = s.time * 0.3;
      const rotX = Math.sin(s.time * 0.15) * 0.4;
      const rotZ = s.time * 0.08;
      const cY = Math.cos(rotY), sY = Math.sin(rotY);
      const cX = Math.cos(rotX), sX = Math.sin(rotX);
      const cZ = Math.cos(rotZ), sZ = Math.sin(rotZ);

      ctx!.clearRect(0, 0, w, h);

      // Bob for chevron
      const bob = Math.sin(s.time * 2.5) * 4;

      for (let i = 0; i < NUM_POINTS; i++) {
        const p = sphere[i];
        const breathe = 1 + Math.sin(s.time * 0.5 + i * 0.03) * 0.015;
        let x0 = p.x * breathe, y0 = p.y * breathe, z0 = p.z * breathe;

        let x1 = x0 * cY - z0 * sY;
        let z1 = x0 * sY + z0 * cY;
        let y1 = y0 * cX - z1 * sX;
        let z2 = y0 * sX + z1 * cX;
        let x2 = x1 * cZ - y1 * sZ;
        let y2 = x1 * sZ + y1 * cZ;

        const persp = 400;
        const sc = persp / (persp + z2 * sphereR);
        const sphX = cx + x2 * sphereR * sc;
        const sphY = cy + y2 * sphereR * sc;

        // Lerp toward chevron target on scroll
        const ct = chevronTgts[i];
        let fx = sphX + (ct.x - sphX) * sp;
        let fy = sphY + (ct.y + bob - sphY) * sp;

        if (mx > -9000) {
          const hdx = fx - mx, hdy = fy - my;
          const hd = Math.sqrt(hdx * hdx + hdy * hdy);
          if (hd < HOVER_RADIUS && hd > 1) {
            const f = (1 - hd / HOVER_RADIUS) * HOVER_FORCE * (1 - sp * 0.6);
            fx += (hdx / hd) * f;
            fy += (hdy / hd) * f;
          }
        }

        px[i] = fx;
        py[i] = fy;
        dz[i] = z2;
      }

      // Connection lines
      const connectDist = 72 + (1 - sp) * 40;
      const cd2 = connectDist * connectDist;
      ctx!.lineWidth = 0.5;

      for (let i = 0; i < NUM_POINTS; i++) {
        const ax = px[i], ay = py[i];
        for (let j = i + 1; j < Math.min(i + 20, NUM_POINTS); j++) {
          const ddx = ax - px[j];
          const ddy = ay - py[j];
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 > cd2) continue;
          const depthAvg = (dz[i] + dz[j] + 2) / 4;
          const alpha = (1 - Math.sqrt(d2) / connectDist) * depthAvg * (0.12 + (1 - sp) * 0.1);
          ctx!.strokeStyle = `rgba(${GOLD2.r},${GOLD2.g},${GOLD2.b},${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(ax, ay);
          ctx!.lineTo(px[j], py[j]);
          ctx!.stroke();
        }
      }

      // Particles
      for (let i = 0; i < NUM_POINTS; i++) {
        const dn = (dz[i] + 1) / 2;
        const r = GOLD.r + (GOLD2.r - GOLD.r) * (1 - dn);
        const g = GOLD.g + (GOLD2.g - GOLD.g) * (1 - dn);
        const b = GOLD.b + (GOLD2.b - GOLD.b) * (1 - dn);

        let hb = 0;
        if (mx > -9000) {
          const hd = Math.sqrt((px[i] - mx) ** 2 + (py[i] - my) ** 2);
          hb = hd < HOVER_RADIUS ? (1 - hd / HOVER_RADIUS) * 1.0 : 0;
        }

        // Shrink particles as they converge so the stroke chevron dominates
        const shrink = 1 - sp * 0.6;
        const size = (0.4 + dn * 1.8 + hb * 0.8) * shrink;
        const alpha = Math.min(0.08 + dn * 0.6 + hb * 0.25, 0.92) * shrink;

        ctx!.beginPath();
        ctx!.arc(px[i], py[i], Math.max(size, 0.2), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
        ctx!.fill();
      }

      // Glow
      const ga = 0.04 + (1 - sp) * 0.05;
      const gr = sphereR * 0.85;
      const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, gr);
      grad.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${ga})`);
      grad.addColorStop(1, "transparent");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, w, h);

      // Clean stroked chevron on top — hides particle mess underneath
      if (sp > 0.15) {
        const a = Math.min((sp - 0.15) / 0.4, 1);
        const armW = 20, armH = 12;
        const tipY = chevronCy + bob;

        ctx!.save();
        ctx!.globalAlpha = a;
        ctx!.strokeStyle = `rgb(${GOLD.r},${GOLD.g},${GOLD.b})`;
        ctx!.lineWidth = 2;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.beginPath();
        ctx!.moveTo(cx - armW, tipY - armH);
        ctx!.lineTo(cx, tipY);
        ctx!.lineTo(cx + armW, tipY - armH);
        ctx!.stroke();

        // Second chevron dimmer
        ctx!.globalAlpha = a * 0.35;
        ctx!.beginPath();
        ctx!.moveTo(cx - armW, tipY - armH + 14);
        ctx!.lineTo(cx, tipY + 14);
        ctx!.lineTo(cx + armW, tipY - armH + 14);
        ctx!.stroke();
        ctx!.restore();
      }

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div className={className} style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "auto" }}
      />
    </div>
  );
}

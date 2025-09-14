import React, { useRef, useEffect } from "react";

export function Marquee({ children, reverse = false, pauseOnHover = false, className = "" }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    let animationId;
    let paused = false;
    let start;
    let lastTimestamp = 0;
    let duration = 20000; // default 20s
    const style = window.getComputedStyle(container);
    const customDuration = style.getPropertyValue("--duration");
    if (customDuration) {
      const match = customDuration.match(/([\d.]+)s/);
      if (match) duration = parseFloat(match[1]) * 1000;
    }
    function animate(ts) {
      if (!start) start = ts;
      if (paused) {
        lastTimestamp = ts;
        animationId = requestAnimationFrame(animate);
        return;
      }
      const elapsed = (ts - start) % duration;
      const percent = elapsed / duration;
      const dir = reverse ? -1 : 1;
      content.style.transform = `translateX(${dir * -percent * 100}%)`;
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => { paused = true; });
      container.addEventListener("mouseleave", () => { paused = false; });
    }
    return () => {
      cancelAnimationFrame(animationId);
      if (pauseOnHover) {
        container.removeEventListener("mouseenter", () => { paused = true; });
        container.removeEventListener("mouseleave", () => { paused = false; });
      }
    };
  }, [reverse, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
    >
      <div
        ref={contentRef}
        className="inline-flex items-center gap-6"
        style={{ willChange: "transform" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

"use client";
import { useVoronoi } from "@/hooks/useVoronoi";
import { RefObject, useRef } from "react";
import OverlayPanel from "./OverlayPanel";

export default function VoronoiCanvas() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const {
    setPoints,
    clearPoints,
    generateRandomPoints,
    animateGrowth,
    switchColorMode,
    colored,
  } = useVoronoi({
    svgRef: svgRef as RefObject<SVGSVGElement>,
  });

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const newPoint: [number, number] = [
      e.clientX - rect.left,
      e.clientY - rect.top,
    ];
    setPoints((prev) => [...prev, newPoint]);
  };

  return (
    <div className="fixed inset-0">
      <OverlayPanel
        onAnimate={animateGrowth}
        onClear={clearPoints}
        onRandom={() => generateRandomPoints(25)}
        onToggleColor={switchColorMode}
        coloredMode={colored}
      />
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{
          display: "block",
          background: "#fafafa",
          cursor: "crosshair",
          position: "fixed",
          top: 0,
          left: 0,
        }}
        onClick={handleClick}
      />
    </div>
  );
}

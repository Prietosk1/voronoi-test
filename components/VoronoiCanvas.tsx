"use client";
import { useVoronoi } from "@/hooks/useVoronoi";
import { RefObject, useRef, useState } from "react";

export default function VoronoiCanvas() {
  const [points, setPoints] = useState<[number, number][]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Ocupa toda la pantalla
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  const height = typeof window !== "undefined" ? window.innerHeight : 0;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const newPoint: [number, number] = [
      e.clientX - rect.left,
      e.clientY - rect.top,
    ];
    setPoints((prev) => [...prev, newPoint]);
  };

  useVoronoi({
    points,
    svgRef: svgRef as RefObject<SVGSVGElement>,
    width,
    height,
  });

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{
        border: "1px solid #ccc",
        background: "#fafafa",
        cursor: "pointer",
      }}
      onClick={handleClick}
    />
  );
}

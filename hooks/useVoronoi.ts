import * as d3 from "d3";
import { RefObject, useEffect, useState } from "react";

interface UseVoronoiProps {
  svgRef: RefObject<SVGSVGElement> | null;
}

export function useVoronoi({ svgRef }: UseVoronoiProps) {
  const [points, setPoints] = useState<[number, number][]>([]);
  const [colored, setColored] = useState<boolean>(true);
  const [animateTrigger, setAnimateTrigger] = useState(0);

  const clearPoints = () => {
    if (!svgRef?.current) return;

    setPoints([]);
    const svg = d3.select(svgRef?.current);
    svg.selectAll("*").remove();
  };

  // ✅ Generar puntos aleatorios
  const generateRandomPoints = (count: number) => {
    if (!svgRef?.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const randomPoints: [number, number][] = Array.from(
      { length: count },
      () => [Math.random() * width, Math.random() * height]
    );

    setPoints(randomPoints);
  };

  const switchColorMode = () => {
    setColored((prev) => !prev);
  };

  const animateGrowth = () => {
    const svgEl = svgRef?.current;
    if (!svgEl || points.length === 0) return;

    const svg = d3.select<SVGSVGElement, unknown>(svgEl);

    // Borrar animaciones previas (defs)
    svg.selectAll("defs").remove();
    const defs = svg.append("defs");

    points.forEach((p, i) => {
      const clipId = `clip-${i}`;

      const cp = defs.append("clipPath").attr("id", clipId);

      cp.append("circle")
        .attr("cx", p[0])
        .attr("cy", p[1])
        .attr("r", 0)
        .transition()
        .duration(12000) // ✅ Animación lenta
        .ease(d3.easeCubicOut)
        .attr("r", 2000);

      // Aplicar clip-path a la celda correspondiente
      svg.select(`.cell-${i}`).attr("clip-path", `url(#${clipId})`);
    });
  };

  // Generar el diagrama de Voronoi cuando los puntos o el svgRef cambien
  useEffect(() => {
    const svgElement = svgRef?.current;
    if (!svgElement || !points.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    const height = typeof window !== "undefined" ? window.innerHeight : 0;

    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, width, height]);

    // Generar una escala de color suave
    const colorScale = d3
      .scaleSequential(d3.interpolateCool)
      .domain([0, points.length]);

    points.forEach((_, i) => {
      const pathStr = voronoi.renderCell(i);
      if (!pathStr) return;

      svg
        .append("path")
        .attr("class", `cell cell-${i}`)
        .attr("d", pathStr)
        .attr("fill", colored ? colorScale(i) : "#999")
        .attr("stroke", colored ? "#fff" : "#111")
        .attr("stroke-width", 1);
    });

    svg
      .selectAll("circle.dot")
      .data(points)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 3)
      .attr("fill", "#111");

    console.log("Voronoi hook initialized");
  }, [points, svgRef, colored]);

  return {
    setPoints,
    clearPoints,
    generateRandomPoints,
    animateGrowth,
    switchColorMode,
    colored,
  };
}

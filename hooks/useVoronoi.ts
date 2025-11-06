import * as d3 from "d3";
import { RefObject, useEffect } from "react";

interface UseVoronoiProps {
  points: [number, number][];
  svgRef: RefObject<SVGSVGElement> | null;
  width: number;
  height: number;
  colored?: boolean;
}

export function useVoronoi({
  points,
  svgRef,
  width,
  height,
  colored = false,
}: UseVoronoiProps) {
  // Voronoi hook logic here
  useEffect(() => {
    const svgElement = svgRef?.current;
    if (!svgElement || !points.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, width, height]);

    // Generar una escala de color suave
    const colorScale = d3
      .scaleSequential(d3.interpolateCool)
      .domain([0, points.length]);

    points.forEach((_, i) => {
      const path = voronoi.renderCell(i);
      if (!path) return;

      svg
        .append("path")
        .attr("d", path)
        .attr("fill", colored ? colorScale(i) : "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);
    });

    svg
      .selectAll("circle")
      .data(points)
      .join("circle")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 3)
      .attr("fill", "#111");

    console.log("Voronoi hook initialized");
  }, [points, svgRef, width, height, colored]);
}

import * as d3 from "d3";
import { RefObject, useEffect } from "react";

interface UseVoronoiProps {
  points: [number, number][];
  svgRef: RefObject<SVGSVGElement> | null;
  width: number;
  height: number;
}

export function useVoronoi({ points, svgRef, width, height }: UseVoronoiProps) {
  // Voronoi hook logic here
  useEffect(() => {
    const svgElement = svgRef?.current;
    if (!svgElement || !points.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, width, height]);

    svg
      .append("path")
      .attr("d", voronoi.render())
      .attr("fill", "none")
      .attr("stroke", "#999");

    svg
      .selectAll("circle")
      .data(points)
      .join("circle")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 4)
      .attr("fill", "tomato");

    console.log("Voronoi hook initialized");
  }, [points, svgRef, width, height]);
}

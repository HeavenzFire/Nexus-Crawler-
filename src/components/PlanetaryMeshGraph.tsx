import * as React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { type FederalAuditNode, type PlanetaryMeshResult } from "../lib/forensic-core";

interface PlanetaryMeshGraphProps {
  data: PlanetaryMeshResult;
}

export const PlanetaryMeshGraph: React.FC<PlanetaryMeshGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const width = 800;
    const height = 500;

    // Clone data to avoid mutating props
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    // Clear previous SVG contents
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Add zoom behavior
    svg.call(d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
      g.attr("transform", event.transform);
    }));

    const simulation = d3.forceSimulation<any>(nodes)
      .force("link", d3.forceLink<any, any>(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    // Define arrowhead marker
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#ef4444")
      .style("opacity", 0.6);

    // Draw links
    const link = g.append("g")
      .selectAll("g")
      .data(links)
      .enter().append("g");

    link.append("line")
      .attr("stroke", (d: any) => {
        const isCritical = d.source.id === "FED-004" || d.target.id === "FED-004" || 
                          d.source === "FED-004" || d.target === "FED-004";
        return isCritical ? "#ef4444" : "#475569";
      })
      .attr("stroke-opacity", (d: any) => {
        const isCritical = d.source.id === "FED-004" || d.target.id === "FED-004" || 
                          d.source === "FED-004" || d.target === "FED-004";
        return isCritical ? 0.9 : 0.4;
      })
      .attr("stroke-width", (d: any) => {
        const isCritical = d.source.id === "FED-004" || d.target.id === "FED-004" || 
                          d.source === "FED-004" || d.target === "FED-004";
        return (Math.sqrt(d.weight) * 2) * (isCritical ? 1.5 : 1);
      })
      .attr("marker-end", "url(#arrowhead)");

    // Link labels
    link.append("text")
      .text((d: any) => d.label)
      .attr("font-size", "6px")
      .attr("fill", "#94a3b8")
      .attr("text-anchor", "middle")
      .attr("class", "pointer-events-none")
      .style("opacity", 0.6);

    // Draw nodes
    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .call(d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Node circles
    node.append("circle")
      .attr("r", (d: any) => 10 + (d.zylphaDiagnosticScore / 10))
      .attr("fill", (d: any) => d.blinkingLightFlag ? "#ef4444" : "#3b82f6")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .attr("class", (d: any) => d.blinkingLightFlag ? "animate-pulse" : "");

    // Node labels
    node.append("text")
      .text((d: any) => d.agency)
      .attr("x", 15)
      .attr("y", 5)
      .attr("fill", "#ffffff")
      .attr("font-family", "JetBrains Mono, monospace")
      .attr("font-size", "10px")
      .attr("style", "pointer-events: none; text-shadow: 0 0 5px rgba(0,0,0,0.8);");

    // Risk indicator
    node.filter((d: any) => d.auditStatus === "DISCLAIMER")
      .append("text")
      .text("CRITICAL")
      .attr("x", -20)
      .attr("y", -20)
      .attr("fill", "#ef4444")
      .attr("font-weight", "bold")
      .attr("font-size", "8px");

    simulation.on("tick", () => {
      link.select("line")
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      link.select("text")
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [data]);

  return (
    <div className="w-full h-full bg-black/40 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center relative">
      <div className="absolute top-4 left-4 font-mono text-[9px] text-white/40 uppercase tracking-widest z-10 pointer-events-none">
        Logic_Density: 128:1 | Interdependency_Mesh
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 800 500"
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

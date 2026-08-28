"use client";

import React, { useEffect, useState } from "react";
import { Calendar, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DataPoint {
  month: string;
  value: number;
  revenue_formatted: string;
}

export default function SalesAnalytics() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMonthlyData() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("monthly_analytics")
          .select("month, value, revenue_formatted")
          .eq("year", selectedYear)
          .order("month_index", { ascending: true });

        if (data && !error && data.length > 0) {
          // De-duplicate by month name to guarantee only 1 point per month
          const uniqueByMonth = Array.from(
            new Map(
              data.map((d) => [
                d.month === "July" ? "Jul" : d.month,
                {
                  month: d.month === "July" ? "Jul" : d.month,
                  value: parseFloat(d.value),
                  revenue_formatted: d.revenue_formatted,
                },
              ])
            ).values()
          );

          setDataPoints(uniqueByMonth);
        } else {
          // Fallback if year has no entries
          setDataPoints([
            { month: "Jan", value: 38, revenue_formatted: "$38,400" },
            { month: "Feb", value: 24, revenue_formatted: "$24,100" },
            { month: "Mar", value: 45, revenue_formatted: "$45,200" },
            { month: "Apr", value: 30, revenue_formatted: "$30,900" },
            { month: "May", value: 55, revenue_formatted: "$55,000" },
            { month: "Jun", value: 42, revenue_formatted: "$42,800" },
            { month: "Jul", value: 48, revenue_formatted: "$48,600" },
            { month: "Aug", value: 35, revenue_formatted: "$35,300" },
            { month: "Sep", value: 58, revenue_formatted: "$58,900" },
          ]);
        }
      } catch (err) {
        console.error("Failed to load monthly analytics:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadMonthlyData();
  }, [selectedYear]);

  const width = 640;
  const height = 190;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxValue = 60;
  const minValue = 0;

  const points = dataPoints.map((d, index) => {
    const x = paddingLeft + (index / Math.max(dataPoints.length - 1, 1)) * chartWidth;
    const y =
      paddingTop +
      chartHeight -
      ((d.value - minValue) / (maxValue - minValue)) * chartHeight;
    return { ...d, x, y };
  });

  const linePath = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
  }, "");

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x},${
          paddingTop + chartHeight
        } L ${points[0].x},${paddingTop + chartHeight} Z`
      : "";

  const yTicks = [60, 50, 40, 30, 20, 10];

  return (
    <div className="bg-white rounded-[8px] border border-slate-200/80 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-[#0B132A]">
            Sales Analytics
          </h2>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% growth this quarter</span>
          </div>
        </div>

        {/* Year Dropdown */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-[6px] text-xs font-semibold text-slate-700 shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-transparent focus:outline-none cursor-pointer text-xs"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      {/* SVG Chart Visualization */}
      <div className="relative mt-2 w-full h-[200px]">
        {hoveredPoint && hoverPos && (
          <div
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 bg-[#0B132A] text-white px-2.5 py-1 rounded-[6px] text-xs shadow-md space-y-0.5"
            style={{ left: `${hoverPos.x}px`, top: `${hoverPos.y}px` }}
          >
            <div className="font-bold text-[#FA8231]">
              {hoveredPoint.revenue_formatted}
            </div>
            <div className="text-[10px] text-slate-300">
              {hoveredPoint.month} {selectedYear}
            </div>
          </div>
        )}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FA8231" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#FA8231" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          {yTicks.map((val, idx) => {
            const y =
              paddingTop +
              chartHeight -
              ((val - minValue) / (maxValue - minValue)) * chartHeight;
            return (
              <g key={`ytick-${val}-${idx}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] font-sans font-medium"
                >
                  {val}k
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          {areaPath && <path d={areaPath} fill="url(#orangeGradient)" />}

          {/* Line Path */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#FA8231"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Points */}
          {points.map((p, index) => {
            const isHovered = hoveredPoint?.month === p.month;
            return (
              <g
                key={`point-${p.month}-${index}`}
                className="cursor-pointer"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const parentRect = e.currentTarget
                    .closest("svg")
                    ?.getBoundingClientRect();
                  if (parentRect) {
                    setHoverPos({
                      x: rect.left - parentRect.left + rect.width / 2,
                      y: rect.top - parentRect.top,
                    });
                  }
                  setHoveredPoint(p);
                }}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <text
                  x={p.x}
                  y={height - 5}
                  textAnchor="middle"
                  className={`text-[10px] font-medium transition-colors ${
                    isHovered ? "fill-[#FA8231] font-bold" : "fill-slate-400"
                  }`}
                >
                  {p.month}
                </text>

                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 5 : 3.5}
                  className={`transition-all ${
                    isHovered
                      ? "fill-[#FA8231] stroke-3 stroke-white"
                      : "fill-[#FA8231] stroke-2 stroke-white"
                  }`}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

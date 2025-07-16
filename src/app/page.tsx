"use client";

import { useState, useRef, useEffect } from "react";
import Node from "@/components/Node";

const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 600;

const nodes = [
  {
    id: "profile",
    parentId: null,
    label: "PROFILE",
    size: 120,
    position: { x: 0.5, y: 0.5 },
    url: "/profile",
    nodeType: "primary",
    color: "#0891b2",
  }, // cyan-600
  {
    id: "dev",
    parentId: "profile",
    label: "DEVELOPMENT",
    size: 100,
    position: { x: 0.5, y: 0.15 },
    url: "/development",
    nodeType: "primary",
    color: "#06b6d4",
  }, // cyan-500
  {
    id: "research",
    parentId: "profile",
    label: "RESEARCH",
    size: 100,
    position: { x: 0.88, y: 0.5 },
    url: "/research",
    nodeType: "primary",
    color: "#0e7490",
  }, // cyan-700
  {
    id: "intern",
    parentId: "profile",
    label: "INTERNSHIP",
    size: 100,
    position: { x: 0.7, y: 0.85 },
    url: "/internship",
    nodeType: "primary",
    color: "#06b6d4",
  }, // cyan-500
  {
    id: "others",
    parentId: "profile",
    label: "OTHERS",
    size: 100,
    position: { x: 0.3, y: 0.85 },
    url: "/others",
    nodeType: "primary",
    color: "#0e7490",
  }, // cyan-700
  {
    id: "tech",
    parentId: "profile",
    label: "TECH",
    size: 100,
    position: { x: 0.12, y: 0.5 },
    url: "/tech",
    nodeType: "primary",
    color: "#06b6d4",
  }, // cyan-500
  {
    id: "court-system",
    parentId: "dev",
    label: "Court Reservation",
    size: 70,
    position: { x: 0.3, y: 0.05 },
    url: "/development/court-reservation-system",
    nodeType: "secondary",
    color: "#67e8f9",
  }, // cyan-300
  {
    id: "vocab-app",
    parentId: "dev",
    label: "Vocab App",
    size: 70,
    position: { x: 0.5, y: -0.05 },
    url: "/development/vocab-app",
    nodeType: "secondary",
    color: "#67e8f9",
  }, // cyan-300
  {
    id: "nhk-scrape",
    parentId: "dev",
    label: "News Scraper",
    size: 70,
    position: { x: 0.7, y: 0.05 },
    url: "/development/nhk-news-scraping",
    nodeType: "secondary",
    color: "#67e8f9",
  }, // cyan-300
  {
    id: "blog",
    parentId: "others",
    label: "Blog",
    size: 70,
    position: { x: 0.1, y: 0.85 },
    url: "/blog",
    nodeType: "secondary",
    color: "#a5f3fc",
  }, // cyan-200
  {
    id: "atcoder",
    parentId: "others",
    label: "AtCoder",
    size: 70,
    position: { x: 0.3, y: 1.05 },
    url: "/atcoder",
    nodeType: "secondary",
    color: "#a5f3fc",
  }, // cyan-200
  {
    id: "kaggle",
    parentId: "others",
    label: "Kaggle",
    size: 70,
    position: { x: 0.5, y: 1.05 },
    url: "/kaggle",
    nodeType: "secondary",
    color: "#a5f3fc",
  }, // cyan-200
] as const;

export default function Home() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleMouseEnter = (nodeId: string) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setHoveredNodeId(nodeId);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => setHoveredNodeId(null), 200);
  };

  const profileNodePosition = nodes.find((n) => n.id === "profile")?.position;
  if (!profileNodePosition) return null;

  const hoveredNode = nodes.find((n) => n.id === hoveredNodeId);
  const activeParentId =
    hoveredNode?.nodeType === "primary"
      ? hoveredNode.id
      : hoveredNode?.parentId;

  return (
    <div className="flex py-12 md:py-36 items-center justify-center min-h-screen bg-grid">
      <div
        className="relative"
        style={{
          width: `${CONTAINER_WIDTH}px`,
          height: `${CONTAINER_HEIGHT}px`,
        }}
        onMouseLeave={handleMouseLeave}
      >
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
          {nodes.map((node) => {
            const parentNode = nodes.find((p) => p.id === node.parentId);
            if (!parentNode) return null;

            const isPrimaryLine = parentNode.id === "profile";
            const isSecondaryGroupVisible = node.parentId === activeParentId;
            const isVisible = isPrimaryLine || isSecondaryGroupVisible;

            const isLineHighlighted =
              node.id === hoveredNodeId ||
              node.parentId === hoveredNodeId ||
              (hoveredNode?.parentId === node.id &&
                parentNode.id === hoveredNode?.parentId);
            const isChildOfHoveredParent = parentNode.id === hoveredNodeId;

            const startX = parentNode.position.x * CONTAINER_WIDTH;
            const startY = parentNode.position.y * CONTAINER_HEIGHT;
            const endX = isMounted ? node.position.x * CONTAINER_WIDTH : startX;
            const endY = isMounted
              ? node.position.y * CONTAINER_HEIGHT
              : startY;

            return (
              <line
                key={`line-${node.id}-to-${parentNode.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                className="transition-all duration-500"
                style={{
                  // ★ 変更点: 線の色をノードの色に合わせ、ホバー時の色をより明るく
                  stroke:
                    isLineHighlighted || isChildOfHoveredParent
                      ? node.color
                      : "rgba(55, 65, 81, 0.4)",
                  strokeWidth:
                    isLineHighlighted || isChildOfHoveredParent ? 1.5 : 0.5,
                  opacity: isVisible ? 0.8 : 0,
                  transitionProperty: "stroke, stroke-width, opacity",
                }}
              />
            );
          })}
        </svg>

        {nodes.map((node, index) => {
          const isNodeHovered = hoveredNodeId === node.id;
          const isParentOfHovered = hoveredNode?.parentId === node.id;

          let isVisible =
            node.nodeType === "primary" ||
            (node.parentId && node.parentId === activeParentId);
          if (node.id === "profile") isVisible = true;
          if (!hoveredNodeId && node.nodeType === "secondary") {
            isVisible = false;
          }

          const initialPosition =
            (node.parentId &&
              nodes.find((p) => p.id === node.parentId)?.position) ||
            profileNodePosition;
          const positionToRender = isMounted ? node.position : initialPosition;

          return (
            <Node
              key={node.id}
              id={node.id}
              label={node.label}
              size={node.size}
              position={positionToRender}
              url={node.url}
              color={node.color}
              isVisible={isMounted ? isVisible : node.id === "profile"}
              isHovered={isNodeHovered || isParentOfHovered}
              transitionDelay={`${index * 80}ms`}
              onMouseEnter={() => handleMouseEnter(node.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

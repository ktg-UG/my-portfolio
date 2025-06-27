"use client";

import { useState, useRef, useEffect } from 'react';
import Node from "@/components/Node";

const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 600;

// ★ 変更点: 各ノードに `color` プロパティを追加
const nodes = [
  { id: 'profile', parentId: null, label: "PROFILE", size: 120, position: { x: 0.5, y: 0.5 }, url: "/profile", nodeType: 'primary', color: '#cbd5e1' },
  { id: 'dev', parentId: 'profile', label: "DEVELOPMENT", size: 100, position: { x: 0.5, y: 0.15 }, url: "/development", nodeType: 'primary', color: '#f472b6' },
  { id: 'research', parentId: 'profile', label: "RESEARCH", size: 100, position: { x: 0.88, y: 0.5 }, url: "/research", nodeType: 'primary', color: '#a78bfa' },
  { id: 'intern', parentId: 'profile', label: "INTERNSHIP", size: 100, position: { x: 0.7, y: 0.85 }, url: "/internship", nodeType: 'primary', color: '#4ade80' },
  { id: 'others', parentId: 'profile', label: "OTHERS", size: 100, position: { x: 0.3, y: 0.85 }, url: "/others", nodeType: 'primary', color: '#60a5fa' },
  { id: 'tech', parentId: 'profile', label: "TECH", size: 100, position: { x: 0.12, y: 0.5 }, url: "/tech", nodeType: 'primary', color: '#facc15' },
  { id: 'court-system', parentId: 'dev', label: "Court Reservation", size: 70, position: { x: 0.3, y: 0.05 }, url: "/development/court-reservation-system", nodeType: 'secondary', color: '#f9a8d4' },
  { id: 'vocab-app', parentId: 'dev', label: "Vocab App", size: 70, position: { x: 0.5, y: -0.05 }, url: "/development/vocab-app", nodeType: 'secondary', color: '#f9a8d4' },
  { id: 'nhk-scrape', parentId: 'dev', label: "News Scraper", size: 70, position: { x: 0.7, y: 0.05 }, url: "/development/nhk-news-scraping", nodeType: 'secondary', color: '#f9a8d4' },
  { id: 'blog', parentId: 'others', label: "Blog", size: 70, position: { x: 0.1, y: 0.85 }, url: "/blog", nodeType: 'secondary', color: '#93c5fd' },
  { id: 'atcoder', parentId: 'others', label: "AtCoder", size: 70, position: { x: 0.3, y: 1.05 }, url: "/atcoder", nodeType: 'secondary', color: '#93c5fd' },
  { id: 'kaggle', parentId: 'others', label: "Kaggle", size: 70, position: { x: 0.5, y: 1.05 }, url: "/kaggle", nodeType: 'secondary', color: '#93c5fd' },
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

  const profileNodePosition = nodes.find(n => n.id === 'profile')?.position;
  if (!profileNodePosition) return null;

  const hoveredNode = nodes.find(n => n.id === hoveredNodeId);
  
  const activeParentId = hoveredNode?.nodeType === 'primary' ? hoveredNode.id : hoveredNode?.parentId;

  return (
    <div className="flex py-36 items-center justify-center min-h-screen">
      <div
        className="relative"
        style={{ width: `${CONTAINER_WIDTH}px`, height: `${CONTAINER_HEIGHT}px` }}
        onMouseLeave={handleMouseLeave}
      >
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
          {nodes.map((node, index) => {
            const parentNode = nodes.find(p => p.id === node.parentId);
            if (!parentNode) return null;

            const isPrimaryLine = parentNode.id === 'profile';
            const isSecondaryGroupVisible = node.parentId === activeParentId;
            const isVisible = isPrimaryLine || isSecondaryGroupVisible;
            
            const isLineHighlighted = node.id === hoveredNodeId || hoveredNode?.parentId === node.id;

            const startX = parentNode.position.x * CONTAINER_WIDTH;
            const startY = parentNode.position.y * CONTAINER_HEIGHT;
            const endX = isMounted ? node.position.x * CONTAINER_WIDTH : startX;
            const endY = isMounted ? node.position.y * CONTAINER_HEIGHT : startY;

            return (
              <line
                key={`line-${node.id}-to-${parentNode.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                className={`line-path transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${isLineHighlighted ? 'animated' : ''}`}
                style={{
                  stroke: isLineHighlighted ? "#3b82f6" : "#cbd5e1",
                  strokeWidth: isLineHighlighted ? "2" : "1",
                  strokeDasharray: "8 8",
                  transitionProperty: 'stroke, stroke-width, opacity',
                }}
              />
            );
          })}
        </svg>

        {nodes.map((node, index) => {
          const isNodeHovered = hoveredNodeId === node.id;
          const isParentHovered = hoveredNodeId === node.parentId;
          const isChildOfHovered = node.parentId === hoveredNodeId;

          const isActive = hoveredNodeId ? (isNodeHovered || isParentHovered || isChildOfHovered) : (node.nodeType === 'primary');
          
          let isVisible = node.nodeType === 'primary' || (node.parentId && node.parentId === activeParentId);
          if (node.id === 'profile') isVisible = true;
          if (!hoveredNodeId && node.nodeType === 'secondary') {
              isVisible = false;
          }

          const initialPosition = (node.parentId && nodes.find(p => p.id === node.parentId)?.position) || profileNodePosition;
          const positionToRender = isMounted ? node.position : initialPosition;
          
          return (
            <Node
              id={node.id}
              label={node.label}
              size={node.size}
              position={positionToRender}
              url={node.url}
              color={node.color}
              nodeType={node.nodeType}
              isVisible={isMounted ? isVisible : (node.id === 'profile')}
              isActive={isActive}
              isHovered={isNodeHovered}
              transitionDelay={`${index * 80}ms`}
              onMouseEnter={() => handleMouseEnter(node.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
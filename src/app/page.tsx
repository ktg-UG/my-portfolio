// src/app/page.tsx

"use client";

import { useState, useRef, useEffect } from 'react';
import Node from "@/components/Node";

const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 600;

export default function Home() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const nodes = [
    { id: 'profile', parentId: null, label: "プロフィール", color: "#6b7280", size: 120, position: { x: 0.5, y: 0.5 }, url: "/profile", nodeType: 'primary' },
    { id: 'dev', parentId: 'profile', label: "個人開発", color: "#f472b6", size: 100, position: { x: 0.5, y: 0.15 }, url: "/development", nodeType: 'primary' },
    { id: 'research', parentId: 'profile', label: "研究", color: "#8b5cf6", size: 100, position: { x: 0.88, y: 0.5 }, url: "/research", nodeType: 'primary' },
    { id: 'intern', parentId: 'profile', label: "インターン", color: "#22c55e", size: 100, position: { x: 0.7, y: 0.85 }, url: "/internship", nodeType: 'primary' },
    { id: 'others', parentId: 'profile', label: "その他", color: "#3b82f6", size: 100, position: { x: 0.3, y: 0.85 }, url: "/others", nodeType: 'primary' },
    { id: 'tech', parentId: 'profile', label: "技術書", color: "#f59e0b", size: 100, position: { x: 0.12, y: 0.5 }, url: "/tech", nodeType: 'primary' },
    { id: 'court', parentId: 'dev', label: "コート予約システム", color: "#f472b6", size: 70, position: { x: 0.3, y: 0.05 }, url: "/development/court-system", nodeType: 'secondary' },
    { id: 'vocab', parentId: 'dev', label: "英単語アプリ", color: "#f472b6", size: 70, position: { x: 0.5, y: -0.05 }, url: "/development/vocab-app", nodeType: 'secondary' },
    { id: 'scrape', parentId: 'dev', label: "ニューススクレイピング", color: "#f472b6", size: 70, position: { x: 0.7, y: 0.05 }, url: "/development/news-scraping", nodeType: 'secondary' },
    { id: 'blog', parentId: 'others', label: "ブログ", color: "#3b82f6", size: 70, position: { x: 0.1, y: 0.85 }, url: "/blog", nodeType: 'secondary' },
    { id: 'atcoder', parentId: 'others', label: "AtCoder", color: "#3b82f6", size: 70, position: { x: 0.3, y: 1.05 }, url: "/atcoder", nodeType: 'secondary' },
    { id: 'kaggle', parentId: 'others', label: "Kaggle", color: "#3b82f6", size: 70, position: { x: 0.5, y: 1.05 }, url: "/kaggle", nodeType: 'secondary' },
  ] as const;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (nodeId: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    setHoveredNodeId(nodeId);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setHoveredNodeId(null);
    }, 1000);
  };

  const profileNodePosition = nodes.find(n => n.id === 'profile')?.position;
  if (!profileNodePosition) return null;

  return (
    <div className="flex items-center justify-center h-[calc(100vh+4rem)]">
      <div
        className="relative"
        style={{ width: `${CONTAINER_WIDTH}px`, height: `${CONTAINER_HEIGHT}px` }}
      >
        <svg className="absolute top-0 left-0 w-full h-full">
          {nodes.map((node, index) => { 
            const parentNode = nodes.find(p => p.id === node.parentId);
            if (!parentNode) return null;

            const hoveredNode = nodes.find(n => n.id === hoveredNodeId);
            const activeParentId = hoveredNode?.nodeType === 'primary' ? hoveredNode.id : hoveredNode?.parentId;
            
            const isPrimaryLine = parentNode.id === 'profile';
            const isSecondaryGroupVisible = node.parentId === activeParentId;
            const isVisible = isPrimaryLine || isSecondaryGroupVisible;

            const isLineHighlighted = hoveredNodeId === node.id || node.id === hoveredNode?.parentId;

            const startX = parentNode.position.x * CONTAINER_WIDTH;
            const startY = parentNode.position.y * CONTAINER_HEIGHT;
            const endX = isMounted ? node.position.x * CONTAINER_WIDTH : startX;
            const endY = isMounted ? node.position.y * CONTAINER_HEIGHT : startY;
            const lineDelay = `${(index * 80) +  500}ms`;

            return (
              <line
                key={`line-${node.id}-to-${parentNode.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={isLineHighlighted ? "#1f2937" : "white"}
                strokeWidth={isLineHighlighted ? "3" : "2"}
                strokeDasharray="8 8" 
                
                className={`
                  line-path 
                  [filter:drop-shadow(0_2px_1px_rgba(0,0,0,0.4))]
                  ${isLineHighlighted ? 'animated' : ''}
                  ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                style={{
                  transition: `
                    x2 0.5s ease-in-out ${lineDelay}, 
                    y2 0.5s ease-in-out ${lineDelay}
                  `,
                  transitionDelay: lineDelay,
                }}
              />
            );
          })}
        </svg>

        {nodes.map((node, index) => {
          const hoveredNode = nodes.find(n => n.id === hoveredNodeId);
          const activeParentId = hoveredNode?.nodeType === 'primary' ? hoveredNode.id : hoveredNode?.parentId;
          
          let isVisible = node.nodeType === 'primary' || node.parentId === null || node.parentId === activeParentId;
          if (node.id === 'profile') isVisible = true;

          const positionToRender = !isMounted && node.nodeType === 'primary' && node.id !== 'profile' 
            ? profileNodePosition 
            : node.position;

          const finalVisibility = isMounted ? isVisible : (node.id === 'profile');

          return (
            <Node
              key={node.id}
              id={node.id}
              label={node.label}
              color={node.color}
              size={node.size}
              position={positionToRender}
              url={node.url}
              nodeType={node.nodeType}
              isVisible={finalVisibility}
              transitionDelay={`${index * 80}ms`}
              onMouseEnter={() => handleMouseEnter(node.id)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
    </div>
  );
}
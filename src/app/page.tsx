// src/app/page.tsx

"use client";

import { useState, useRef, useEffect } from 'react';
import Node from "@/components/Node";

const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 600;

export default function Home() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nodes = [
    { id: 'profile', parentId: null, label: "プロフィール", color: "#d1d5db", size: 120, position: { x: 0.5, y: 0.5 }, url: "/profile", nodeType: 'primary' },
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
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh+4rem)] bg-gray-50">
      <div
        className="relative"
        style={{ width: `${CONTAINER_WIDTH}px`, height: `${CONTAINER_HEIGHT}px` }}
      >
        <svg className="absolute top-0 left-0 w-full h-full">
          {nodes.map((node) => {
            // 親ノードがなければ線は描画しない
            const parentNode = nodes.find(p => p.id === node.parentId);
            if (!parentNode) return null;

            // アクティブな親グループを特定
            const hoveredNode = nodes.find(n => n.id === hoveredNodeId);
            const activeParentId = hoveredNode?.nodeType === 'primary' ? hoveredNode.id : hoveredNode?.parentId;
            
            // 線の表示/非表示を決定
            const isPrimaryLine = parentNode.id === 'profile';
            const isSecondaryGroupVisible = node.parentId === activeParentId;
            const isVisible = isPrimaryLine || isSecondaryGroupVisible;

            const isLineHighlighted = hoveredNodeId === node.id;

            return (
              <line
                key={`line-${node.id}-to-${parentNode.id}`}
                x1={parentNode.position.x * CONTAINER_WIDTH}
                y1={parentNode.position.y * CONTAINER_HEIGHT}
                x2={node.position.x * CONTAINER_WIDTH}
                y2={node.position.y * CONTAINER_HEIGHT}
                stroke={isLineHighlighted ? "#1f2937" : "white"}
                strokeWidth={isLineHighlighted ? "3" : "2"}
                strokeDasharray="8 8" 
                className={`
                  line-path transition-opacity duration-300
                  [filter:drop-shadow(0_2px_1px_rgba(0,0,0,0.4))]
                  ${isLineHighlighted ? 'animated' : ''}
                  ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const hoveredNode = nodes.find(n => n.id === hoveredNodeId);
          const activeParentId = hoveredNode?.nodeType === 'primary' ? hoveredNode.id : hoveredNode?.parentId;
          
          const isVisible = 
            node.nodeType === 'primary' || 
            node.parentId === null || 
            node.parentId === activeParentId;

          return (
            <Node
              key={node.id}
              id={node.id}
              label={node.label}
              color={node.color}
              size={node.size}
              position={node.position}
              url={node.url}
              nodeType={node.nodeType}
              isVisible={isVisible}
              onMouseEnter={() => handleMouseEnter(node.id)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
    </div>
  );
}
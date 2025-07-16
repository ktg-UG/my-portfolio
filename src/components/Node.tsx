import Link from "next/link";
import { useMemo } from "react";

type NodeProps = {
  id: string;
  label: string;
  size: number;
  position: { x: number; y: number };
  url: string;
  color: string;
  isVisible: boolean;
  isHovered: boolean;
  transitionDelay: string;
  onMouseEnter: () => void;
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Node = ({
  label,
  size,
  position,
  url,
  color,
  isVisible,
  isHovered,
  transitionDelay,
  onMouseEnter,
}: NodeProps) => {
  const nodeClasses = useMemo(
    () =>
      [
        "absolute",
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "font-bold",
        "text-center",
        "cursor-pointer",
        "transition-all",
        "duration-500",
        "ease-in-out",
        isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-0 pointer-events-none",
        isHovered ? "z-20" : "z-10",
        "text-white",
      ].join(" "),
    [isVisible, isHovered]
  );

  const nodeStyle = useMemo(() => {
    const brightColor = isHovered ? color : hexToRgba(color, 0.8);

    return {
      width: `${size}px`,
      height: `${size}px`,
      fontSize: size < 80 ? "11px" : "14px",
      lineHeight: 1.2,
      padding: "4px",
      top: `calc(${position.y * 100}% - ${size / 2}px)`,
      left: `calc(${position.x * 100}% - ${size / 2}px)`,
      transitionDelay: transitionDelay,
      transitionProperty:
        "transform, opacity, box-shadow, background-color, border-color",

      background: `radial-gradient(circle at 35% 35%, ${hexToRgba(
        color,
        0.5
      )}, transparent 40%), radial-gradient(circle at 30% 30%, white, transparent 35%)`,
      // 2. ベースとなるガラスの本体色 (透明度高め)
      backgroundColor: hexToRgba(color, 0.15),
      // 3. ガラスの縁 (フチ) の表現
      border: `2px solid ${hexToRgba(color, isHovered ? 0.8 : 0.6)}`,
      // 4. 背景をぼかして透明感を強調
      backdropFilter: "blur(8px)",
      // 5. 影とグロー効果 (ホバーで強化)
      boxShadow: isHovered
        ? `0 0 25px 5px ${hexToRgba(color, 0.7)}, 0 0 40px 10px ${hexToRgba(
            color,
            0.4
          )}, inset 0 0 15px 3px ${hexToRgba(color, 0.5)}`
        : `0 0 12px 2px ${hexToRgba(color, 0.6)}, inset 0 0 8px 1px ${hexToRgba(
            color,
            0.3
          )}`,
      transform: `scale(${isHovered ? 1.15 : 1})`,
      textShadow: "0 0 5px rgba(0,0,0,0.5)", // 文字を読みやすくするための影
    };
  }, [size, position, color, isHovered, transitionDelay]);

  return (
    <Link href={url} legacyBehavior>
      <a onMouseEnter={onMouseEnter} className={nodeClasses} style={nodeStyle}>
        {label}
      </a>
    </Link>
  );
};

export default Node;

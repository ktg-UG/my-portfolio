import Link from 'next/link';

// ★ 変更点: Propsの型に`color`を追加
type NodeProps = {
  id: string;
  label: string;
  size: number;
  position: { x: number; y: number };
  url: string;
  color: string;
  nodeType: "primary" | "secondary";
  isVisible: boolean;
  isActive: boolean;
  isHovered: boolean;
  transitionDelay: string;
  onMouseEnter: () => void;
};

const Node = ({
  label,
  size,
  position,
  url,
  color,
  nodeType,
  isVisible,
  isActive,
  isHovered,
  transitionDelay,
  onMouseEnter,
}: NodeProps) => {

  const textColorClass = (color === '#facc15' || color === '#cbd5e1') 
    ? 'text-slate-800' // 濃いグレーの文字
    : 'text-white';   // 白色の文字

  const nodeClasses = [
    "absolute",
    "rounded-full",
    "flex",
    "items-center",
    "justify-center",
    "font-bold",
    "text-center",
    "cursor-pointer",
    "transition-all",
    "duration-300",
    "ease-in-out",
    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none",
    textColorClass,
    isHovered ? "z-10" : "z-0",
  ].join(" ");

  return (
    <Link href={url} legacyBehavior>
      <a
        onMouseEnter={onMouseEnter}
        className={nodeClasses}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: size < 80 ? '11px' : '14px',
          lineHeight: 1.2,
          padding: '4px',
          top: `calc(${position.y * 100}% - ${size / 2}px)`,
          left: `calc(${position.x * 100}% - ${size / 2}px)`,
          backgroundColor: color,
          transform: `scale(${isHovered ? 1.15 : 1})`,
          boxShadow: isHovered 
            ? '0 10px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)' 
            : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          transitionDelay: nodeType === "primary" ? transitionDelay : "",
          transitionProperty: 'transform, background-color, opacity, box-shadow, top, left',
        }}
      >
        {label}
      </a>
    </Link>
  );
};

export default Node;
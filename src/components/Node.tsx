import Link from 'next/link';

// ★ 新規: Nodeコンポーネントに渡すPropsの型を定義します
type NodeProps = {
  id: string;
  label: string;
  size: number;
  position: { x: number; y: number };
  url: string;
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
  isVisible,
  isActive,
  isHovered,
  transitionDelay,
  onMouseEnter,
}: NodeProps) => {

  // ★ 変更点: 状態に応じてTailwindのクラスを動的に組み立てます
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
    isActive
      ? "text-white" // アクティブなノードの文字色
      : "text-slate-600", // 非アクティブなノードの文字色
    isHovered
      ? "z-10" // ホバー時に他の要素より手前に表示
      : "z-0",
  ].join(" ");

  // ★ 変更点: 状態に応じた背景色を決定
  const backgroundColor = isActive ? '#3b82f6' : '#e2e8f0'; // (青 or 明るいグレー)

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
          backgroundColor: backgroundColor,
          transform: `scale(${isHovered ? 1.15 : 1})`, // ホバーで少し拡大
          boxShadow: isHovered 
            ? '0 10px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)' 
            : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          transitionDelay: transitionDelay,
          transitionProperty: 'transform, background-color, opacity, box-shadow, top, left',
        }}
      >
        {label}
      </a>
    </Link>
  );
};

export default Node;
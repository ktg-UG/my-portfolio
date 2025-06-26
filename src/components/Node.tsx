import Link from 'next/link';

// ★ 変更点: Propsの型に`color`を追加
type NodeProps = {
  id: string;
  label: string;
  size: number;
  position: { x: number; y: number };
  url: string;
  color: string; // colorプロパティを受け取る
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
  color, // propsとして受け取る
  isVisible,
  isActive,
  isHovered,
  transitionDelay,
  onMouseEnter,
}: NodeProps) => {

  // ★ 変更点: 背景色に合わせて適切な文字色を決定
  // 黄色(#facc15)と白っぽいグレー(#cbd5e1)の場合は黒文字、それ以外は白文字にする
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
    textColorClass, // ★ 変更点: 上で決定した文字色クラスを適用
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
          backgroundColor: color, // ★ 変更点: 背景色をpropsで受け取ったcolorに設定
          transform: `scale(${isHovered ? 1.15 : 1})`,
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
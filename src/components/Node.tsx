// src/components/Node.tsx

import Link from 'next/link';

type Props = {
  id: string;
  label: string;
  color: string;
  size: number;
  position: { x: number; y: number };
  url: string;
  nodeType: 'primary' | 'secondary';
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function Node({ id, label, color, size, position, url, nodeType, isVisible, onMouseEnter, onMouseLeave }: Props) {
  const sphereStyle = {
    background: `radial-gradient(circle at 33% 33%, rgba(255, 255, 255, 0.4), ${color} 85%)`,
    boxShadow: `
      inset 2px 2px 5px rgba(255, 255, 255, 0.3), 
      inset -4px -4px 8px rgba(0, 0, 0, 0.3),
      0 10px 20px rgba(0, 0, 0, 0.2)
    `,
  };

  return (
    <Link
      href={url}
      className={`
        absolute cursor-pointer group
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.y * 100}%`,
        left: `${position.x * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className="absolute w-full h-full rounded-full bg-gray-50"
      />
      <div
        className={`
          absolute w-full h-full flex items-center justify-center rounded-full text-white font-bold
          transition-transform duration-300 ease-in-out
          group-hover:scale-110
          [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]
          ${nodeType === 'secondary' ? 'text-xs p-2 [word-break:break-all]' : ''}
        `}
        style={sphereStyle}
      >
        {label}
      </div>
    </Link>
  );
}
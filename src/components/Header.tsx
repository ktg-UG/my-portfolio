// src/components/Header.tsx

"use client"; // ★★★ この行を必ずファイルの先頭に追加 ★★★

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ★ インポートを追加

// ヘッダーに表示するナビゲーションリンクのデータを定義
const navLinks = [
  { name: 'ホーム', href: '/' },
  { name: 'プロフィール', href: '/profile' },
  { name: '個人開発', href: '/development' },
  { name: '研究', href: '/research' },
  { name: 'インターン', href: '/internship' },
];

export default function Header() {
  // 現在のページのパス（URL）を取得する
  const pathname = usePathname();

  return (
    // ★ ヘッダー全体のスタイルを大幅に変更
    <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ロゴ */}
          <Link href="/" className="font-bold text-xl text-gray-800 dark:text-gray-100">
            My Portfolio
          </Link>

          {/* ナビゲーションメニュー */}
          <nav>
            <ul className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
              {navLinks.map((link) => {
                // 現在のパスとリンクのパスが一致するかどうかを判定
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      // ★ isActiveに応じてスタイルを動的に変更
                      className={`
                        px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActive
                          ? 'text-sky-600 dark:text-sky-400' // アクティブなリンクのスタイル
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white' // 通常リンクのスタイル
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}
// src/components/Header.tsx

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          My Portfolio
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-blue-500">ホーム</Link></li>
            <li><Link href="/profile" className="hover:text-blue-500">プロフィール</Link></li>
            <li><Link href="/development" className="hover:text-blue-500">個人開発</Link></li>
            <li><Link href="/research" className="hover:text-blue-500">研究</Link></li>
            <li><Link href="/internship" className="hover:text-blue-500">インターン</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
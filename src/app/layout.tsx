import type { Metadata } from "next";
// 以前のフォント設定はそのまま活かします
import { Inter, Noto_Sans_JP } from "next/font/google";
// ★ 修正点: globals.cssがインポートされていることを確認
import "./globals.css";
// ★ 修正点: 背景コンポーネントをインポート
import BackgroundSpheres from "@/components/BackgroundSpheres";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-noto-sans-jp' });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoSansJp.variable} font-sans`}>
        {/* ★ 修正点: 背景コンポーネントをここに配置 */}
        <BackgroundSpheres />
        {/* メインのコンテンツは背景の上に表示される */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
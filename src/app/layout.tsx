import type { Metadata } from "next";
// ★ 変更点: Google Fontsをインポート
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

// ★ 変更点: フォント設定を追加
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
      {/* ★ 変更点: フォント変数をbodyに適用 */}
      <body className={`${inter.variable} ${notoSansJp.variable} font-sans`}>{children}</body>
    </html>
  );
}
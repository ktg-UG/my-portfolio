// src/app/development/[slug]/page.tsx

import { getDevelopmentData, getAllDevelopmentIds } from '@/lib/developments';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const devData = await getDevelopmentData(params.slug);
  return {
    title: devData.title,
  };
}

// 静的生成のためのパスを定義
export async function generateStaticParams() {
    const paths = getAllDevelopmentIds();
    return paths;
}

export default async function DevelopmentPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const devData = await getDevelopmentData(slug);

  return (
    <div className="bg-white dark:bg-gray-900 pt-24 min-h-screen">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <p className="text-base font-semibold text-sky-600 dark:text-sky-400 tracking-wide uppercase">
            Development
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {devData.title}
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
            公開日: <time dateTime={devData.publishedAt}>{devData.publishedAt}</time>
          </p>
          <div className="mt-6 flex justify-center space-x-4">
              {devData.siteUrl && (
                  <Link href={devData.siteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
                      サイトを見る
                  </Link>
              )}
              {devData.githubUrl && (
                  <Link href={devData.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                      GitHub
                  </Link>
              )}
          </div>
        </header>
        
        {/* Markdownの内容がHTMLとして出力される部分 */}
        <div 
          className="prose prose-stone dark:prose-invert prose-lg max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ __html: devData.contentHtml }} 
        />
      </article>
    </div>
  );
}

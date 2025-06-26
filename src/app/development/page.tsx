import Link from 'next/link';
import { getSortedDevelopmentsData, DevelopmentData } from '@/lib/developments';

export default function DevelopmentPage() {
  const allDevelopments: DevelopmentData[] = getSortedDevelopmentsData();

  return (
    <div className="container mx-auto pt-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">個人開発</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          学習した技術のアウトプットとして作成したアプリケーションです。
        </p>
      </div>

      <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
        {allDevelopments.map((dev: DevelopmentData) => (
          <Link key={dev.id} href={`/development/${dev.id}`} className="flex flex-col rounded-lg shadow-lg overflow-hidden group">
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" src={dev.imageUrl} alt={dev.title} />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                    {dev.tags.map((tag: string) => (
                        <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{dev.title}</h3>
              </div>
              <div className="mt-6 flex items-center">
                <div className="text-sm font-medium text-gray-500">
                  <time dateTime={dev.publishedAt}>{dev.publishedAt}</time>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
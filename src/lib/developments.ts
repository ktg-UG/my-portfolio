// src/lib/developments.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 開発実績データの型定義
export type DevelopmentData = {
  id: string;
  title: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
  [key: string]: any;
};

// 'src/developments' ディレクトリのパス
const developmentsDirectory = path.join(process.cwd(), 'src/developments');

// 全ての開発実績データを日付順に取得する
export function getSortedDevelopmentsData(): DevelopmentData[] {
  const fileNames = fs.readdirSync(developmentsDirectory);
  const allDevelopmentsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(developmentsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title,
      publishedAt: matterResult.data.publishedAt,
      imageUrl: matterResult.data.imageUrl,
      tags: matterResult.data.tags,
      ...matterResult.data,
    };
  });

  return allDevelopmentsData.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 動的ルーティングのためのパス一覧を取得
export function getAllDevelopmentIds() {
  const fileNames = fs.readdirSync(developmentsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

// IDに基づいて単一の開発実績データを取得
export async function getDevelopmentData(id: string) {
  const fullPath = path.join(developmentsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // データとHTMLを返す
  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; publishedAt: string; githubUrl?: string; siteUrl?: string }),
  };
}
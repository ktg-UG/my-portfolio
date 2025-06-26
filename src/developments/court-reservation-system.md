---
title: 'コート予約システム'
publishedAt: '2024-05-15'
imageUrl: '/images/development-placeholder.png'
tags: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS']
githubUrl: 'https://github.com/your-username/your-repo'
siteUrl: 'https://your-service.example.com'
---

## 概要

このアプリケーションは、テニスコートの空き状況をリアルタイムで確認し、簡単に予約することができるWebシステムです。ユーザー認証機能を備え、マイページから自身の予約状況を確認することも可能です。

## 開発の背景

友人たちとテニスをする際に、公共施設のコート予約が電話のみで非常に不便だと感じていました。空き状況の確認も煩雑だったため、Web上で視覚的に分かりやすく、スムーズに予約まで完結できるシステムがあれば便利だと考え、開発に着手しました。

## 主な機能

- ユーザー登録・ログイン機能 (Firebase Authentication)
- コートの空き状況カレンダー表示
- 予約機能・キャンセル機能
- 予約履歴の確認（マイページ）
- お知らせ機能

## 技術構成

- **フロントエンド**: Next.js, React, TypeScript, Tailwind CSS
- **バックエンド/DB**: Firebase (Authentication, Firestore, Cloud Functions)
- **デプロイ**: Vercel

## 工夫した点・苦労した点

リアルタイムでの空き状況の反映にこだわり、Firebaseのリアルタイムリスナーを活用しました。誰かが予約すると、他のユーザーの画面にも即座に反映される仕組みです。
また、複雑な予約ロジック（複数時間帯の同時予約など）と、Firestoreのデータ構造の設計に最も時間を要しました。
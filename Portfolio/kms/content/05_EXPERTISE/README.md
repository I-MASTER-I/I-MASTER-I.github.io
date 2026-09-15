---
index: 5
navLabel: Expertise
href: /expertise
enabled: true
pageEyebrow: TECHNICAL KNOWLEDGE BASE
pageTitle: Expertise
pageDescription: 실무에서 축적한 설계, 구현, 트러블슈팅과 운영 지식을 Markdown 기술 문서로 기록합니다.
terminalPath: ~/expertise
counterLabel: ARTICLES
explorerTitle: KNOWLEDGE EXPLORER
recentTitle: RECENT ARTICLES
featuredTitle: FEATURED
allArticlesLabel: ALL ARTICLES
articleCountLabel: ARTICLES
updatedLabel: UPDATED
createdLabel: CREATED
readLabel: READ ARTICLE
modalSourceLabel: LOCAL MARKDOWN / EXPERTISE
modalCloseLabel: ESC TO CLOSE
fullArticleLabel: OPEN FULL ARTICLE
emptyLabel: NO ARTICLES
searchPlaceholder: Search title, summary, tags...
searchLabel: SEARCH
boardIndexLabel: 'NO'
boardUpdatedLabel: UPDATED
boardCategoryLabel: CATEGORY
boardArticleLabel: ARTICLE
boardTagsLabel: TAGS
pageSize: 10
previousLabel: PREV
nextLabel: NEXT
pageLabel: PAGE
---


# 05_EXPERTISE — Technical Knowledge Base

`Expertise`는 단순 기술 스택 소개 페이지가 아니라 이 사이트의 **기술 블로그 / Engineering Knowledge Base**입니다.

## Directory Architecture

```text
05_EXPERTISE/
├── README.md
├── 01_MICROSOFT_FABRIC/
│   ├── README.md
│   └── *.md
├── 02_KUBERNETES_AKS/
│   ├── README.md
│   └── *.md
├── 03_AZURE_CLOUD/
│   ├── README.md
│   └── *.md
├── 04_SECURITY_GOVERNANCE/
│   ├── README.md
│   └── *.md
├── 05_NETWORK/
│   ├── README.md
│   └── *.md
└── 06_DEVOPS_AUTOMATION/
    ├── README.md
    └── *.md
```

그룹은 폴더의 `README.md` Front Matter에서 자동 발견합니다. React에 그룹명을 하드코딩하지 않습니다.

## Group README

```yaml
---
id: microsoft-fabric
type: expertise-group
title: Microsoft Fabric
description: Fabric 관련 기술 문서
order: 1
enabled: true
---
```

새 그룹을 만들 때 `NN_GROUP/README.md`를 추가하면 Explorer에 자동 등록됩니다.

## Article

```yaml
---
id: fabric-capacity-autoscale
type: expertise
title: Microsoft Fabric Capacity Dynamic Autoscale
group: microsoft-fabric
category: Microsoft Fabric
createdDate: "2026-07-01"
updatedDate: "2026-09-15"
featured: true
summary: Fabric Capacity 사용률 기반 Autoscale 설계 및 운영 기록.
tags:
  - Microsoft Fabric
  - AKS
  - FinOps
relatedProjects:
  - fabric-dynamic-autoscale
---

## Overview
## Architecture
## Implementation
## Troubleshooting
## Lessons Learned
## References
```

### Date policy

기술 글은 `createdDate`, `updatedDate`를 `YYYY-MM-DD`로 관리합니다. 목록은 `updatedDate` 최신순으로 자동 정렬됩니다.

### URL / Modal

- `/expertise` — Knowledge Explorer + 최근 글 목록
- Explorer의 문서 클릭 — Markdown Modal
- `OPEN FULL ARTICLE` — `/expertise/[slug]`
- `/expertise/[slug]` — 공유 가능한 정식 기술 글 URL

### Source of Truth

문서 제목, 그룹, 카테고리, 태그, 날짜, 요약, 본문은 Markdown에서 관리합니다.
TSX는 그룹 탐색, 검색, Modal, 상세 페이지 렌더링만 담당합니다.

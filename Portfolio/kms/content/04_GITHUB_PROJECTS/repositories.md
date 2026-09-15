---
owner: min-ser
title: GitHub Repositories
description: Public repositories synchronized from GitHub.
repositories:
  - repo: SpringWebProject
    featured: false
    fallbackTitle: Bitcamp Spring Web Project
    fallbackDescription: Java/JSP/Spring training projects including SB_Mall and disCount.
    fallbackLanguage: Java
  - repo: www.kccistc.net
    featured: false
    fallbackTitle: KCCIST Learning Archive
    fallbackDescription: KCCIST big data platform training notes and exercises.
    fallbackLanguage: Python
  - repo: KCCIST_2TH_JSP
    featured: false
    fallbackTitle: KCCIST COVID Web Project
    fallbackDescription: Web-based COVID-19 information sharing project.
    fallbackLanguage: Java
  - repo: KCCIST_FINALPROJECT
    featured: true
    fallbackTitle: Deep Learning Stock Prediction Service
    fallbackDescription: Final training project for deep-learning based stock prediction.
    fallbackLanguage: Python
  - repo: KFQ
    featured: false
    fallbackTitle: KFQ AI Learning Archive
    fallbackDescription: Korea Foundation for Quality AI developer training notes and exercises.
    fallbackLanguage: Python
  - repo: KFQ_AI_2TH_DJANGO
    featured: false
    fallbackTitle: KFQ Django Web Project
    fallbackDescription: Django web project from KFQ AI developer training.
    fallbackLanguage: Python
  - repo: autonomous-surveillance-robot
    featured: true
    fallbackTitle: Autonomous Surveillance Robot
    fallbackDescription: Final AI project combining computer vision and monitoring service.
    fallbackLanguage: Python
  - repo: fabric-capacity-autoscaling-patterns
    featured: true
    fallbackTitle: Fabric Capacity Autoscaling Patterns
    fallbackDescription: Microsoft Fabric Capacity autoscaling patterns and reference implementations.
    fallbackLanguage: Python
  - repo: fabric-notebook-cicd
    featured: true
    fallbackTitle: Fabric Notebook CI/CD
    fallbackDescription: Microsoft Fabric Notebook CI/CD automation and deployment patterns.
    fallbackLanguage: Python
  - repo: Validation-Gate
    featured: true
    fallbackTitle: Validation Gate
    fallbackDescription: Validation-oriented engineering project and public implementation artifact.
    fallbackLanguage: TypeScript
---

이 파일에 Repository 이름을 추가하면 `/github` 페이지에서 GitHub Public API를 통해 정보를 읽어 표시합니다.

`owner`는 공통 GitHub 계정입니다.

각 Repository는 아래처럼 추가합니다.

```yaml
- repo: repository-name
  featured: true
  fallbackTitle: Optional fallback title
  fallbackDescription: Optional fallback description
  fallbackLanguage: Optional fallback language
```

GitHub API 조회가 일시적으로 실패하거나 Rate Limit에 걸리더라도 fallback 정보로 카드가 유지됩니다.

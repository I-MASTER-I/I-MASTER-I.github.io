---
index: 3
navLabel: Projects
href: /projects
enabled: true
pageEyebrow: PROJECT INDEX
pageTitle: Projects
pageDescription: Cloud, Platform, Kubernetes, Fabric, DevOps, Security 및 운영 과정에서 수행한 프로젝트와 기술 작업입니다.
terminalPath: ~/projects
counterLabel: RECORDS
detailEyebrow: PROJECT RECORD
---

# 03_PROJECTS

수행 프로젝트와 기술 과제를 상세 기록합니다. **1 Project = 1 Markdown**.

## 샘플
```yaml
---
id: project-id
type: project
title: Project Title
startDate: "2026-01"
endDate: "2026-03"
status: completed
skills:
  - Azure
  - AKS
relatedCareer: company-client
---

## 01 OVERVIEW
## 02 BACKGROUND
## 03 REQUIREMENTS
## 04 ARCHITECTURE
## 05 IMPLEMENTATION
## 06 TROUBLESHOOTING
## 07 RESULT
## 08 LESSONS
```

## Career Timeline 연결

Project가 특정 Career 기간에 속하면 Front Matter에 `careerId`를 지정합니다.

```yaml
careerId: megazone
startDate: "2026-07-01"
endDate: "2026-09-01"
```

`careerId`는 `02_CAREER/*.md`의 `id`와 일치해야 합니다.

Career 화면에서는 Project 파일 목록을 별도로 하드코딩하지 않습니다.
`careerId` 관계를 자동 조회하고 `startDate` 기준 최신순으로 표시합니다.

---
index: 2
navLabel: Career
href: /career
enabled: true
pageEyebrow: CAREER
pageTitle: Career
pageDescription: 회사 경력과 전문교육 이력을 프로젝트와 함께 하나의 시간축으로 관리합니다.
terminalPath: ~/career
counterLabel: RECORDS
detailEyebrow: CAREER DETAIL
timelineTitle: CAREER & TRAINING JOURNEY
timelineDescription: 기본 화면은 회사 경력만 표시하며, 필터를 통해 전문교육 이력을 같은 시간축에 함께 표시할 수 있습니다.
filterCareerLabel: 경력만
filterTrainingLabel: 경력 + 교육이수
presentLabel: PRESENT
projectLabel: PROJECTS
trainingBadgeLabel: TRAINING
careerBadgeLabel: CAREER
trainingModalSourceLabel: LOCAL MARKDOWN / TRAINING
trainingDetailLabel: OPEN TRAINING PAGE
emptyProjectLabel: NO LINKED PROJECTS
careerModalSourceLabel: LOCAL MARKDOWN / CAREER
projectModalSourceLabel: LOCAL MARKDOWN / PROJECT
modalCloseLabel: ESC TO CLOSE
careerDetailLabel: OPEN CAREER PAGE
projectDetailLabel: OPEN PROJECT PAGE
---


# 02_CAREER

회사/조직 단위 경력을 관리합니다. **1 Career = 1 Markdown**.

## 샘플
```yaml
---
id: company-client
type: career
company: COMPANY
client: CLIENT
position: Azure Cloud Engineer
roles:
  - Cloud Engineer
  - Azure SME
startDate: "2026-01"
endDate: ""
status: ongoing
skills:
  - Azure
  - Kubernetes
featured: true
---

## Overview
## Responsibilities
## Achievements
## Environment
```

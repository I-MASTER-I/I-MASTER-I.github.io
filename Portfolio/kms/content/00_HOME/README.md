---
index: 0
navLabel: Home
href: /
enabled: true
pageEyebrow: PROFILE / HOME
pageTitle: 김민서
pageDescription: Azure Cloud AI Engineer의 경력, 기술, 프로젝트와 자격 정보를 한 화면에서 참조합니다.
terminalPath: ~/home
---

# 00_HOME

Home의 번호는 **Hero를 제외한 실제 콘텐츠 Section 기준**으로 관리합니다.

```text
HERO / CURRENT IDENTITY       ↔ 01-hero.md (index: 0)
01 / RESUME PROFILE           ↔ 02-profile.md
02 / CAREER DESCRIPTION       ↔ 03-career-description.md
03 / CORE CAPABILITIES        ↔ 04-expertise.md
04 / SELECTED PROJECTS        ↔ 05-projects.md
```

Resume Profile은 경력 · 학력 · 자격증 · 수상 · 병역의 기본 이력 정보를 원본 Markdown에서 조합합니다.

Career Description은 `02_CAREER`의 모든 활성 Career Markdown을 최신순으로 자동 조회합니다.
각 Career 아래에는 `03_PROJECTS`에서 동일한 `careerId`를 가진 Project를 최신순으로 연결합니다.
HOME 설정에 특정 회사 ID를 작성하지 않습니다.

Home Section의 실제 데이터는 각 Career / Profile / Project Markdown이 Source of Truth이며 TSX에 경력 데이터를 하드코딩하지 않습니다.

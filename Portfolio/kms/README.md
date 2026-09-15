# 김민서 Web Resume

> **Version 0.1.29 — TOS Korea Career Content
>
> 김민서의 경력, 프로젝트, 기술 경험과 기술 기록을 장기적으로 관리하기 위한 Markdown 기반 Web Resume입니다.

---

## 1. 프로젝트 목적

일반적인 이력서 화면을 기본으로 하되, PDF/문서 이력서의 분량 제한 때문에 표현하기 어려운 프로젝트와 기술 경험까지 상세 페이지에서 확인할 수 있도록 설계합니다.

화면은 **Professional Cloud Engineer + Infrastructure / Terminal UI**를 디자인 방향으로 사용합니다.  
내부 콘텐츠는 Markdown으로 관리하여 향후 새로운 회사, 프로젝트, 자격, 학력 및 기술 기록이 추가되어도 React 페이지 코드를 직접 수정하지 않는 구조를 목표로 합니다.

### 핵심 원칙

- 일반적인 Professional Resume가 사이트의 첫 인상이어야 합니다.
- Career와 Project 데이터는 UI 코드에 하드코딩하지 않습니다.
- 새로운 경력과 프로젝트는 Markdown 파일 추가 방식으로 관리합니다.
- 프로젝트는 대표 사례만 남기지 않고 세부 프로젝트와 기술 작업까지 기록할 수 있습니다.
- Front Matter는 정렬·검색·관계 연결용 데이터로 사용합니다.
- Markdown Body는 상세 기술 내용을 자유롭게 작성하는 영역입니다.
- Career → Project → Skill → Archive가 서로 연결될 수 있는 구조로 확장합니다.

---

## 2. 사용 기술

| 영역 | 기술 | 용도 |
|---|---|---|
| Framework | Next.js 15 | Web Resume Application |
| UI | React 19 | Component 기반 화면 구성 |
| Language | TypeScript | 타입 안정성 및 콘텐츠 모델 정의 |
| Routing | Next.js App Router | Career / Project 상세 Route |
| Content | Markdown | 경력 및 프로젝트 원본 데이터 |
| Metadata | YAML Front Matter | ID, 기간, Skill, 관계 데이터 |
| Parser | gray-matter | Markdown Front Matter 파싱 |
| Renderer | react-markdown | Markdown Body 렌더링 |
| Styling | CSS | Resume / Terminal / Infrastructure UI |
| Source Control | Git | 버전 관리 |
| Deployment | GitHub Pages 예정 | 정적 Web Resume 배포 |

현재 v0.1.17은 별도의 UI Framework나 CSS Framework에 종속되지 않습니다.

---

## 3. 아키텍처

```text
Markdown Content
       │
       ▼
  gray-matter
       │
       ├── Front Matter
       │      │
       │      ├── 정렬
       │      ├── 관계
       │      ├── Skill
       │      └── 상태
       │
       └── Markdown Body
              │
              ▼
        react-markdown
              │
              ▼
        Next.js Pages
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
    Career  Projects  Archive
```

사이트의 콘텐츠와 애플리케이션을 분리합니다.

```text
content/ = Resume Data
src/     = Resume Application
```

따라서 새로운 경력이 생겨도 가능한 한 `src/`를 수정하지 않고 `content/`만 변경하는 것을 원칙으로 합니다.

---

## 4. 디렉토리 구조

```text
kim-minseo-career/
│
├── content/
│   ├── home/
│   ├── career/
│   ├── projects/
│   ├── portfolio/
│   ├── education/
│   ├── certifications/
│   ├── archive/
│   └── README.md
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── career/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── expertise/
│   │   ├── credentials/
│   │   ├── archive/
│   │   ├── about/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── content/
│   │   │   └── MarkdownView.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   │
│   ├── lib/
│   │   └── content.ts
│   │
│   └── types/
│       └── content.ts
│
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### `content/`

Web Resume의 실제 데이터입니다.

#### `content/02_CAREER/`

회사/조직 단위의 경력을 저장합니다.

```text
content/02_CAREER/2025-megazone-amorepacific.md
```

#### `content/03_PROJECTS/`

개별 프로젝트 및 기술 작업을 저장합니다.

프로젝트 규모와 관계없이 독립적으로 상세 기록할 수 있습니다.

```text
content/03_PROJECTS/fabric-dynamic-autoscale.md
content/03_PROJECTS/fabric-cicd.md
content/03_PROJECTS/fabric-security-governance.md
```


공개 가능한 포트폴리오 결과물을 Markdown으로 관리합니다.

지원 metadata:

- `title`
- `category`
- `summary`
- `status`
- `skills`
- `cover`
- `links.github`
- `links.demo`
- `links.website`
- `links.docs`
- `relatedProjects`

외부 링크 값이 없으면 UI에 표시하지 않습니다.

### `content/01_PROFILE/EDUCATION/`

학력 데이터를 관리하기 위한 영역입니다.

#### `content/01_PROFILE/CERTIFICATIONS/`

자격증 데이터를 관리하기 위한 영역입니다.

#### `content/06_ARCHIVE/`

GitHub Repository, Architecture, 기술 연구, 개인 프로젝트 및 기타 기술 자료를 연결하기 위한 영역입니다.

---

## 5. 애플리케이션 디렉토리

### `src/app/`

Next.js App Router 페이지입니다.

### `src/app/page.tsx`

Web Resume Home입니다.

Profile, Current Career, Expertise, Project Preview 등을 표시합니다.

### `src/app/career/`

전체 Career Timeline과 상세 Career 페이지를 담당합니다.

```text
/career
/career/{slug}
```

### `src/app/projects/`

전체 Project Index와 Project Detail을 담당합니다.

```text
/projects
/projects/{slug}
```

### `src/components/layout/`

사이트 전체에서 사용하는 Header / Footer 등 Layout Component입니다.

### `src/components/content/`

Markdown 렌더링 등 콘텐츠 표시 Component입니다.

### `src/lib/content.ts`

Markdown Content Engine의 핵심입니다.

역할:

- Markdown 파일 탐색
- Front Matter Parsing
- Markdown Body 추출
- 날짜 기준 정렬
- slug 기반 상세 문서 조회

### `src/types/content.ts`

Markdown Front Matter와 Content Document의 TypeScript Type을 정의합니다.

---

## 6. 실행 방법

### 요구 환경

권장:

```text
Node.js 20+
npm 10+
```

### 설치

```bash
npm install
```

### 개발 서버

```bash
npm run dev
```

브라우저에서 다음 주소를 확인합니다.

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
```

---

## 7. 새로운 경력 추가

React 코드를 수정하지 않습니다.

다음 파일을 생성합니다.

```text
content/02_CAREER/YYYY-company.md
```

예:

```md
---
id: company-2028
type: career
company: New Company
position: Cloud Platform Architect
startDate: "2028-03"
endDate:
status: ongoing
featured: true
skills:
  - Azure
  - Kubernetes
---

## Overview

경력 개요를 작성합니다.

## Responsibilities

- 담당 업무
- 담당 업무

## Achievements

- 주요 성과
- 주요 성과
```

### 날짜 작성 규칙

날짜는 YAML의 숫자/Date 자동 변환을 방지하기 위해 문자열 사용을 권장합니다.

```yaml
startDate: "2028-03"
endDate: "2030-05"
```

현재 재직 중이라면:

```yaml
endDate:
status: ongoing
```

---

## 8. 새로운 프로젝트 추가

파일을 생성합니다.

```text
content/03_PROJECTS/project-name.md
```

예:

```md
---
id: fabric-example
type: project
title: Microsoft Fabric Example Project
career: megazone-amorepacific
startDate: "2026-09"
endDate:
status: ongoing
skills:
  - Microsoft Fabric
  - Azure
  - Python
---

## Overview

프로젝트 개요

## Background

프로젝트가 시작된 배경

## Requirements

요구사항

## Architecture

구성 및 아키텍처

## Implementation

실제 구현 내용

## Troubleshooting

발생한 문제와 해결 과정

## Result

결과

## Lessons

프로젝트를 통해 얻은 기술적 교훈
```

모든 Heading이 필수는 아닙니다. Markdown Body는 프로젝트 특성에 따라 자유롭게 작성할 수 있습니다.

---

## 9. Career와 Project 연결

Project Front Matter에서 Career ID를 지정합니다.

```yaml
career: megazone-amorepacific
```

Career 파일:

```yaml
id: megazone-amorepacific
```

향후 이 ID를 기준으로 Career Detail에서 해당 경력에 포함된 Project를 자동 조회하도록 확장합니다.

---

## 10. Markdown 작성 원칙

Front Matter는 시스템에서 사용하는 구조화 데이터입니다.

```yaml
---
id:
type:
title:
startDate:
skills:
---
```

Markdown Body는 사람이 읽는 상세 내용입니다.

```md
## Overview

...

## Architecture

...
```

Front Matter에 긴 설명을 작성하지 않습니다.

반대로 정렬, 관계, 상태 등에 필요한 데이터를 Markdown 본문에만 작성하지 않습니다.

---

## 11. ID / 파일명 규칙

ID는 가능한 한 영문 소문자와 `-`를 사용합니다.

권장:

```text
fabric-dynamic-autoscale
aks-platform
fabric-cicd
megazone-amorepacific
```

비권장:

```text
Project01
Fabric Dynamic Autoscale
프로젝트1
```

파일명도 ID와 동일하게 유지하는 것을 권장합니다.

```text
fabric-dynamic-autoscale.md
```

---

## 12. 프로젝트 상세 기록 원칙

Project Detail은 단순한 이력서 Bullet을 반복하는 공간이 아닙니다.

가능한 경우 다음 내용을 기록합니다.

```text
Overview
Background
Requirements
Role
Architecture
Implementation
Security
Network
Deployment
Operation
Troubleshooting
Incident
Decision
Result
Lessons
Related Links
```

다만 실제 프로젝트에 존재하지 않는 항목을 억지로 작성하지 않습니다.

회사 또는 고객사의 보안 정보, Credential, 내부 IP, Secret, Token 및 공개해서는 안 되는 상세 정보는 저장소에 기록하지 않습니다.

---

## 13. 현재 페이지

| Route | 역할 |
|---|---|
| `/` | Resume Home |
| `/career` | 전체 경력 |
| `/career/[slug]` | 경력 상세 |
| `/projects` | 전체 프로젝트 |
| `/projects/[slug]` | 프로젝트 상세 |
| `/portfolio` | 포트폴리오 목록 |
| `/portfolio/[slug]` | 포트폴리오 상세 |
| `/expertise` | 전문 기술 |
| `/profile` | 학력 / 자격 |
| `/archive` | 기술 Archive |
| `/about` | Profile |

---

## 14. 디자인 방향

키워드:

```text
Professional
Cloud Engineer
Infrastructure
Terminal
Technical
Minimal
Dark
```

단순한 Matrix/해커 테마가 아니라 Enterprise Engineer의 전문성을 유지하면서 Terminal 및 Infrastructure UI 요소를 제한적으로 사용합니다.

주요 UI 원칙:

- Dark Background
- Thin Border
- Monospace Metadata
- Cyan / Muted Green Accent
- 낮은 채도의 Text
- 번호 기반 Section
- Project Record Index
- 과도한 Gradient / Rounded Card 지양
- 기술 문서와 Resume 사이의 시각적 균형

---

## 15. 버전 정책

현재 버전:

```text
v0.1.17
```

초기 Foundation 단계에서는 구조와 UI를 빠르게 검증합니다.

예:

```text
v0.1.0  Initial Foundation
v0.1.17  UI Direction + Content Engine Fix
v0.1.17  Navigation / Project UX
v0.1.17  Career Data Migration
```

큰 구조 또는 기능 단계가 안정화되면 Minor Version을 올립니다.

---

## 16. Git 운영 예시

```bash
git add .
git commit -m "docs: add new project record"
git push origin main
```

장기 목표는 다음 흐름입니다.

```text
Markdown 작성
      ↓
Git Commit
      ↓
Git Push
      ↓
GitHub Actions
      ↓
Next.js Static Build
      ↓
GitHub Pages
```

즉 경력 추가를 위해 Application Source Code를 수정하지 않는 운영 방식을 목표로 합니다.

---

## 17. 보안 주의사항

이 Repository를 Public으로 운영할 경우 특히 주의합니다.

절대 Commit하지 않을 항목:

- Password
- API Key
- Access Token
- Client Secret
- 실제 Credential
- 내부 시스템 접속 정보
- 공개가 제한된 고객 정보
- 민감한 Network 정보
- 개인정보
- 회사 내부 문서 원본

환경변수가 필요한 경우 `.env.local` 등을 사용하고 Git에서 제외합니다.

---

## 18. v0.1.17 변경사항

### Added

- Professional / Infrastructure / Terminal 기반 Home UI
- 새로운 Header Brand
- Project Record Index UI
- Expertise Grid
- Project Metadata UI
- 상세 README / 운영 가이드

### Fixed

`startDate: 2026`처럼 YAML에서 숫자로 파싱되는 경우 `localeCompare()` 오류가 발생하던 문제를 수정했습니다.

정렬 시 값을 문자열로 정규화합니다.

```ts
String(meta.startDate ?? "")
```

Markdown에서도 날짜를 문자열로 작성하는 규칙을 추가했습니다.

### Retained

- Markdown Content Architecture
- Career / Project Dynamic Content Loader
- App Router 기반 상세 페이지
- 향후 확장 가능한 Content Directory

---

## 19. 다음 개발 후보

v0.1.17 화면 검토 후 우선순위를 결정합니다.

- Active Navigation
- Mobile Navigation Drawer
- Career Timeline 재설계
- Project Search / Category Filter
- Skill Taxonomy
- Career ↔ Project 자동 관계
- Expertise 자동 생성
- Education / Certification Markdown Loader
- Archive Loader
- Architecture Image 지원
- Project 내부 TOC
- Previous / Next Project
- 전체 경력 데이터 Migration
- 전체 프로젝트 데이터 Migration
- GitHub Pages 자동 배포
- SEO / OpenGraph / Sitemap
- RSS 또는 Change Log
- Markdown Schema Validation

---

## 20. 장기 목표

이 프로젝트의 최종 목표는 특정 시점의 이력서를 한 번 만들어 두는 것이 아닙니다.

Career, Project, Skill, Credential 및 Technical Record를 Markdown으로 지속적으로 추가하고, Web Resume가 이를 자동으로 구조화하여 보여주는 개인 Career Platform으로 발전시키는 것을 목표로 합니다.


---

## Portfolio 추가 방법

새로운 공개 결과물은 다음 위치에 추가합니다.

```text
```

Portfolio는 Project와 목적이 다릅니다.

```text
Project   = 실제 수행한 프로젝트/기술 작업의 상세 기록
Portfolio = 외부에 공개 가능한 결과물, GitHub, Demo, Web, Docs
```

예:

```yaml
---
id: example
type: portfolio
title: Example Portfolio
category: Cloud Architecture
summary: 공개 결과물 설명
startDate: "2026"
status: published
skills:
  - Azure
links:
  github: "https://..."
  demo:
  website:
  docs:
relatedProjects:
  - related-project-id
---
```

`public/images/portfolio/`는 향후 Portfolio Cover/Screenshot을 저장하기 위한 디렉토리입니다.

### v0.1.17 Added

- `Portfolio` Header Navigation
- `/portfolio` Portfolio Index
- `/portfolio/[slug]` Detail Route
- GitHub / Demo / Website / Docs 외부 링크 metadata
- Related Project metadata
- Portfolio Cover metadata 및 이미지 디렉토리 기반
- Portfolio 작성 가이드


---

## Home Markdown Architecture

v0.1.17부터 Home의 문구와 노출 대상을 `src/app/page.tsx`에 직접 작성하지 않습니다.

```text
content/00_HOME/
├── 01-hero.md
├── 01-hero.md (Current Identity 포함)
├── 03-expertise.md
├── 04-projects.md
└── 05-portfolio.md
```

### 역할

`01-hero.md`

Home Hero 자체 콘텐츠를 관리합니다.

`01-hero.md (Current Identity 포함)`

Home에 표시할 현재 Career ID를 지정합니다.

```yaml
careerId: megazone-amorepacific
```

실제 회사명, 고객사, 직무, Role, Skill은 Career 원본에서 읽습니다.

```text
content/02_CAREER/*.md
```

`03-expertise.md`

Home에 표시할 Expertise 항목을 관리합니다.

`04-projects.md`

Home에 노출할 Project ID 목록만 관리합니다.

```yaml
projects:
  - fabric-dynamic-autoscale
  - fabric-cicd
```

실제 제목, 기술, 날짜 등의 정보는 `content/03_PROJECTS/*.md`가 Source of Truth입니다.

`05-portfolio.md`

Home에 노출할 Portfolio ID 목록을 관리합니다.

### 데이터 원칙

```text
Home Markdown
     │
     ├── Career ID ───────→ content/02_CAREER/
     ├── Project IDs ─────→ content/03_PROJECTS/
```

Home은 데이터를 복제하지 않고 기존 원본 콘텐츠를 조합하는 Aggregator 역할을 합니다.

---

## Home Component 구조

```text
src/components/home/
├── HeroSection.tsx
├── CurrentCareerSection.tsx
├── ExpertiseSection.tsx
├── ProjectSection.tsx
└── PortfolioSection.tsx
```

따라서 역할을 다음과 같이 분리합니다.

```text
Content 변경  → Markdown
디자인 변경   → React Component / CSS
데이터 조회   → src/lib/content.ts
```

---

## Active Navigation

v0.1.17부터 Header가 현재 URL을 확인하여 현재 위치를 표시합니다.

예:

```text
/projects
/projects/fabric-cicd
```

두 URL 모두 Header에서 `PROJECTS`가 Active 상태가 됩니다.

상세 페이지에서도 부모 메뉴가 유지됩니다.

Active 상태는 Cyan Text + 하단 Line으로 표현합니다.

---

## v0.1.17 변경사항

### Added

- `content/00_HOME/` Home Content Source
- Hero Markdown 기반 출력
- Current Career ID Reference
- Project ID Reference
- Portfolio ID Reference
- Home 전용 React Components
- `getDocumentById()`
- `getHomeSection()`
- `getDocumentsByIds()`
- Header Active Navigation
- 상세 Route에서도 Parent Navigation Active 유지

### Changed

- Home `MEGAZONE / AMOREPACIFIC` 하드코딩 제거
- Home의 직무 / 역할 / Skill 하드코딩 제거
- Home Selected Project 하드코딩 제거
- Home을 Content Aggregator 구조로 변경


---

## v0.1.17 변경사항

### Home Hero 재설계

기존 대형 이름 중심 Hero를 제거하고 `Engineer Identity Card` 형태로 변경했습니다.

Hero는 `content/00_HOME/01-hero.md`의 `careerId`를 기준으로 `content/02_CAREER/*.md`를 조회합니다.

표시 항목:

- 이름 / 영문명
- Current Company
- Client
- Current Role
- Position / Role
- Period
- 주요 Skill
- Active Status

현재 경력 정보는 Home에 중복 작성하지 않습니다.

### Current Section 통합

기존 별도 `CURRENT` 섹션은 Home에서 제거하고 Hero Identity Card에 통합했습니다.

### Core Capabilities

기존 Expertise Home Section을 `Core Capabilities` 형태로 재설계했습니다.

### Visual Direction

- Dark Enterprise / Hacker UI
- Cyan Accent
- Fine Grid Background
- Terminal Metadata
- Thin Border
- Status Indicator
- Identity Card
- Angular Capability Card
- Compact Featured Project Card


---

## v0.1.17 Content Directory Index

콘텐츠 디렉토리는 화면의 Navigation 순서와 동일하게 정렬합니다.

```text
content/
├── 00_HOME/
├── 02_CAREER/
├── 03_PROJECTS/
├── 05_EXPERTISE/
├── 01_PROFILE/EDUCATION/
├── 01_PROFILE/CERTIFICATIONS/
└── 06_ARCHIVE/
```

### 왜 숫자 Prefix를 사용하는가

파일 탐색기에서 알파벳순으로 보더라도 실제 웹의 정보구조 순서와 동일하게 보이게 하기 위함입니다.

```text
00 HOME
01 CAREER
02 PROJECTS
03 PORTFOLIO
04 EXPERTISE
05 CREDENTIALS
06 ARCHIVE
```

URL Route는 기존대로 유지합니다.

```text
/career
/projects
/portfolio
/expertise
/profile
/archive
```

즉, 디렉토리명은 콘텐츠 관리 편의를 위한 물리 구조이고 사용자에게 노출되는 URL과는 분리됩니다.

### v0.1.17 Readability

Cyber Identity 디자인은 유지하되 작은 글자를 전반적으로 확대했습니다.

조정 대상:

- Header Brand / Navigation
- Hero 설명
- Identity Card Label / Value
- Stack
- Status / Metadata
- Core Capabilities
- Project / Portfolio Card
- Tag
- Mobile Typography

터미널/해커 느낌을 유지하면서 실제 경력 사이트로 읽기 편하도록 조정했습니다.


---

## v0.1.17 GitHub Repository Sync

Portfolio에 GitHub Repository를 등록하고 공개 Repository 메타데이터를 자동 조회하는 샘플 기능을 추가했습니다.

### URL

```text
/github
```

Portfolio 메인 화면에는 `GitHub Repository Sync` 진입 패널이 추가됩니다.

### Repository 등록

파일:

```text
content/04_GITHUB_PROJECTS/repositories.md
```

예시:

```yaml
---
owner: min-ser
repositories:
  - repo: fabric-capacity-autoscaling-patterns
    featured: true
    fallbackTitle: Fabric Capacity Autoscaling Patterns
    fallbackDescription: Microsoft Fabric Capacity autoscaling patterns.
    fallbackLanguage: Python
---
```

새 Repository를 노출할 때 UI Component를 수정할 필요가 없습니다.

`repositories`에 Repository 이름을 추가하면 됩니다.

### Data Source

`src/lib/github.ts`

GitHub Public REST API:

```text
GET /repos/{owner}/{repo}
```

다음 정보를 자동 조회합니다.

- Repository Name
- Description
- Primary Language
- Star Count
- Fork Count
- Topics
- Updated Time
- Pushed Time
- License
- Homepage
- Archived Status
- GitHub URL

공개 Repository 조회에는 Token이 없어도 동작할 수 있지만 GitHub의 비인증 API Rate Limit이 적용됩니다.

API 호출 실패 / 네트워크 오류 / Rate Limit / Repository 미존재 상황에서는 Markdown에 지정한 fallback 정보로 페이지를 유지합니다.

### Source of Truth

```text
Markdown
  └─ 어떤 Repository를 Portfolio에 노출할지 결정

GitHub
  └─ Repository의 현재 공개 Metadata 제공

Web UI
  └─ 두 데이터를 결합하여 표시
```

### Responsive / Interactive Foundation

향후 고급 반응형 UI를 확장하기 위한 기반도 이번 버전에 포함했습니다.

- Desktop 3-column repository grid
- Tablet 2-column grid
- Mobile 1-column stack
- Responsive GitHub status panel
- Client-side Repository filter
- Hover elevation / scan interaction
- Flexible typography and long repository name wrapping
- Mobile footer restructuring
- `prefers-reduced-motion` 지원

향후 추가 가능한 UI:

- Card expand interaction
- Repository 상세 Drawer
- Animated architecture graph
- Scroll-aware Navigation
- Mobile bottom navigation
- GitHub language visualization
- Commit activity visualization
- README preview
- Repository sorting/filtering


---

## v0.1.17 Information Architecture

GitHub Projects를 Portfolio 하위 페이지에서 분리해 독립적인 1st-class 섹션으로 변경했습니다.

```text
content/
├── 00_HOME/
├── 02_CAREER/
├── 03_PROJECTS/
├── 04_GITHUB_PROJECTS/
├── 05_EXPERTISE/
├── 01_PROFILE/EDUCATION/
├── 01_PROFILE/CERTIFICATIONS/
└── 06_ARCHIVE/
```

Navigation:

```text
00 HOME
01 CAREER
02 PROJECTS
03 PORTFOLIO
04 GITHUB
05 EXPERTISE
06 CREDENTIALS
07 ARCHIVE
```

GitHub URL:

```text
/github
```

Repository 등록:

```text
content/04_GITHUB_PROJECTS/repositories.md
```

## Home Dashboard

Home의 상단은 다음 세 영역으로 재설계했습니다.

```text
IDENTITY
CURRENT IDENTITY + VISUAL
GITHUB PROJECTS SYNC
```

Current Identity의 이미지:

```text
public/images/current-identity-workspace.png
```

이미지는 UI 데이터와 분리된 정적 Asset이므로 나중에 동일한 파일명으로 교체하거나
Markdown 설정값으로 이미지 경로를 외부화할 수 있습니다.

## Responsive Direction

이번 버전부터 단순 축소가 아닌 구성 변화 방식의 Responsive Layout을 적용합니다.

```text
Desktop
  Identity / Current Identity / GitHub Dashboard

Medium
  Identity + Current Identity
  GitHub Horizontal Panel

Tablet
  Identity
  Current Identity

Mobile
  Identity
  Current Identity
  Current Image
  GitHub Stream
```

`prefers-reduced-motion` 기반 접근성 정책은 기존 GitHub 카드 인터랙션과 함께 유지합니다.


---

## v0.1.17 GitHub README Viewer

GitHub Repository 카드에 `README` 버튼을 추가했습니다.

동작:

```text
Repository Card
  ├── README
  │    └── GitHub README API
  │          └── Markdown Modal
  └── GITHUB ↗
```

지원 UX:

- README 클릭 후 원격 Markdown 로드
- Modal 내부 Markdown 렌더링
- ESC 닫기
- 배경 클릭 닫기
- X 닫기
- Modal 활성화 중 Body Scroll Lock
- 모바일 Full Screen Modal
- Code Block Horizontal Scroll
- Table Horizontal Scroll
- README 미존재 상태 처리
- GitHub 바로가기

Current Identity 메인 이미지는 텍스트가 사진과 겹쳐 보이던 영역을 제거하고
새 Crop Asset으로 교체했습니다.

```text
public/images/current-identity-workspace.png
```

또한 Career Markdown의 Client 표시값을 단일 `AMOREPACIFIC`로 정리했습니다.

---

## v0.1.17 Final Content IA

```text
content/
├── 00_HOME/
├── 02_CAREER/
├── 03_PROJECTS/
├── 04_GITHUB_PROJECTS/
├── 05_EXPERTISE/
├── 01_PROFILE/
│   ├── EDUCATION/
│   └── CERTIFICATIONS/
└── 06_ARCHIVE/
```

Navigation 번호 = 최상위 디렉토리 번호 = README 제목 번호를 유지합니다.

모든 영역에 작성 가이드/샘플을 두며, 빈 영역의 샘플 Markdown은 `sample: true`, `enabled: false`로 실제 콘텐츠와 구분합니다.


---

## v0.1.17 Home Index Synchronization

Home의 화면 Section 번호와 `content/00_HOME` 파일 번호를 완전히 동일하게 정리했습니다.

```text
SCREEN                         CONTENT
01 HERO / CURRENT IDENTITY  =  00_HOME/01-hero.md
02 CORE CAPABILITIES        =  00_HOME/03-expertise.md
03 SELECTED PROJECTS        =  00_HOME/04-projects.md
04 SELECTED PORTFOLIO       =  00_HOME/05-portfolio.md
```

기존 `02-current.md`는 제거했습니다.

Current Identity는 별도 Home Section이 아니라 Hero 안에 포함되어 있으므로,
`01-hero.md`의 `careerId`가 `02_CAREER`의 현재 경력 Markdown을 참조합니다.

앞으로 Home Section의 규칙은 다음과 같습니다.

```text
Visible Section Index
        =
00_HOME Filename Index
        =
Front Matter order
```


---

## v0.1.17 Markdown-First Architecture

원칙:

```text
Career / Education / Certification / Project / Portfolio / Expertise content -> Markdown
Navigation / Page Header / Home Section index / labels / links / image path -> Markdown Front Matter
React / TSX -> rendering and interaction only
```

Home:

```text
01-hero.md       -> 01 HERO + CURRENT IDENTITY
02-profile.md    -> 02 RESUME PROFILE
03-expertise.md  -> 03 CORE CAPABILITIES
04-projects.md   -> 04 SELECTED PROJECTS
05-portfolio.md  -> 05 SELECTED PORTFOLIO
```

Top-level Navigation은 각 `NN_DIRECTORY/README.md`의 `index`, `navLabel`, `href`, `enabled`를 읽어 자동 구성합니다. Header에 메뉴 배열을 하드코딩하지 않습니다.

`enabled: false` 또는 `sample: true` Markdown은 Content Loader에서 실제 화면 데이터로 노출하지 않습니다.

Home Resume Profile은 개인정보 전체를 노출하는 인사카드가 아니라 이력서 작성에 필요한 경력, 학력, 자격증, 병역 복무기간만 요약합니다. 주소, 전화번호, 생년월일, 보훈/장애, 지원사항은 기본 Profile에 포함하지 않습니다.


### Hardcoding audit

페이지 제목, 설명, Navigation, Home Section index/title/action, Hero 문구/이미지, 상세 페이지 Eyebrow/Metadata label은 Markdown Front Matter에서 읽습니다. 코드에 남는 문자열은 loading/error/ESC 같은 UI 동작 상태와 renderer semantics로 제한합니다.

---

## v0.1.17 Horizontal Resume Profile

Home의 Resume Profile을 세로 카드 4열 구조에서 **이력서형 가로 Table 구조**로 변경했습니다.

```text
CAREER
PERIOD | COMPANY | POSITION / ROLE | STACK / FOCUS

EDUCATION
PERIOD | SCHOOL | MAJOR / DEGREE | GPA

CERTIFICATIONS
DATE | CERTIFICATION | ISSUER

MILITARY
PERIOD | SERVICE PERIOD
```

데이터 Source of Truth는 기존 Markdown을 그대로 유지합니다. 이번 변경은 화면 표현 방식만 수정한 것이며 Career/Education/Certification 데이터는 TSX에 하드코딩하지 않습니다.

Desktop에서는 넓은 가로 컬럼을 사용하고, 작은 화면에서는 컬럼을 억지로 세로 카드로 변형하지 않고 Table 자체를 가로 스크롤하여 컬럼 관계를 유지합니다.

---

## v0.1.17 Awards & Recognition

`01_PROFILE/AWARDS/`를 추가하고 수상/선정 이력을 **1 Award = 1 Markdown**으로 관리합니다.

Home Resume Profile에는 `DATE | AWARD / RECOGNITION | RESULT | ISSUER` 가로 테이블로 표시합니다. 데이터는 TSX에 하드코딩하지 않고 Markdown에서 읽습니다.

---

## v0.1.17 Profile IA & Full Date Index

이력서 기본 데이터를 `Credentials`가 아닌 최상위 `01_PROFILE` 도메인으로 재구성했습니다.

```text
00_HOME
01_PROFILE
  ├── 01_EDUCATION
  ├── 02_CERTIFICATIONS
  ├── 03_AWARDS
  └── 04_MILITARY
02_CAREER
03_PROJECTS
04_GITHUB_PROJECTS
05_EXPERTISE
06_ARCHIVE
```

### Date policy

- 기본 저장 형식: `YYYY-MM-DD`
- 원본 이력서가 `YYYY-MM`까지만 제공하면 `DD=01`로 정규화
- 모든 목록은 날짜 메타데이터(`date`, `issuedDate`, `startDate`) 기준 최신순 자동 정렬
- 동일 날짜는 제목/이름/학교/회사명 기준으로 안정 정렬
- 화면의 순번은 정렬 결과를 기준으로 `01, 02, 03...` 부여

Profile과 Home Resume Profile은 동일한 Markdown 데이터를 사용하며 화면 컴포넌트에 학력/자격/수상/병역 데이터를 하드코딩하지 않습니다.

---

## v0.1.17 Markdown Modal & Career Journey

### Local Markdown Modal

Home Career의 회사명을 클릭하면 해당 `02_CAREER/*.md`의 Front Matter + Markdown body를 기반으로 상세 Modal을 표시합니다.
GitHub README Modal과 시각 언어를 공유하지만 Career 내용은 원격 API가 아니라 로컬 Markdown Source of Truth를 사용합니다.

### Career Journey

`/career`는 회사 카드 목록 대신 시간축 기반 Career Journey로 변경했습니다.

```text
02_CAREER/*.md
       │ id
       │
03_PROJECTS/*.md
       └── careerId
```

Career와 Project 관계는 코드에 하드코딩하지 않습니다.
Project의 `careerId`를 Career의 `id`와 연결하며, Loader의 날짜 정렬 결과를 사용해 최신 항목이 위에 표시됩니다.

### Hardcoding policy

경력명, 프로젝트명, 기간, 기술, Modal 제목/상태 라벨, Timeline 제목/설명, Profile Table 컬럼 라벨은 Markdown Front Matter에서 관리합니다.
TSX는 레이아웃과 렌더링 동작만 담당합니다.

---

## v0.1.17 Profile Modal Fix

- `MarkdownDetailModal`의 `document` prop이 브라우저 전역 `document`를 가리던 이름 충돌을 제거했습니다.
- Home Resume Profile의 Career / Education / Certifications / Awards / Military 모든 행을 클릭 가능한 Markdown Modal로 통일했습니다.
- `02`, `01.01`, `01.02` 같은 내부 디렉토리/구조 인덱스를 Home의 Profile 소제목에서 제거했습니다.
- Profile 소제목, 컬럼명, Modal UI Label은 계속 `00_HOME/02-profile.md` Front Matter에서 관리합니다.
- 개별 이력 내용은 각 Markdown 파일이 Source of Truth이며 TSX에 도메인 데이터를 하드코딩하지 않습니다.


---

## v0.1.17 Technical Knowledge Base

### IA

```text
00_HOME
01_PROFILE
02_CAREER
03_PROJECTS
04_GITHUB_PROJECTS
05_EXPERTISE
06_ARCHIVE
```

`Portfolio`는 독립 도메인에서 제거했습니다. 수행 결과는 Projects, 공개 코드는 GitHub, 기술 지식은 Expertise가 담당합니다.

### Expertise = Technical Knowledge Base

`05_EXPERTISE`는 Git 기반 기술 블로그를 대체할 수 있도록 그룹 디렉토리 + Markdown Article 구조로 변경했습니다.

- 왼쪽 Knowledge Explorer
- 그룹 Accordion
- 그룹별 Markdown 문서 자동 발견
- Article 제목 클릭 시 Markdown Modal
- Recent Articles
- Featured 표시
- 제목/요약/태그 검색
- 그룹 필터
- `updatedDate` 최신순 정렬
- `/expertise/[slug]` 공유 가능한 정식 글 URL
- 모바일 Responsive Explorer
- 새 그룹/글 추가 시 React 수정 불필요

그룹과 Article의 모든 콘텐츠 데이터는 Markdown Front Matter가 Source of Truth입니다.

---

## v0.1.18 Expertise Board & Pagination

- Expertise 그룹 필터는 같은 그룹 버튼을 다시 클릭하면 해제되어 ALL ARTICLES로 복귀합니다.
- Article Card UI를 게시판형 가로 Row UI로 변경했습니다.
- Article 목록은 Loader의 `updatedDate` 최신순 정렬을 그대로 사용합니다.
- 화면 Index는 정렬 결과를 기준으로 `001`부터 자동 계산합니다. Markdown에 index를 작성하지 않습니다.
- 기본 `pageSize: 10`이며 Article 수에 따라 페이지가 자동 생성됩니다.
- 검색/그룹 필터 변경 시 페이지를 자동으로 1페이지로 초기화합니다.
- 각 Row 클릭 시 기존 Markdown Modal이 열리고 Full Article URL도 유지됩니다.
- Board Header/페이지 크기/PREV/NEXT 등의 UI 문자열은 `05_EXPERTISE/README.md` Front Matter에서 관리합니다.

---

## v0.1.19 Home Career Description

- Home Hero는 콘텐츠 Section 번호에서 제외합니다.
- `RESUME PROFILE`을 `01`로 수정했습니다.
- `02 / CAREER DESCRIPTION`을 신규 추가했습니다.
- Career Description은 Career + 연결 Project Markdown을 조합하여 경력기술서 요약을 표시합니다.
- Project 행 클릭 시 Markdown Modal이 열립니다.
- 기존 Core Capabilities / Selected Projects는 각각 03 / 04로 재정렬했습니다.

---

## v0.1.20 Complete Career Description

- HOME `02 / CAREER DESCRIPTION`의 단일 `careerId: megazone` 의존성을 제거했습니다.
- `02_CAREER`의 모든 활성 Markdown을 자동 조회하고 `startDate` 최신순으로 표시합니다.
- 각 Career 아래에 `03_PROJECTS`의 동일 `careerId` Project를 최신순으로 자동 연결합니다.
- Career Header 클릭 → 해당 Career Markdown Modal.
- Project Row 클릭 → 해당 Project Markdown Modal.
- Project가 없는 Career도 누락하지 않고 `NO LINKED PROJECTS` 상태로 표시합니다.
- 회사/경력/프로젝트 데이터는 TSX에 하드코딩하지 않습니다.

---

## v0.1.21 Home Section Boundary Normalization

- HOME의 `01 / RESUME PROFILE`, `02 / CAREER DESCRIPTION`, `03 / CORE CAPABILITIES`를 동일한 독립 Section 규격으로 통일했습니다.
- `02 / CAREER DESCRIPTION`에 적용되던 별도 `padding-top: 20px`를 제거하여 Profile 내부에 붙어 보이던 문제를 수정했습니다.
- 모든 번호 Section의 상단 구분선은 공통 `.section` 폭(`--max`)을 사용합니다.
- `01 / RESUME PROFILE` Heading의 시각적 크기/강조를 상향했습니다.
- Career Description의 데이터 구조는 v0.1.20의 `02_CAREER 전체 자동 조회` 방식을 그대로 유지합니다.

---

## v0.1.22 Wide Home Section Standard

- v0.1.21에서 좁은 Resume Profile 폭을 공통 기준으로 잡은 변경을 바로잡았습니다.
- HOME 번호 Section의 공통 기준을 넓은 Canvas(`--home-section-wide`)로 변경했습니다.
- `01 Resume Profile`, `02 Career Description`, `03 Core Capabilities`, `04 Selected Projects`가 동일한 넓은 폭을 사용합니다.
- 각 Section의 구분선과 내부 콘텐츠도 동일 Canvas 폭을 따릅니다.

---

## v0.1.23 Home Career Index

- HOME `02 / CAREER DESCRIPTION`을 상세 경력기술 표시 영역에서 경력 탐색용 Index로 단순화했습니다.
- Home에는 회사명과 해당 회사에 연결된 Project Title만 표시합니다.
- 기간, 고객사, Position, Role, Summary, Skills는 Home 목록에서 제거했습니다.
- 회사명 클릭 시 Career Markdown Modal, Project Title 클릭 시 Project Markdown Modal은 유지합니다.
- 상세 경력은 `/career`, 프로젝트 상세는 `/projects`가 담당합니다.
- `02_CAREER` 전체 자동 조회 및 `careerId` 기반 Project 자동 연결 구조는 그대로 유지합니다.

---

## v0.1.24 Unified Home Canvas

- v0.1.21~v0.1.22에서 누적된 Home 폭 보정 CSS를 제거했습니다.
- Home 전체에 `--home-canvas-max` / `--home-canvas-gutter` 하나만 사용하는 공통 Canvas를 적용했습니다.
- Hero, 01 Resume Profile, 02 Career Description, 03 Core Capabilities, 04 Selected Projects의 좌우 기준을 통일했습니다.
- 개별 Home Section에는 별도의 max-width를 두지 않습니다.
- Desktop Home Canvas는 기존 1240px보다 넓은 1480px 기준으로 확장했습니다.
- 모바일에서는 공통 gutter만 축소하며 동일한 구조를 유지합니다.
- v0.1.23의 Home Career Index 구조와 Markdown Modal 기능은 그대로 유지합니다.

---

## v0.1.25 Release Candidate

- 좌측 상단 Brand 옆에 `package.json`의 현재 버전을 자동 표시합니다. 별도 UI 하드코딩 없이 package version이 Source of Truth입니다.
- Next.js `output: export` 및 GitHub Pages용 `basePath / assetPrefix / trailingSlash`를 구성했습니다.
- `main` push 시 `.github/workflows/deploy-pages.yml`이 Validate → Build → GitHub Pages Deploy를 수행합니다.
- Career / Projects / Expertise 동적 상세 Route에 `generateStaticParams()`를 추가했습니다.
- `robots.txt`, `sitemap.xml`, 기본 Metadata, 404 UI를 추가했습니다.
- `scripts/validate-content.mjs`를 추가했습니다.
  - Markdown id 중복
  - YYYY-MM-DD 날짜 형식
  - Project의 존재하지 않는 careerId
  - Expertise의 존재하지 않는 group
  를 Build 전에 검사합니다.
- `public/.nojekyll`을 추가했습니다.

### 운영 흐름

```text
Markdown 추가/수정
→ npm run validate
→ git add / commit / push
→ GitHub Actions (npm install → validate → build)
→ Static Export
→ GitHub Pages Deploy
```

GitHub Repository Settings → Pages → Source는 `GitHub Actions`로 설정합니다.

---

## v0.1.26 Expertise Full Responsive Board

- Expertise 페이지를 일반 Portfolio Canvas에서 분리하여 화면 가로폭을 적극 활용하는 전용 Knowledge Board Workspace로 변경했습니다.
- `Expertise` 대형 Hero 타이틀을 일반 페이지 제목 크기(34~48px)로 축소했습니다.
- Knowledge Explorer는 250~300px 범위, 게시판은 나머지 화면 전체를 사용하는 반응형 2-column 구조입니다.
- 게시판의 본문/제목/카테고리/날짜/태그/검색 UI를 일반 웹 가독성 수준(11~16px)으로 확대했습니다.
- Desktop에서는 넓은 게시판, Tablet에서는 Explorer 폭 축소, Mobile에서는 Explorer를 상단 배치하고 게시판 컬럼 관계를 유지한 채 가로 스크롤합니다.
- Home/Profile/Career/Projects의 기존 Canvas에는 영향을 주지 않습니다.

---

## v0.1.27 Static GitHub README Fix

- GitHub Pages `output: export`와 호환되지 않던 `/api/github/readme` Next.js API Route를 제거했습니다.
- GitHub Repository README Modal은 브라우저에서 GitHub Public Contents API를 직접 호출합니다.
- `Accept: application/vnd.github.raw+json`으로 README 원문 Markdown을 받아 기존 Modal Renderer에 전달합니다.
- GitHub Pages에는 별도 Node/Next API Server가 필요하지 않습니다.
- v0.1.26 Expertise Full Responsive Knowledge Board 구조는 그대로 유지합니다.

---

## v0.1.28 Projects Markdown Modal

- `03 Projects` 목록의 프로젝트 클릭 동작을 상세 페이지 이동에서 대형 Markdown Modal로 변경했습니다.
- Project Markdown 본문을 기존 공통 Markdown Renderer로 그대로 표시합니다.
- Modal은 Desktop 최대 1500px / 90vh를 활용하고 내부 본문은 읽기 좋은 폭과 15px 글꼴을 사용합니다.
- ESC, 우측 상단 X, 배경 클릭으로 닫을 수 있습니다.
- 프로젝트 Row는 `<Link>`가 아닌 `<button>` 기반이므로 클릭 시 URL 이동이 발생하지 않습니다.
- 기존 `/projects/[slug]` 정적 상세 Route는 호환성을 위해 유지하지만 목록에서는 사용하지 않습니다.

---

## v0.1.29 TOS Korea Career Content

- `02_CAREER/2017-tos-korea.md`를 실제 수행 업무 기준으로 상세화했습니다.
- 실제 근무 기간은 `2017-12-01 ~ 2018-04-01`로 유지했습니다.
- 티오에스코리아 소속 / 글로벌텔레콤 업무 수행 / SK브로드밴드 성수 상황실이라는 근무 구조를 명확히 구분했습니다.
- 방송송출 관제, Main/Backup 신호 점검, TMR/STB/IRD/RF/WFM, 장애 대응 및 신호 절체, 신규 채널/Encoder 작업 점검 내용을 반영했습니다.
- 경력증명서의 별도 기재 기간이 아니라 실제 근무 기간을 사이트의 Career Source of Truth로 사용합니다.

## v0.1.30 — Rich Markdown Web Renderer
- Added GFM table rendering with responsive horizontal scrolling.
- Added Mermaid diagrams rendered as SVG with the dark career theme.
- Added reusable code blocks with language labels and copy controls.
- Added styled details/summary support for expandable technical notes.
- Applied the shared renderer to career/project/expertise modals, normal Markdown pages, and GitHub README modal.


## v0.1.32 — Professional Training Timeline

- `06_TRAINING` 신규 영역 추가: 비트캠프, 대한상공회의소 서울교육센터, 한국품질재단
- Training → Project → GitHub Repository 관계 추가 (`trainingId`)
- 교육 프로젝트 6개를 `03_PROJECTS`에 추가
- 교육 당시 Public GitHub Repository 7개를 GitHub Explorer에 등록
- Archive를 `07_ARCHIVE`로 이동하고 Navigation index 갱신
- 교육 상세 문서에 Mermaid Learning Journey / Repository Map / Final Project 구성도 적용


## v0.1.33 — Career + Training Unified Timeline

- Career 화면에 회사 경력과 Professional Training을 하나의 최신순 Timeline으로 통합
- Home / Profile Resume Profile에 Professional Training 표 추가
- 비트캠프, 대한상공회의소 서울교육센터, 한국품질재단 교육 이력 노출
- 대한상공회의소 교육기간과 과정 대표·우수상·대상·공로상 이력을 `trainingId` / `projectId`로 연결
- Training Project는 Career Timeline에서도 해당 교육기관 아래 표시

## v0.1.35 — Awards GitHub README integration

- Added a `GITHUB` column to Awards & Recognition on Home/Profile.
- Award Markdown can declare an optional `repository` URL in Front Matter.
- Awards linked to a GitHub repository expose a `README` button without leaving the page.
- The button reuses the shared GitHub README modal and rich Markdown renderer.
- Linked the KCCIST JSP web-project Excellence Award to `KCCIST_2TH_JSP`.
- Linked the KCCIST deep-learning Grand Prize to `KCCIST_FINALPROJECT`.
- Awards without a relevant repository remain visible with `—` in the GitHub column.


## v0.1.36 — Career / Training timeline filter
- Career 페이지의 기본 표시를 회사 경력만으로 변경했습니다.
- `경력만` / `경력 + 교육이수` 필터를 추가했습니다.
- `경력 + 교육이수` 선택 시 비트캠프, 대한상공회의소 서울교육센터, 한국품질재단을 회사 경력과 동일한 시간축에 날짜순으로 표시합니다.
- Training 항목의 상세 Markdown 및 연결 Project modal 동작은 기존 구조를 유지합니다.

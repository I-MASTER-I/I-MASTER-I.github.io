# Content Architecture

화면 Navigation Index와 최상위 Content Directory Index를 일치시킵니다.

```text
00 Home       ↔ 00_HOME
01 Profile    ↔ 01_PROFILE
02 Career     ↔ 02_CAREER
03 Projects   ↔ 03_PROJECTS
04 GitHub     ↔ 04_GITHUB_PROJECTS
05 Expertise  ↔ 05_EXPERTISE
06 Archive    ↔ 06_ARCHIVE
```

`01_PROFILE` 내부 역시 화면의 Profile 분류 순서와 일치합니다.

```text
01 Education       ↔ 01_EDUCATION
02 Certifications  ↔ 02_CERTIFICATIONS
03 Awards           ↔ 03_AWARDS
04 Military         ↔ 04_MILITARY
```

## Date rule

날짜는 `YYYY-MM-DD`를 기본으로 합니다. 원본에 일자가 없으면 `01`로 저장합니다.
목록은 날짜 기준 최신순으로 자동 정렬됩니다.

## Source of Truth

경력/학력/자격증/수상/병역/프로젝트/포트폴리오 데이터는 Markdown Front Matter가 Source of Truth입니다.
React 컴포넌트는 데이터를 렌더링하며 개별 이력 데이터를 직접 보유하지 않습니다.

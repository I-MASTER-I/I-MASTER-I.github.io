---
index: 4
navLabel: GitHub
href: /github
enabled: true
pageEyebrow: PUBLIC REPOSITORY / LIVE METADATA
pageTitle: GitHub Projects
pageDescription: 등록한 Public Repository의 최신 메타데이터와 README를 GitHub에서 읽어 표시합니다.
terminalPath: ~/github
counterLabel: REPOSITORIES
syncPanel:
  owner: OWNER
  registered: REGISTERED
  live: LIVE API
  mode: MODE
  modeValue: BUILD / SERVER FETCH
noticeLabel: SYNC_POLICY
notice: Repository 목록은 Markdown에서 관리하고 Description, Language, Stars, Forks, Topics,
  Updated, License 등의 공개 정보는 GitHub에서 가져옵니다. API 조회 실패 시 등록된 fallback 정보로 표시합니다.
backLabel: BACK TO HOME
backHref: /
---


# 04_GITHUB_PROJECTS

실제 GitHub Public Repository를 `/github` 페이지와 연결합니다.

## Repository 추가 샘플
```yaml
repositories:
  - repo: my-new-repository
    featured: true
    fallbackTitle: My New Repository
    fallbackDescription: GitHub API 실패 시 표시할 설명
    fallbackLanguage: Python
```

Repository 카드의 `README` 버튼은 원격 README.md를 Modal로 표시합니다.

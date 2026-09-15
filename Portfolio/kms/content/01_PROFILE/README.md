---
index: 1
navLabel: Profile
href: /profile
enabled: true
pageEyebrow: RESUME SOURCE / PROFILE
pageTitle: Profile
pageDescription: 이력서 작성 시 참조하는 학력, 전문교육 이수, 자격증, 수상 및 병역 기본 데이터를 관리합니다.
terminalPath: ~/profile
educationTitle: EDUCATION
educationColumns: [PERIOD, SCHOOL, MAJOR / DEGREE, GPA]
trainingTitle: PROFESSIONAL TRAINING
trainingColumns: [PERIOD, INSTITUTION, PROGRAM, FOCUS]
trainingLimit: 10
certificationTitle: CERTIFICATIONS
awardsTitle: AWARDS & RECOGNITION
militaryTitle: MILITARY SERVICE
gpaLabel: GPA
---

# 01_PROFILE

이력서의 기본 Profile Source of Truth입니다. 학력과 별도로 직업교육·전문교육 이수 이력은 `06_TRAINING`의 Markdown을 불러와 Home/Profile의 Professional Training 영역에 표시합니다.

```text
01_PROFILE/
├── 01_EDUCATION/
├── 02_CERTIFICATIONS/
├── 03_AWARDS/
├── 04_MILITARY/
└── README.md
```

## 날짜 규칙

모든 날짜는 가능한 한 `YYYY-MM-DD`를 사용합니다.
원본 자료에 일(day)이 없으면 사용자의 규칙에 따라 `DD=01`로 저장합니다.

각 목록은 날짜를 기준으로 자동 정렬하며 **최신 항목이 위**에 표시됩니다.

---
id: fabric-dynamic-autoscale
type: project
title: Microsoft Fabric Capacity Dynamic Autoscale
careerId: megazone
startDate: "2026-07-01"
endDate: "2026-09-01"
status: completed
featured: true
skills:
  - Microsoft Fabric
  - AKS
  - Kubernetes CronJob
  - EventHub
  - Python
  - FinOps
---

## Overview

Microsoft Fabric Capacity의 사용률을 기준으로 SKU를 동적으로 조정하기 위한 운영 자동화 프로젝트입니다.

## Problem

고정된 Capacity 운영만으로는 시간대별 사용량 변화와 비용 효율성을 함께 다루기 어렵습니다.

## Implementation

- 사용률 기반 Dynamic Autoscale 정책 설계
- AKS CronJob 기반 실행 구조
- Fabric EventHub 활용
- Scale Up / Scale Down 조건 및 운영 시간대 정책 적용
- 기존 스케줄 기반 제어와의 충돌 검토
- STG 검증 후 PRD 적용 및 모니터링

## Record policy

향후 실제 구현 구조, 정책 변화, 트러블슈팅, 운영 결과를 이 문서에 계속 보강합니다.

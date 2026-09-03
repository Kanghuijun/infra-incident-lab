# 2주차 실습 자료

사전 준비는 **병렬**, 모임 당일은 **직렬(릴레이)** 입니다.

```text
사전 준비  = 각자 다른 더미에서 자기 파트만 연습
모임 당일  = 하나의 실제 프로젝트를 Docker → Nginx → AWS 배포 → AWS Network 순서로 구축
```

---

## 누가 어떤 폴더를 쓰나

| 담당 | 폴더 | 시작 상태 | 당신이 할 일 |
|---|---|---|---|
| Docker | [01-dummy-docker](./01-dummy-docker) | 앱만 있음 | Dockerfile, compose, 네트워크 |
| Nginx | [02-dummy-nginx](./02-dummy-nginx) | Docker까지 있음 | Nginx Reverse Proxy |
| AWS 배포 | [03-dummy-aws-deploy](./03-dummy-aws-deploy) | Docker + Nginx | EC2에 올리기 |
| AWS Network | [04-dummy-aws-network](./04-dummy-aws-network) | 배포 가능한 앱 | VPC, SG, ALB |

각 폴더에는 두 파일이 있습니다.

- `README.md` — **지금 상태**를 실행하는 명령어
- `담당자_가이드.md` — **당신이 만들어야 하는 것**과 확인 방법

역할만 빠르게 보려면 [역할별_한눈에.md](./역할별_한눈에.md)를 보세요.

---

## 더미 앱이 무엇인가

네 더미는 모두 같은 작은 사이트 **StudyBoard** 입니다.

```text
Next.js  :3000
NestJS   :4000
MySQL    :3306
```

- 게시글 목록
- 글 등록 (프론트 → 백엔드 → MySQL)
- 헬스체크 `GET /health`, `GET /api/health`

차이점은 **어느 단계까지 이미 완성되어 있느냐** 뿐입니다.

---

## 사전 준비 (병렬)

서로 기다릴 필요 없습니다. 각자 자기 더미만 클론/복사해서 연습합니다.

```text
01  Docker 담당     Application만
02  Nginx 담당      Docker까지
03  AWS 배포 담당    Docker + Nginx까지
04  AWS Network 담당 EC2에 올릴 수 있는 상태
```

---

## 모임 당일 (릴레이)

더미를 쓰지 않습니다. **실제 공동 프로젝트** 하나를 이어받습니다.

```text
실제 웹사이트
        ↓
[Docker 담당]     Dockerfile / compose
        ↓
[Nginx 담당]      Reverse Proxy :80
        ↓
[AWS 배포 담당]    EC2 + docker compose up
        ↓
[AWS Network 담당] VPC / SG / ALB
        ↓
최종 서비스
```

앞 단계가 끝나지 못하면 비상용 [backup](./backup) 정상본으로 전환합니다.
정상이면 backup은 사용하지 않습니다.

```text
backup/docker-completed   Docker 완료본
backup/nginx-completed    Nginx 완료본
backup/deploy-ready       EC2에 바로 올릴 수 있는 본
```

---

## 최종 목표 구조

```text
Internet
   ↓
AWS Network (ALB)
   ↓
EC2
   ↓
Docker
   ↓
Nginx :80
   ├─ /       → Next.js
   └─ /api/   → NestJS
   ↓
Database
```

---

## 공통 주의

- 포트가 겹칩니다. 로컬 80 / 3000 / 4000 / 3306을 쓰는 더미는 **한 번에 하나만** 올리세요.
- 로컬 80 포트는 AWS 배포/Nginx 완료본에서 사용합니다.
- AWS 실습 후 EC2, ALB, EIP는 반드시 정리하세요.

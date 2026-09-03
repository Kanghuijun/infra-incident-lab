# AWS Network 담당용 Dummy Project

이 폴더는 **AWS Network 담당자 사전 연습용** 더미입니다.

애플리케이션, Docker, Nginx는 이미 완성되어 있고, EC2에 올리는 방법도 배포 더미와 같습니다.
당신의 초점은 **VPC / Subnet / Route Table / IGW / Security Group / ALB** 입니다.

---

## 현재 상태

```text
Application     ✅
Docker          ✅
Nginx           ✅
EC2 배포        ✅ 가능 (직접 올리거나 배포 담당 결과 사용)
AWS Network     ❌ 학습/구성 필요  ← 당신
```

목표 구조:

```text
Internet
   ↓
ALB
   ↓
EC2 :80
   ↓
Nginx
   ↓
Next.js / NestJS
```

필요하면 이후 Route53, ACM/HTTPS, RDS까지 확장합니다.

상세 숙제는 [담당자_가이드.md](./담당자_가이드.md)를 보세요.

---

## 이 더미를 로컬에서 확인

다른 더미가 80 포트를 쓰고 있으면 먼저 내리세요.

```bash
cd 04-dummy-aws-network
docker compose up -d --build
docker compose ps
```

```bash
curl http://localhost
curl http://localhost/health
curl http://localhost/api/health
```

브라우저: `http://localhost`

종료:

```bash
docker compose down
```

ALB 헬스체크는 `/health` 또는 `/` 를 쓰면 됩니다. Nginx가 둘 다 200을 반환하도록 이미 넣어 두었습니다.

- `/` → 프론트
- `/health` → 백엔드 health
- `/api/health` → 백엔드 health
- `/api/posts` → 게시글

---

## EC2에 올리는 방법

배포 과정은 `03-dummy-aws-deploy`와 동일합니다.
이미 배포 담당자가 올려 둔 EC2가 있으면 **앱을 다시 만들지 말고 그 인스턴스를 사용**하세요.

직접 올릴 때:

```bash
cd 04-dummy-aws-network
docker compose up -d --build
curl http://localhost/health
```

Security Group을 나중에 ALB 전용으로 바꿀 것이므로, 연습 초반에는 임시로 80을 열어 동작만 확인해도 됩니다.
최종 목표에서는 **80을 인터넷에 직접 열지 않고 ALB Security Group만 허용**합니다.

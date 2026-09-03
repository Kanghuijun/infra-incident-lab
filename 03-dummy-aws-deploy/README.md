# AWS 배포 담당용 Dummy Project

이 폴더는 **AWS 배포 담당자 사전 연습용** 더미 프로젝트입니다.

Docker와 Nginx Reverse Proxy는 이미 완성되어 있습니다.
VPC/ALB 같은 네트워크 설계는 AWS Network 담당 숙제입니다. 이 단계에서는 **EC2 한 대에 올려 접속되는 것**이 목표입니다.

---

## 현재 상태

```text
Application     ✅
Docker          ✅
Nginx           ✅
Reverse Proxy   ✅
AWS 배포        ❌  ← 당신이 할 것
```

목표 구조:

```text
Internet
   ↓
EC2 Public IP
   ↓
EC2 Host :80
   ↓
Docker Port Publish
   ↓
Nginx Container :80
   ↓
frontend / backend
```

상세 숙제는 [담당자_가이드.md](./담당자_가이드.md)를 보세요.

---

## 로컬에서 먼저 실행해보기

EC2에 올리기 전에, 본인 PC에서 이 더미가 이미 동작하는지 확인합니다.

### 요구 사항

- Docker Compose
- 호스트 포트 **80** 사용 가능

다른 더미(`02-dummy-nginx` 등)가 켜져 있으면 포트가 겹칩니다. 먼저 내리세요.

```bash
# 다른 더미를 켜 두었다면
cd ../02-dummy-nginx && docker compose down
```

### 실행

```bash
cd 03-dummy-aws-deploy
docker compose up -d --build
docker compose ps
```

컨테이너 4개가 떠야 합니다: `nginx`, `frontend`, `backend`, `database`

### 확인

```bash
curl http://localhost
curl http://localhost/health
curl http://localhost/api/health
curl http://localhost/api/posts
```

브라우저:

```text
http://localhost
```

프론트는 Nginx(80) 뒤로 붙어 있으므로 **3000/4000 포트를 직접 열지 않습니다.**
외부에서 볼 포트는 80뿐입니다.

### 로그

```bash
docker compose logs -f nginx
docker compose logs -f backend
```

### 종료

```bash
docker compose down
```

---

## EC2에 올릴 때 쓰는 핵심 명령 (요약)

자세한 순서는 담당자 가이드에 있습니다. 로컬과 같은 명령입니다.

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2 git
sudo usermod -aG docker ubuntu
# 로그아웃 후 재접속

cd 03-dummy-aws-deploy
docker compose up -d --build

curl http://localhost
curl http://localhost/api/health
```

본인 PC 브라우저:

```text
http://EC2_PUBLIC_IP
```

Security Group에서 인바운드 **22(SSH)**, **80(HTTP)** 를 본인 IP 또는 실습 범위로 열어둬야 합니다.

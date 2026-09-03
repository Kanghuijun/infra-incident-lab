# Docker 담당용 Dummy Project

이 폴더는 **Docker 담당자 사전 연습용** 더미 프로젝트입니다.

다른 담당자의 더미와 연결되어 있지 않습니다. 이 폴더만 사용하세요.

---

## 현재 상태

```text
Next.js   ✅  로컬 실행 가능 (:3000)
NestJS    ✅  로컬 실행 가능 (:4000)
MySQL     ✅  로컬(또는 임시 컨테이너) 필요 (:3306)
Docker    ❌  아직 없음  ← 당신이 만들 것
Nginx     ❌
AWS       ❌
```

목표 구조:

```text
Docker Network
├─ frontend :3000
├─ backend  :4000
└─ database :3306
```

해야 할 작업의 상세 내용은 [담당자_가이드.md](./담당자_가이드.md)를 보세요.

---

## 사전 요구 사항

- Node.js 20 이상 (`node -v`로 확인)
- npm
- MySQL 8 (로컬 설치 또는 아래 임시 컨테이너)
- Docker Desktop 또는 Docker Engine (연습 단계에서 설치)

---

## 1) 임시 MySQL 실행

아직 전체 Docker 구성은 숙제입니다. 앱을 먼저 돌려보기 위해서 **MySQL만** 잠시 띄웁니다.

이 명령은 Docker 숙제가 아닙니다. 전체 스택을 docker-compose로 묶는 것이 숙제입니다.

```bash
docker run --name studyboard-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_DATABASE=studyboard \
  -e MYSQL_USER=study \
  -e MYSQL_PASSWORD=study123 \
  -p 3306:3306 \
  -d mysql:8.0
```

기동 확인:

```bash
docker ps
docker logs studyboard-mysql
```

로그에 `ready for connections`가 보이면 됩니다.

MySQL을 이미 로컬에 설치했다면 컨테이너는 건너뛰고, `study / study123 / studyboard` 계정·DB만 만들어도 됩니다.

```bash
mysql -u root -p < database/init.sql
```

---

## 2) 백엔드 실행 (NestJS, 포트 4000)

새 터미널에서:

```bash
cd 01-dummy-docker/backend
cp .env.example .env
npm install
npm run start:dev
```

확인:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/health
curl http://localhost:4000/api/posts
```

기대 결과 예시:

```json
{"status":"ok","service":"studyboard-backend"}
```

---

## 3) 프론트엔드 실행 (Next.js, 포트 3000)

또 다른 터미널에서:

```bash
cd 01-dummy-docker/frontend
cp .env.example .env.local
npm install
npm run dev
```

브라우저:

```text
http://localhost:3000
```

화면에 Backend health가 **정상**이고, 게시글이 보이면 앱은 준비된 것입니다.

글 등록을 한 번 해보세요. MySQL까지 저장되는지 확인할 수 있습니다.

---

## 폴더 구조

```text
01-dummy-docker/
├─ frontend/          Next.js
├─ backend/           NestJS
├─ database/init.sql  MySQL 초기 계정/DB
├─ README.md          지금 이 파일 (실행 방법)
└─ 담당자_가이드.md    Docker로 묶는 숙제 설명
```

---

## 종료

```bash
# 프론트/백엔드 터미널에서 Ctrl+C

# 임시 MySQL을 썼다면
docker stop studyboard-mysql
docker rm studyboard-mysql
```

이후에는 임시 `docker run`이 아니라, 직접 작성한 `docker-compose.yml`로 전체를 올리고 내리세요.

```bash
docker compose down
```

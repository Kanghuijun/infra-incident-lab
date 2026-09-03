# Nginx 담당용 Dummy Project

이 폴더는 **Nginx 담당자 사전 연습용** 더미 프로젝트입니다.

Docker는 이미 완성되어 있습니다. Dockerfile을 처음부터 만들 필요는 없습니다.

---

## 현재 상태

```text
Docker     ✅
frontend   :3000
backend    :4000
database   :3306
Nginx      ❌  ← 당신이 추가할 것
AWS        ❌
```

목표 구조:

```text
Browser
   ↓
Nginx :80
   │
   ├─ /       → frontend:3000
   │
   └─ /api/   → backend:4000
```

상세 숙제는 [담당자_가이드.md](./담당자_가이드.md)를 보세요.

---

## 사전 요구 사항

- Docker Engine 또는 Docker Desktop
- `docker compose version` 이 동작할 것

포트 80, 3000, 4000, 3306이 비어 있어야 합니다.

---

## 현재 더미 실행 (Nginx 없이)

프로젝트 루트에서:

```bash
cd 02-dummy-nginx
docker compose up -d --build
```

첫 빌드는 수 분이 걸릴 수 있습니다.

상태 확인:

```bash
docker compose ps
docker compose logs -f
```

`frontend`, `backend`, `database` 가 모두 `running` / `healthy` 인지 봅니다.

확인 명령:

```bash
curl http://localhost:3000
curl http://localhost:4000/health
curl http://localhost:4000/api/health
curl http://localhost:4000/api/posts
```

브라우저:

```text
http://localhost:3000
```

게시글이 보이면 Docker 시작 상태는 정상입니다. 이제 Nginx를 추가하는 연습을 합니다.

---

## 네트워크 확인 (이미 구성되어 있음)

```bash
docker network ls
docker network inspect studyboard-nginx-dummy
```

세 컨테이너가 `studyboard-nginx-dummy`에 있어야 합니다.

컨테이너 이름 확인:

```bash
docker compose ps
```

서비스 이름은 `frontend`, `backend`, `database` 입니다. Nginx `proxy_pass`에는 이 이름을 사용합니다.

---

## 종료

```bash
docker compose down
```

DB 데이터까지 지우려면:

```bash
docker compose down -v
```

---

## 중요

이 더미를 실행한 뒤에는 **같은 네트워크에 Nginx 컨테이너를 추가**하는 것이 과제입니다.

완성본을 미리 보고 싶다면 모임 당일 비상용인 `backup/nginx-completed`를 참고할 수 있습니다.
사전 연습에서는 가능하면 직접 작성하세요.

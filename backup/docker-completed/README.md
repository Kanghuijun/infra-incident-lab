# backup/docker-completed

모임 당일 Docker 단계가 시간 안에 안 끝날 때 사용하는 **Docker 완료본**입니다.

Nginx는 없습니다. Nginx 담당자가 이어서 붙이면 됩니다.

```text
frontend :3000
backend  :4000
database :3306
Nginx    ❌
```

## 실행

다른 compose가 3000/4000/3306을 쓰고 있으면 먼저 내리세요.

```bash
cd backup/docker-completed
docker compose up -d --build
docker compose ps
```

```bash
curl http://localhost:3000
curl http://localhost:4000/health
curl http://localhost:4000/api/health
curl http://localhost:4000/api/posts
```

브라우저: `http://localhost:3000`

네트워크:

```bash
docker network inspect studyboard-backup-docker
```

## 종료

```bash
docker compose down
```

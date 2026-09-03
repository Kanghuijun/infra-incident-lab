# backup/nginx-completed

모임 당일 Nginx 단계가 시간 안에 안 끝날 때 사용하는 **Docker + Nginx 완료본**입니다.

AWS 배포 담당자가 이 폴더를 EC2에 그대로 올리면 됩니다.

```text
Internet / localhost
   ↓
Nginx :80
   ├─ /       → frontend:3000
   └─ /api/   → backend:4000
```

## 실행

포트 80이 비어 있어야 합니다.

```bash
cd backup/nginx-completed
docker compose up -d --build
docker compose ps
```

```bash
curl http://localhost
curl http://localhost/health
curl http://localhost/api/health
curl http://localhost/api/posts
```

브라우저: `http://localhost`

## 종료

```bash
docker compose down
```

EC2 배포 순서는 `03-dummy-aws-deploy/담당자_가이드.md`와 같습니다.

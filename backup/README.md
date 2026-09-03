# Backup — 모임 당일 비상용 정상본

사전 연습용 더미와 별개입니다.

모임 당일에는 실제 프로젝트를 릴레이로 이어갑니다.
앞 단계가 시간 안에 안 끝나면 **이 폴더의 정상본으로 전환**해서 다음 발표를 진행합니다.

정상적으로 진행되면 **backup은 사용하지 않습니다.**

```text
backup/
├─ docker-completed/   Docker까지 완료 (Nginx 없음)
├─ nginx-completed/    Docker + Nginx 완료
└─ deploy-ready/       EC2에 그대로 올려도 되는 본
```

---

## 언제 무엇을 쓰나

| 막힌 단계 | 전환 위치 | 다음 담당 |
|---|---|---|
| 실제 프로젝트 Docker가 안 됨 | `docker-completed` | Nginx 담당 |
| Nginx가 안 됨 | `nginx-completed` | AWS 배포 담당 |
| 배포 준비 파일이 깨짐 | `deploy-ready` | AWS 배포 / Network |

---

## docker-completed

```bash
cd backup/docker-completed
docker compose up -d --build
curl http://localhost:3000
curl http://localhost:4000/api/health
```

Nginx 담당자는 이 상태에서 컨테이너를 추가하면 됩니다.

---

## nginx-completed / deploy-ready

둘 다 Docker + Nginx가 들어 있는 동일한 실행 형태입니다.

```bash
cd backup/nginx-completed
docker compose up -d --build
curl http://localhost
curl http://localhost/api/health
```

EC2에 올릴 때도 같은 명령입니다. 자세한 배포 순서는 `03-dummy-aws-deploy/담당자_가이드.md`를 따르세요.

---

## 주의

- 포트 80 / 3000 / 4000 / 3306이 겹칠 수 있습니다. 다른 compose를 먼저 `down` 하세요.
- backup은 “정답 파일”이기도 하므로, 사전 연습 담당자는 가능하면 자기 더미에서 직접 작성한 뒤 막힐 때만 참고하세요.

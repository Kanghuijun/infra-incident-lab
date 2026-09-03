# backup/deploy-ready

모임 당일 실제 프로젝트 파일이 깨졌을 때 **EC2에 바로 올릴 수 있는 본**입니다.

내용물은 `nginx-completed`와 같고, 용도만 “배포 비상용”입니다.

## 로컬 확인

```bash
cd backup/deploy-ready
docker compose up -d --build
curl http://localhost
curl http://localhost/health
curl http://localhost/api/health
```

## EC2에서

프로젝트를 EC2에 복사한 뒤:

```bash
cd deploy-ready
docker compose up -d --build
curl http://localhost
curl http://localhost/api/health
```

본인 PC:

```text
http://EC2_PUBLIC_IP
```

상세 절차는 `03-dummy-aws-deploy/담당자_가이드.md`를 따르세요.
Network 담당자는 이 인스턴스에 ALB만 붙이면 됩니다.

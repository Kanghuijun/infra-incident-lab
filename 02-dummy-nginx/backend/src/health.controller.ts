import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {
  @Get("health")
  rootHealth() {
    return { status: "ok", service: "studyboard-backend" };
  }

  @Get("api/health")
  apiHealth() {
    return { status: "ok", service: "studyboard-backend" };
  }
}

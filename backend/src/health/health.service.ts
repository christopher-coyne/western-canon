import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Result } from "src/common/DTO/result";

@Controller("health")
export class HealthController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: "Health check" })
  check() {
    return Result.ok("OK");
  }
}

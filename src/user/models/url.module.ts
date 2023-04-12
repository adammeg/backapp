import { Module } from "@nestjs/common";
import { UsersController } from "../controllers/url";

@Module({
  controllers: [UsersController],
})
export class UrlModule {}
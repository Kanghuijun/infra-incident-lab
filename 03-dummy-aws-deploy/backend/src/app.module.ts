import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthController } from "./health.controller";
import { PostEntity } from "./posts/post.entity";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      username: process.env.DB_USER || "study",
      password: process.env.DB_PASSWORD || "study123",
      database: process.env.DB_NAME || "studyboard",
      entities: [PostEntity],
      synchronize: true,
      retryAttempts: 20,
      retryDelay: 3000,
    }),
    PostsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

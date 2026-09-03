import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostEntity } from "./post.entity";

@Injectable()
export class PostsService implements OnModuleInit {
  constructor(
    @InjectRepository(PostEntity)
    private readonly posts: Repository<PostEntity>,
  ) {}

  async onModuleInit() {
    const count = await this.posts.count();
    if (count === 0) {
      await this.posts.save([
        this.posts.create({
          title: "2주차 실습에 오신 것을 환영합니다",
          content: "이 글은 더미 데이터베이스에서 가져온 것입니다.",
        }),
        this.posts.create({
          title: "프론트-백엔드-DB 연결 확인",
          content: "글 등록 버튼을 누르면 MySQL까지 데이터가 저장됩니다.",
        }),
      ]);
    }
  }

  findAll() {
    return this.posts.find({ order: { id: "DESC" } });
  }

  create(title: string, content: string) {
    return this.posts.save(this.posts.create({ title, content }));
  }
}

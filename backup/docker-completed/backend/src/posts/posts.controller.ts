import { Body, Controller, Get, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  list() {
    return this.postsService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.postsService.create(body.title, body.content);
  }
}

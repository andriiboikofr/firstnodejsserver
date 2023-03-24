import { Get, Route, Tags, Post as PostMethod, Body, Path } from "tsoa";
import { Post } from "../models";
import {
  getPost,
  createPost,
  IPostPayload,
  getPosts,
  deletePost,
  updatePost,
  IExistingPostPayload,
} from "../repositories/post.repository";

@Route("posts")
@Tags("Post")
export default class PostController {
  @Get("/")
  public async getPosts(): Promise<Array<Post>> {
    return getPosts();
  }

  @PostMethod("/")
  public async createPost(@Body() body: IPostPayload): Promise<Post> {
    return createPost(body);
  }

  @Get("/:id")
  public async getPost(@Path() id: string): Promise<Post | null> {
    return getPost(Number(id));
  }

  @PostMethod("/delete")
  public async deletePost(@Body() id: number): Promise<Post | null>{
    return deletePost(Number(id));
  }

  @PostMethod("/update")
  public async updatePost(@Body() body: IExistingPostPayload): Promise<Post | null>{
    return updatePost(body);
  }
}

//Add delete and Update methods.
//Use Interconnected models
//Change deprecated methods with new more relevant ones.
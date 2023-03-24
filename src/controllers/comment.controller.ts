import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Comment } from "../models";
import {
  getComment,
  createComment,
  ICommentPayload,
  getComments,
  deleteComment,
  updateComment,
  IExistingCommentPayload,
} from "../repositories/comment.repository";

@Route("comments")
@Tags("Comment")
export default class CommentController {
  @Get("/")
  public async getComments(): Promise<Array<Comment>> {
    return getComments();
  }

  @Post("/")
  public async createComment(@Body() body: ICommentPayload): Promise<Comment> {
    return createComment(body);
  }

  @Get("/:id")
  public async getComment(@Path() id: string): Promise<Comment | null> {
    return getComment(Number(id));
  }

  @Post("/delete")
  public async deleteComment(@Body() id: number): Promise<Comment | null>{
    return deleteComment(Number(id));
  }

  @Post("/update")
  public async updateComment(@Body() body: IExistingCommentPayload): Promise<Comment | null>{
    return updateComment(body);
  }
}

//Add delete and Update methods.
//Use Interconnected models
//Change deprecated methods with new more relevant ones.
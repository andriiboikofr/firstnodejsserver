import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../models";
import {
  getUsers,
  createUser,
  IUserPayload,
  getUserById,
  deleteUser,
  updateUser,
  IExistingUserPayload,
} from "../repositories/user";

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers();
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    return createUser(body);
  }

  @Get("/:id")
  public async getUserById(@Path() id: string): Promise<User | null> {
    return getUserById(Number(id));
  }

  @Post("/delete")
  public async deleteUser(@Body() id: number): Promise<User | null>{
    return deleteUser(Number(id));
  }

  @Post("/update")
  public async updateUser(@Body() body: IExistingUserPayload): Promise<User | null>{
    return updateUser(body);
  }
}

//Add delete and Update methods.
//Use Interconnected models
//Change deprecated methods with new more relevant ones.
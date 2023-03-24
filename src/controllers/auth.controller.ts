import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import {
    signUp, 
    logIn, 
    ILoginPayload, 
    ISignUpPayload} from "../repositories/auth.repository"


@Route("auth")
@Tags("User")
export default class AuthController{
    @Post("/signup")
    public async signUp(@Body() body: ISignUpPayload) {
      return signUp(body);
    }

    @Post("/login")
    public async logIn(@Body() body: ILoginPayload) {
      return logIn(body);
    }
}
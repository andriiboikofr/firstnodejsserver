import appDataSource from "../";
import {User} from "../models";
import {getUserByEmail, createUser} from "./user";
//import debug, {IDebugger} from "debug";
import jwt from "jsonwebtoken";
import AuthController from "../controllers/auth.controller";
const jwtSecret: string = process.env.JWT_SECRET || "123456";
const tokenExpirationInSeconds = 36000;
//const log: IDebugger=debug("auth:controller");

export interface ILoginPayload{
    email: string;
    password: string;
}

export interface ISignUpPayload extends ILoginPayload
{
    firstName: string;
    lastName: string;
    password2: string;
}

export const logIn=async(payload: ILoginPayload)=>{
    const email= payload.email;
    const password=payload.password;

    const user = await getUserByEmail(email)
    //log("user", user)
    if(user){
        let isPasswordMatch: boolean;
        if (password===user.password){isPasswordMatch=true;}
        else{isPasswordMatch=false;}

        if(!isPasswordMatch){
            throw new Error("Invalid Password");
        } else {
            //log("jwt Secret", jwtSecret)
            const token=jwt.sign(payload, jwtSecret,{expiresIn: tokenExpirationInSeconds});

            return {"user":user, "token":token}
        }
    } else {
        //log("User Not Fount");
        throw new Error("User Not Found");
    }
    
}

export const signUp=async(payload: ISignUpPayload)=>{
        const email=payload.email;
        const firstName=payload.firstName;
        const lastName=payload.lastName;
        const password=payload.password;
        const password2=payload.password2;

        const user= await getUserByEmail(email)
        //log("user", user)
        if (user){
            throw new Error("User Already Exists");
        }
        if (password != password2) {
            throw new Error("The Passwords don't match");
        } else {
            try{
                const user = await createUser({
                "firstName": firstName,
                "lastName": lastName,
                "email":email,
                "password":password});
                const token=jwt.sign({email,password},jwtSecret,{expiresIn: tokenExpirationInSeconds,});
                return {"user":user,"token":token}
            } catch(e) {
                //log("Controller capturing error", e)
                throw new Error("Error while register");
            }
        }
    }

    export default new AuthController();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_KEY = process.env.JWT_SECRET || "123456";
import debug, { IDebugger } from "debug";
import { getUserById } from "../repositories/user";
import { getPost } from "../repositories/post.repository";
import { getComment } from "../repositories/comment.repository";
import { IExistingUserPayload } from "../repositories/user";
import { User, Post, Comment } from "../models";
const log: IDebugger = debug("middleware:JWT");

export interface JWT_token_payload {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

class JWT {
  authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader !== "null") {
      const token = authHeader.split(" ")[1];
      log("auth Header", JWT_KEY);
      jwt.verify(authHeader, JWT_KEY, (err: any, user: any) => {
        if (err) {
          log("Error", err);
          return res
            .status(403)
            .send({ success: false, message: "Token Expired" });
        }
        //req.user=user
        next();
      });
    } else {
      res.status(403).json({ success: false, message: "UnAuthorized" });
    }
  }

  adminRightsCheck= async (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization;
    console.log("Admin Rights Check has been initiated.");
    if (authHeader && authHeader !== "null") {
      const token = authHeader.split(" ")[1];
      console.log("auth Header", JWT_KEY);
      console.log("The actual header", authHeader);
      console.log(typeof jwt.decode(authHeader));
      let payload = jwt.decode(authHeader) as JWT_token_payload;
      let user= await getUserById(payload.id) as unknown as User;
      console.log("User role is =>", user.role);
      if (user["role"] !== "admin") {
        return res
          .status(401)
          .send({ success: false, message: "Not enough rights" });
      }
      next();
    }
  }

  getUserId(req: Request){
    let user: JWT_token_payload;
    const authHeader = req.headers.authorization;
    console.log("Admin Rights Check has been initiated.");
    if (authHeader && authHeader !== "null") {
      user=jwt.decode(authHeader) as JWT_token_payload;
    }
    return user!.id;
  }

  checkOwnership = async (req: Request, res: Response, next: NextFunction)=> {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader !== "null") {
      let requesterData: any;
      console.log(req.baseUrl);
      if (req.baseUrl === "/users") {
        let requesterData = jwt.decode(authHeader) as JWT_token_payload;
        console.log("User ID: ", req.body.id);
        console.log("Requester Id: ", requesterData.id);
        if (requesterData.id === Number(req.body.id)) {
          console.log("The Ids are same. YAY!");
          next();
        } else {
          await this.adminRightsCheck(req, res, next);
        }
      } else {
        let entityOwnerId: number = 0;

        //That's a switch for different kinds of Models being accessed. If I want the ownership checker to be universal I distinquish models inside of it and access a universal field userId.
        switch (req.baseUrl) {
          case "/posts":
            let post = (await getPost(Number(req.body.id))) as unknown as Post;
            if (!post)
              return res
                .status(404)
                .send({ success: false, message: "Post not Found" });
            console.log("Post object", post);
            entityOwnerId = post.userId;
            console.log(entityOwnerId);
            break;
          case "/comments":
            let comment = getComment(Number(req.body.id)) as unknown as Comment;
            if (!comment)
              return res
                .status(404)
                .send({ success: false, message: "Comment not Found" });
            entityOwnerId = comment.userId;
            console.log(entityOwnerId);
            break;
        }
        requesterData = jwt.decode(authHeader) as JWT_token_payload;
        console.log("Entity UserID: ", entityOwnerId);
        console.log("Requester Id: ", requesterData.id);
        if (requesterData.id !== entityOwnerId) {
          console.log("Moved to admin Rights Check");
          console.log("That's the Next function", next);
          this.adminRightsCheck(req, res, next);
        } else {
          console.log("The Ids are same. YAY!");
          next();
        }
      }
    }
  }
}

export default new JWT();

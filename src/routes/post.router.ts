import express from "express";
import { Post } from "tsoa";
import JWT from "../middleware/JWT";
import PostController from "../controllers/post.controller";

const router=express.Router();

router.use([JWT.authenticateJWT])

router.get("/", async (_req,res)=>{
    const controller = new PostController();
    const response=await controller.getPosts();
    return res.send(response);
});

router.get("/:id", async (req,res)=>{
    const controller=new PostController();
    const response=await controller.getPost(req.params.id)
    if(!response) res.status(404).send({message:"No Post Found"});
    return res.send(response);
});

router.post("/", async(req,res)=>{
    const controller=new PostController();
    let userId= JWT.getUserId(req);
    let payload=req.body;
    payload.userId=userId;
    const response= await controller.createPost(payload);
    return res.send(response);
});

router.use(JWT.checkOwnership).post("/delete", async(req,res)=>{
    const controller = new PostController();
    const response= await controller.deletePost(req.body.id);
    if(!response) res.status(204).send({message:"No more Post"});
    return res.send(response);
});

router.use([JWT.checkOwnership]).post("/update", async(req,res)=>{
    const controller= new PostController();
    let userId= JWT.getUserId(req);
    let payload=req.body;
    payload.userId=userId;
    const response=await controller.updatePost(payload);
    if(!response) res.status(404).send({message:"Post not Found"});
    return res.send(response);
});

export default router;
import express from "express";
import CommentController from "../controllers/comment.controller";
import JWT from "../middleware/JWT"
const router=express.Router();

router.use([JWT.authenticateJWT])

router.get("/", async (_req,res)=>{
    const controller = new CommentController();
    const response=await controller.getComments();
    return res.send(response);
});

router.get("/:id", async (req,res)=>{
    const controller=new CommentController();
    const response=await controller.getComment(req.params.id)
    if(!response) res.status(404).send({message:"No Comment Found"});
    return res.send(response);
});

router.post("/", async(req,res)=>{
    const controller=new CommentController();
    let userId= JWT.getUserId(req);
    let payload=req.body;
    payload.userId=userId;
    const response= await controller.createComment(payload)
    return res.send(response);
});

router.use([JWT.checkOwnership]).post("/delete", async(req,res)=>{
    const controller = new CommentController();
    const response= await controller.deleteComment(req.body.id)
    if(!response) res.status(204).send({message:"No more Comment"});
    return res.send(response);
});

router.use(JWT.checkOwnership).post("/update", async(req,res)=>{
    const controller= new CommentController();
    let userId= JWT.getUserId(req);
    let payload=req.body;
    payload.userId=userId;
    const response=await controller.updateComment(payload)
    if(!response) res.status(404).send({message:"Comment not Found"});
    return res.send(response);
});

export default router;
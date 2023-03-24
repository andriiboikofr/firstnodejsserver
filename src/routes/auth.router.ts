import express from "express";
import AuthController from "../controllers/auth.controller";

const router=express.Router();

router.post("/login", async (req, res)=>{
    const controller=new AuthController();
    const response= await controller.logIn(req.body)
return res.send(response);})

router.post("/signup", async (req, res)=>{
    const controller=new AuthController();
    const response= await controller.signUp(req.body)
return res.send(response);})

export default router;
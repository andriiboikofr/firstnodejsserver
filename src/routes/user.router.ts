import express from "express";
import JWT from "../middleware/JWT";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.use([JWT.authenticateJWT])

router.get("/", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.status(200).send({success: true, result: response});
});

router.post("/", async (req, res) => {
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.status(201).send({success: true, result:response});
});

router.use([JWT.checkOwnership]).get("/:id", async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUserById(req.params.id);
    if (!response) res.status(404).send({ message: "No user found" });
    return res.status(200).send({success:true, result:response});
  });

  router.use([JWT.checkOwnership]).post("/delete", async (req, res) => {
    const controller = new UserController();
    console.log("The body of the request",req.body)
    const response = await controller.deleteUser(req.body.id);
    if (response){ res.status(204).send({success:true, message: "No user left" });}
    return res.status(404).send({success:false, message:"No user was found"});
  });

  router.use([JWT.checkOwnership]).post("/update", async (req,res)=>{
    const controller = new UserController();
    const response = await controller.updateUser(req.body);
    if (!response) res.status(404).send({success: false, message:"User not found"});
    return res.send(response);
  })
export default router;

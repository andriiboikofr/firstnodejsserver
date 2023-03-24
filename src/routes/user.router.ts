import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUserById(req.params.id);
    if (!response) res.status(404).send({ message: "No user found" });
    return res.send(response);
  });

  router.post("/delete", async (req, res) => {
    const controller = new UserController();
    console.log("The body of the request",req.body)
    const response = await controller.deleteUser(req.body.id);
    if (!response) res.status(204).send({ message: "No user left" });
    return res.send(response);
  });

  router.post("/update", async (req,res)=>{
    const controller = new UserController();
    const response = await controller.updateUser(req.body);
    if (!response) res.status(404).send({message:"User not found"});
    return res.send(response);
  })
export default router;

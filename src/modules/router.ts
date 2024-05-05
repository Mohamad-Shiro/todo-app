import Router from "express";

const router = Router();

router.get("/user", (req, res) => res.json({ message: "user info" }));

export default router;

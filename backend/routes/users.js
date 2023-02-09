import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("read users");
});
router.post("/", (req, res) => {
  res.status(200).json("create user");
});
router.put("/:id", (req, res) => {
  res.json(`update user! ${req.params.id}`);
});
router.delete("/:id", (req, res) => {
  res.json(`delete user! ${req.params.id}`);
});

export default router;

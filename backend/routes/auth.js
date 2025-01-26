import express from "express";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body();
  try {
    const newUser = new User({});
  } catch (error) {}
});

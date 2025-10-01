const express = require("express");
const router = express.Router();
const {
  getTasks,
  addTask,
  completeTask,
  deleteTask,
  editTask,
} = require("../controllers/tasks");

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", editTask);
router.patch("/:id", completeTask);
router.delete("/:id", deleteTask);

module.exports = router;

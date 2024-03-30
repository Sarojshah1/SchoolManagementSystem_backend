const express = require("express");
const  {
  handlecreateRoutine,
  handleGetRoutine,
  handleGetRoutineByDay,
  handleUpdateRoutine,
  handleDeleteRoutine,
}=require("../controller/Routine");
const router = express.Router();

router.post("/",handlecreateRoutine );

router.get("/",handleGetRoutine);

router.get("/:day",  handleGetRoutineByDay);

router.put("/", handleUpdateRoutine);

router.delete("/", handleDeleteRoutine);

module.exports=router;

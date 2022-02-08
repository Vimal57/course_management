const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const controller = require("../controllers/controller");


router.get("/", controller.getAllCourses);

router.get("/add", controller.renderAddCourse);

router.post("/add", controller.addCourse);

router.get("/update", controller.renderUpdateCourse);

router.post("/update", controller.updateCourse);

router.get("/:id", controller.deleteCourse);

module.exports = router;
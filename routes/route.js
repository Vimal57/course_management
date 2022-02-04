const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const controller = require("../controllers/controller");

const urlencodedParser = bodyParser.urlencoded({extended : false});


router.get("/", urlencodedParser, controller.getAllCoursesGet);

router.get("/add", urlencodedParser, controller.addCourseGet);

router.post("/add", urlencodedParser, controller.addCourse);

router.get("/update", urlencodedParser, controller.updateCourseGet);

router.patch("/update/:id", urlencodedParser, controller.updateCourse);

router.get("/:id", urlencodedParser, controller.deleteCourse);

module.exports = router;
const { json } = require("body-parser");
const Course = require("../models/course");
const axios = require("axios");


// get course on homepage
async function getAllCoursesGet(req, res) {
    try {
        let data = await Course.findAll();

        if(data) {
            res.render("index.ejs", { data : data });
        } else {
            res.render("index.ejs");
        }
        
    } catch(err) {
        res.status(400).send({
            status : "fail",
            err : err
        });
    }
};

// provide form of addCourse page
async function addCourseGet(req, res) {
    try {
        res.render("addCourse.ejs");
    } catch(err) {
        res.status(400).send({
            status : "fail",
            err : err
        });
    }
};

// add new courses from addCourse page
async function addCourse(req, res) {
    try {
        let obj = JSON.parse(JSON.stringify(req.body));

        if(Object.keys(req.body).length == 0) {
            res.status(400).send({
                msg : "Content can not be empty!"
            });
        }

        const newCourse = {
            name : obj.name,
            duration : obj.duration,
            fees : obj.fees
        };

        await Course.create(newCourse);
        
        res.status(200).render("addCourse.ejs")


    } catch(err) {
        console.log("err : ", err);
        res.status(400).send({
            status : "fail",
            err : err
        });
    } 
};

// provide form of updateCourse
async function updateCourseGet(req, res) {
    try {
        let course = await Course.findOne({ where : { id : req.query.id }});

        if(course) {
            res.render("update.ejs", { course : course });
        } else {
            res.send("Something went wrong!");
        }

    } catch(err) {
        res.status(400).send({
            status : "fail",
            err : err
        });
    }

};

// for update data 
async function updateCourse(req, res) {
    try {

        if (!req.body) {
            return res.status(400).send({
                msg : "Data to update can not be empty"
            })
        };

        let data = await Course.findOne({ where : 
            { 
                id : req.body.id 
            }
        });

        if (data) {
            await Course.update({
                name : req.body.name,
                duration : req.body.duration,
                fees : req.body.fees
            }, { where : { id : req.body.id }});

            res.redirect("/");

        } else {
            res.status(200).send({
                status : "fail",
                msg : "Error In Updating Course Information!",
                data : data
            });
        }

    } catch (err) {
        res.status(400).send({
            status : "fail",
            err : "updateCourse err : " + err
        });
    }
    
};

// for delete data
async function deleteCourse(req, res) {
    try {
        console.log("req.params : ", req.params);
        
        let data = await Course.findOne({ where : { id : req.params.id }});
        if (data) {
            let data = await Course.destroy({ where : { id : req.params.id }});
            res.redirect("/");

        } else {
            res.status(200).send({
                status : "success",
                msg : "There is no data available like this!"
            });
        }

    } catch (err) {
        res.status(400).send({
            status : "false",
            err : err
        });
    }
    
};



module.exports = { getAllCoursesGet, updateCourseGet, addCourseGet, addCourse, updateCourse, deleteCourse };
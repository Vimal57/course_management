const Course = require("../models/course");
const validator = require("validator");


/**
 * 
 * @param {*} req 
 * @param {*} res
 * @description "For get all the details at homepage" 
 * @author "Vimal Solanki (zignuts technolabs)"
 */
async function getAllCourses(req, res) {
    try {
        // find all courses
        let data = await Course.findAll();

        // if there is no data
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


/**
 * 
 * @param {*} req 
 * @param {*} res
 * @description "provide form of addCourse page" 
 * @author "Vimal Solanki (zignuts technolabs)"
 */
async function renderAddCourse(req, res) {
    try {
        // render page of add course
        res.render("addCourse.ejs");
    } catch(err) {
        res.status(400).send({
            status : "fail",
            err : err
        });
    }
};


/**
 * 
 * @param {*} req 
 * @param {*} res
 * @description "add new courses from addCourse page" 
 * @author "Vimal Solanki (zignuts technolabs)"
 */
async function addCourse(req, res) {
    try {
        // destructure data
        let { name, duration, fees } = req.body;

        // function for check that given value is integer or not
        function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };

        // values with correct datatype
        if(typeof(name) == "string" && isNumber(duration) && isNumber(fees)) {
            const newCourse = {
                name : name,
                duration : duration,
                fees : fees
            };
            
            await Course.create(newCourse);

            const data = await Course.findAll();
            res.status(200).render("index.ejs", { data : data });

        // value with incorrect datatype    
        } else {
            res.status(400).send("Please enter valid data!")
        }

    } catch(err) {
        console.log("err : ", err);
        res.status(400).send({
            status : "fail",
            err : err
        });
    } 
};

/**
 * 
 * @param {*} req 
 * @param {*} res
 * @description "provide form of updateCourse" 
 * @author "Vimal Solanki (zignuts technolabs)"
 */
async function renderUpdateCourse(req, res) {
    try {
        // check given data is available or not in database
        let course = await Course.findOne({ where : { id : req.query.id }});
        
        // give  page of update course
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


/**
 * 
 * @param {*} req 
 * @param {*} res
 * @description "for update data " 
 * @author "Vimal Solanki (zignuts technolabs)"
 */
async function updateCourse(req, res) {
    try {
        // object destructuring
        let { name, duration, fees } = req.body;
        let course = { name, duration, fees };

        // function for check is given value is number or not
        function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };

        // if values are with correct datatype
        if(typeof(name) == "string" && isNumber(duration) && isNumber(fees)) {

            console.log(typeof(name));
            console.log(typeof(duration));
            console.log(typeof(fees));

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

                const data = await Course.findAll();
                res.status(200).render("index.ejs", { data : data });
    
            } else {
                res.status(200).send({
                    status : "fail",
                    msg : "Error In Updating Course Information!",
                    data : data
                });
            }    

        // if datatype of value is not correct    
        } else {
            console.log("###############################################******");
            res.send("Enter valid data!");
            res.render('update.ejs', { course : course });
        }
        

    } catch (err) {
        res.status(400).send({
            status : "fail",
            err : "updateCourse err : " + err
        });
    }
    
};


/**
 * 
 * @param {*} req 
 * @param {*} res
 * @description "for delete data " 
 * @author "Vimal Solanki (zignuts technolabs)"
 */
async function deleteCourse(req, res) {
    try {
        // check selected data is available or not in database        
        let data = await Course.findOne({ where : { id : req.params.id }});

        // if data is available in database
        if (data) {
            let data = await Course.destroy({ where : { id : req.params.id }});
            res.redirect("/");

        // if data is not available in database    
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



module.exports = { 
    getAllCourses,
    renderUpdateCourse, 
    renderAddCourse, 
    addCourse, 
    updateCourse, 
    deleteCourse 
};
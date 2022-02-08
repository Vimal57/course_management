


$.ajax(request).done(function(response){
    alert("Please Enter Valid Data!");
});

window.location.href = "http://localhost:3000/";






function getParameter(parameterName) {
    let parameter = new URLSearchParams( window.location.search );
    return parameter.get( parameterName );
}

confirm(`Are you sure to delete this course?`);

let id = getParameter("id");
let data = { id : id };

var request = {
    "url" : `http://localhost:3000/${id}`,
    "method" : "DELETE",
    "data" : data
};

$.ajax(request).done(function(response){
    alert("Data Deleted Successfully!");
});






const Course = require("../models/course");






async function getAllCourses(req, res) {
    try {
        let data = await Course.findAll()
        .then(data => {
            console.log("data IN : ", data);
        })
        .catch(err => {
            console.log("err : ", err);
        })
        console.log("data OUT : ", data);

        res.status(200).send({
            msg : "Success",
            data : data
        });

        
    } catch(err) {
        res.status(400).send({
            msg : "Success",
            err : err
        });
    }
};





<form method="POST" action="http://localhost:3000/add" class="text-center m-5">
<label for="name">Course_Name</label>
<input type="text" name="cname" value="">
<label for="duration">Duration</label>
<input type="text" name="duration" value="">
<label for="Fees">Fees</label>
<input type="text" name="Fees" value="">
<input type="submit" name="subBtn">
</form>






<form method="POST" action="http://localhost:3000/add">
        <div class="mb-3">
          <label for="name" class="form-label">Course name</label>
          <input type="text" class="form-control" id="courseName">
        </div>
        <div class="mb-3">
          <label for="duration" class="form-label">Duration</label>
          <input type="text" class="form-control" id="duration">
        </div>
        <div class="mb-3">
            <label for="fees" class="form-label">Fees</label>
            <input type="text" class="form-control" id="fees">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
    </form>











async function getAllCourses(req, res) {
    try {
        
        let data = await Course.findAll({ where : { name : "nodejs"} })
        .then(data => {
            console.log("data : ", data);
        })
        .catch(err => {
            console.log("err : ", err);
        })
        console.log("data : ", data);

        // res.status(200).render("index.ejs");

        res.status(200).send({
            msg : "Success",
            data : data
        });
        
    } catch(err) {
        res.status(400).send({
            err : err
        });
    }
    
};



async function addCourse(req, res) {
    try {
        console.log("req.body : ", req.body);
        console.log("req.query : ", req.query);

        if(Object.keys(req.body).length == 0) {
            res.status(400).send({
                msg : "Content can not be empty!"
            });
            return;
        }

        const newCourse = {
            name : req.body.name,
            duration : req.body.duration,
            fees : req.body.fees
        };

        await Course.create(newCourse)
        .then(data => {
            res.status(200).send({
                msg : "Success",
                data : data
            });
        })
        .catch(err => {
            console.log("err : ", err);
            res.status(400).send({
                msg : "fail",
                err : err
            });
        });


    } catch(err) {
        console.log("err : ", err);
        res.status(400).send({
            err : err
        });
    } 
};



async function updateCourse(req, res) {
    try {
        console.log("req.body : ", req.body);
        res.send("update course");
    } catch (err) {
        res.status(400).send({
            err : err
        });
    }
    
};



async function deleteCourse(req, res) {
    try {
        console.log("req.body : ", req.body);
        res.send("delete course");
    } catch (err) {
        res.status(400).send({
            err : err
        });
    }
    
};



module.exports = { getAllCourses, addCourse, updateCourse, deleteCourse };
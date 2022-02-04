const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("course_management", "root", "password", {
    host : "127.0.0.1",
    dialect : "mysql",
    pool : {max:5, min:0, idle:10000}
});

sequelize.authenticate()
.then(() => {
    console.log("connected to database");
})
.catch(err => {
    console.log("err in database connection :: ", err);
});


sequelize
  .sync();

module.exports = { sequelize };
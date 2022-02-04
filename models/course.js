const Sequelize = require("sequelize");
const { sequelize } = require("../database/database");

const Course = sequelize.define("course", {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        unique : true,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    duration : {
        type : Sequelize.INTEGER,
        allowNull : false
    }, 
    fees : {
        type : Sequelize.INTEGER,
        defaultValue : 500,
        allowNull : false
    }

});

// *********** THIS WILL DELETE IF ANY TABLE WITH SAME NAME IS OCCUR AND CREATE NEW TABLE *******
// sequelize.sync({ force : true })
// .then(() => {
//     console.log("table created");
// })

module.exports = Course;
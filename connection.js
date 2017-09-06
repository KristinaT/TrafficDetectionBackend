//var mysql = require('mysql');
//
//var con = mysql.createConnection({
//    host: "127.0.0.1",
//    user: "root",
//    password: "",
//    database: "Congestion"
//});
//
//con.connect(function(err) {
//    if (err) throw err;
//    console.log("Connected!");
//    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//    con.query(sql, function (err, result) {
//        if (err) throw err;
//        console.log("Table created");
//    });
//});

var Sequelize = require('sequelize');

const sequelize = new Sequelize('Congestion', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


//defining the model
const Traffic = sequelize.define('traffic', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    longtitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

//find all instances
Traffic.findAll().then(traffics => {
   // console.log(traffics);
})

//find one
Traffic.findById(2).then(t => {
    // project will be the first entry of the Projects table with the title 'aProject' || null
    console.log(t);
})

// create instance
//Traffic.create({ name: 'unknown', latitude: 12.300, longtitude: 124.940 });

//destroy instance
//Traffic.destroy({
//        where: {
//            id: 1
//        }
//    });


// force: true will drop the table if it already exists
Traffic.sync({
   // force: true,
    logging: console.log
 }).then(() => {
    // Table created
    //return Traffic.create({
    //    name: 'Accident',
    //    latitude: '43.222',
    //    longtitude: '12.1222'
    //}, {
    //        name: 'Road Construction',
    //        latitude: '45.222',
    //        longtitude: '10.1222'
    //    }
    //);
}).catch((error) => {
    console.log(error);
});

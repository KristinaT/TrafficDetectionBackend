/**
 * Created by kristinataneva on 8/29/17.
 */

const express = require('express'),
    bodyParser = require('body-parser'),
    router = require('./router/index'),
    db = require('./config/db');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
// Add headers
app.use((req, res, next) => {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.header('Content-Type', 'application/json');
    // Pass to next layer of middleware
    next();
});

router(app,db);

//drop and resync with { force: true }
db.sequelize.sync({
//  force: true,
    logging: console.log
}).then(() => {
    app.listen(PORT, () => {
        console.log('Express listening on port:', PORT);
        //db.traffic.destroy({
        //    where: {
        //        id:6
        //    }
        //});
    });
}).catch((error) => {
    console.log(error);
});

//app.listen(3000);
//console.log('running on port 3000...');


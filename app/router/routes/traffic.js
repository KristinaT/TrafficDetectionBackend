/**
 * Created by kristinataneva on 9/6/17.
 */
const haversine = require('haversine');

module.exports = (app, db) => {

    // GET all traffic
    app.get('/traffic', (req,res) => {
        db.traffic.findAll()
            .then(traffic => {
                res.json(traffic);
            });
    });

    // GET single traffic spot by id
    app.get('/traffic/:id', (req, res) => {
        const id = req.params.id;
        db.traffic.find({
            where: { id: id}
        })
            .then(traffic => {
              res.json(traffic);
          });
    });

    // POST a single traffic spot
    app.post('/traffic', (req, res) => {
        const name = req.body.name;
        const latitude = req.body.latitude;
        const longtitude = req.body.longtitude;
        const address = req.body.address;
        var checked;
        const startDistance = {
            latitude: latitude,
            longitude: longtitude
        };
        var shouldThereBeNewPost;
        // find all traffic and then check if the coordinates between the new one is close to some of the previous data

        function DistanceCheck(element){
            const endDistance = {
                latitude: element.dataValues.latitude,
                longitude: element.dataValues.longtitude
            }
            const measuredDistance=haversine(startDistance, endDistance, {unit: 'meter'});

            if(measuredDistance<250){
                console.log("Distance is smaller than 250, no need for another post");
                return false;
            }
            else return true;

        }
        db.traffic.findAll({ where: {name:name}}).then(traffic=>{
            //traffic.forEach(function(item){
            //   //
            //   //console.log("found traffic with the same name ",item.dataValues.id, item.dataValues.latitude,item.dataValues.longtitude);
            //   // const endDistance = {
            //   //     latitude: item.dataValues.latitude,
            //   //     longitude: item.dataValues.longtitude
            //   // }
            //   // const measuredDistance=haversine(startDistance, endDistance, {unit: 'meter'});
            //   // console.log(measuredDistance," Distance between found traffic with same name ",shouldThereBeNewPost," shouldtherebenewpost");
            //   // if(measuredDistance<250){
            //   //     console.log("Distance is smaller than 250, no need for another post");
            //   //
            //   //     return ;
            //   // }
            //   // else{
            //   //   //  shouldThereBeNewPost=1;
            //   //

            //   // }
            //});
            checked = traffic.every(DistanceCheck);
            if(checked === true){
                console.log("true");
                db.traffic.create({
                    name:name,
                    latitude:latitude,
                    longtitude:longtitude,
                    address: address
                })
                    .then(newTraffic => {
                       // res.json(newTraffic)
                        res.send("Додадена вест");
                        res.status(200).end();

                    });
            }
            else{
                console.log("false");
                res.send("Веќе постои таа вест");
                res.status(400).end();
            }
        });
    });

    // DELETE a single traffic spot
    app.delete('/traffic/:id', (req, res) => {
        const id = req.params.id;
        db.traffic.destroy({
                where: { id: id }
            })
            .then(deletedTraffic => {
                res.json(deletedTraffic);
            });
    });

};

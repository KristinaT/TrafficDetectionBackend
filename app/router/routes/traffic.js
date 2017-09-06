/**
 * Created by kristinataneva on 9/6/17.
 */
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

        db.traffic.create({
            name:name,
            latitude:latitude,
            longtitude:longtitude
        })
            .then(newTraffic => {
                res.json(newTraffic)
            })
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
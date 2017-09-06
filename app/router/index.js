/**
 * Created by kristinataneva on 9/6/17.
 */

const routes = [
    require('./routes/traffic')
];

// Add access to the app and db objects to each route

module.exports = function router(app, db) {
    return routes.forEach((route) => {
        route(app,db);
    });
};

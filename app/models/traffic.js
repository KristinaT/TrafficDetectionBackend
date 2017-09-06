/**
 * Created by kristinataneva on 9/6/17.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Traffic = sequelize.define("Traffic", {
        //username: DataTypes.STRING
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        longtitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
    return Traffic;
};


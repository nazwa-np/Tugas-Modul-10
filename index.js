const express = require('express');

const app = express();

const db = require("./models");

const deviceRoute = require("./routes/device.route.js");

app.use(express.json());

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil.');
    })
    .catch(err => {
        console.error('Gagal koneksi ke database: ', err);
    });

db.sequelize
    .sync({
        force: false, // To create table if exists
        alter: true // To update the table if exists
    })
    .then(() => {
        console.log("Database tersinkronisasi.");
    })
    .catch((err) => {
        console.log("Gagal sinkronisasi ke database: " + err.message);
    });

app.use(deviceRoute);

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
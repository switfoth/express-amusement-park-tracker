const express = require('express');
const router = express.Router();
const app = express();

app.set("view engine", "pug")

app.get('/', (req, res) => {
    res.render('index', {title: "Home"})
})

const port = 8080

app.listen(port)

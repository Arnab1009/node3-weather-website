const path = require('path')
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

// Create an app on server

const app = express() 

// Define paths for express config

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve

app.use(express.static(publicDirectoryPath))

// Serve data on request

app.get("", (req, res) => {

    res.render("index", {

        title: "Weather",
        name: "Arnab Halder"

    })

})

app.get("/about", (req, res) => {

    res.render("about", {

        title: "About",
        name: "Arnab Halder"

    })

})

app.get("/help", (req, res) => {

    res.render("help", {

        title: "Help",
        msg: "Help page for weather app",
        name: "Arnab Halder"

    })

})

app.get("/weather", (req, res) => {

    if(!req.query.address){

        return res.send({

            error: "Please enter an address to continue"

        })

    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {

            if(error){
                return res.send({ error })
            }

            res.send({

                forecast,
                location,
                address: req.query.address
        
            })

        })

    })

})

app.get("/products", (req, res) => {
    if(!req.query.search){

        return res.send({

            error: "You must provide a search query!"

        })

    }
    res.send({

        products: []

    })

})

app.get("/help/*", (req, res) => {

    res.render("404", {

        title: "404 Page",
        error: "Help article not found!",
        name: "Arnab Halder"

    })

})

app.get("*", (req, res) => {

    res.render("404", {

        title: "404 Page",
        error: "Page not found!",
        name: "Arnab Halder"

    })

})

// Start the server

app.listen(3000, () => {

    console.log("The server is up on port 3000")

})


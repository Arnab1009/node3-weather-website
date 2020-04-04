const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = "https://api.darksky.net/forecast/904175e225d7d3337b9009782367a749/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si&lang=en"

    request({url, json: true}, (error, { body }) => {

        if(error){

            callback("Unable to connect to weather service!", undefined)

        }
        else if(body.error){

            callback("Unable to find location!", undefined)

        }
        else{

            returnStr = body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees outside. There is a " + body.currently.precipProbability + "% chance of rain. Today`s max temperature is: " + body.daily.data[0].temperatureHigh + " degrees. Today`s min temperature is: " + body.daily.data[0].temperatureLow + " degrees."
            callback(undefined, returnStr)

        }

    })

}

module.exports = forecast
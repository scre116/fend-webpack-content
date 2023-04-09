var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// get weather data from external API
app.get('/weather', function (req, response) {
    console.log('get weather data');
    const openWeatherMapKey = '';
    if (openWeatherMapKey === '') {
        console.log('OpenWeatherMap key is missing');
        response.send({weather: [{description: 'OpenWeatherMap key is missing'}]});
        return;
    }
    
    const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?zip=20001&appid=${openWeatherMapKey}&units=metric`;
    fetch(openWeatherMapUrl)
        .then(weatherResponse => weatherResponse.json())
        .then(function (weatherResponse) {
            console.log(weatherResponse);
            response.send(weatherResponse);
        }
    )
})



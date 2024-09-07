import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { config } from './config.js';

const app = express();
const port = 3000;
const API_KEY = config.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    try{
        const countryCode = req.body.countryCode;
        const cityName = req.body.cityName;
        
        const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${API_KEY}`);
        const locationLat = result.data[0].lat;
        const locationLon = result.data[0].lon;
        
        const weatherResult = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationLat}&lon=${locationLon}&units=metric&appid=${API_KEY}`)
        const weather = weatherResult.data;
        
        const data = [{
            cityName: result.data[0].name,
            country: weather.sys.country,
            icon: weather.weather[0].icon,
            temp: weather.main.temp,
            description: weather.weather[0].description,
            pressure: weather.main.pressure,
            humidity: weather.main.humidity,
            visibility: weather.visibility,
            wind: weather.wind.speed,
        }];
        //console.log(result.data);
        //console.log(weather);
        res.render("index.ejs", {
                data: data
        });
    } catch(error){
        //console.log(error.response.data);
        res.render("index.ejs", {err: "Something went wrong. Try again!"});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
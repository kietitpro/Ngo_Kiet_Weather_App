import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const handleLocation = e => {
    setCity(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCIZ73KRIITvL37368QKTn6fK30uWEAZLQ`
      )
      .then(res => {
        // console.log(res)
        return {
          coords: res.data.results[0].geometry.location,
          location: res.data.results[0].formatted_address
        };
      })
      .then(result => {
        // console.log(result)
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${result.coords.lat}&lon=${result.coords.lng}&units=imperial&APPID=ab08ea294da52560ded46ad9f54be0f6`
          )
          .then(res => {
            setWeather({
              temp: Math.round(res.data.main.temp),
              name: result.location,
              tempMin: res.data.main.temp_min,
              tempMax: res.data.main.temp_max
            });
          });
      });
  };

  return (
    <div>
      <h1>What's The Weather?</h1>
      <br />
      <form
        className="form-inline justify-content-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          placeholder="City,State,Country"
          onChange={handleLocation}
        />
        <input type="submit" value="Get Weather" className="btn btn-primary" />
      </form>
      <br />
      <br />
      <h4>
        The Current Temperature at{" "}
        <small className="text-muted">{weather.name}</small> is{" "}
        <small className="text-warning">{weather.temp}&deg;F</small> .
        <br />
        High:{" "}
        <small className="text-danger">
          {Math.ceil(weather.tempMax)}&deg;F
        </small>
        <br />
        Low:{" "}
        <small className="text-primary">
          {Math.floor(weather.tempMin)}&deg;F
        </small>
      </h4>
    </div>
  );
};

export default Weather;

const request = require('request');

var getWeather = (latitude, longitude, callback) => {
  const key = '4b9fa4c9ddae5e52fc169844a8f57ba1';
  var url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forcast.io server.');
    } else if (response.statusCode == 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode == 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
}

module.exports.getWeather = getWeather;

const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  const apikey = 'AIzaSyD2X6OoxsfbIHm7U7o4h67eBZQUTGNpZJg';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apikey}`;

  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google server');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unale to find that address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    } else {
      callback('Not OK');
    }
  });
}

module.exports = {
  geocodeAddress
};

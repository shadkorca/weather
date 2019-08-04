const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/010980945dd0f9eb69961e7bfe56b00d/${latitude},${longitude}?units=si`;

  request( url, {json:true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service')
    } else if (body.error) {
      callback(`${body.error} Unable to find location`)
    } else {
      const {summary, temperatureHigh, temperatureLow} = body.daily.data[0];
      const {temperature,  precipProbability} = body.currently;
      callback(undefined, `${summary}It is currently ${temperature} degrees out. The high today is ${temperatureHigh} and the min - is ${temperatureLow} There is a ${precipProbability} chance of rain`)
    }
  })
};

module.exports = forecast;

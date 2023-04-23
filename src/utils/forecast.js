const axios = require('axios')

const forecast = (latitude, longitude, callback) => {
    const url = `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`
    axios.get(url).then((response) => {
            callback(undefined, {
                weather: response.data.dataseries[0].weather,
                temp: response.data.dataseries[0].temp2m.min
            }) 
    }).catch((error) => {
        callback('Unable to connect to weather services!', undefined) 
    })
}

module.exports = forecast
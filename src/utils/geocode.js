const axios = require('axios')

const geocode = (address, callback) => {
    const url = `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(address)}&format=jsonv2`
axios.get(url).then((response) => {
    //console.log(response.data[0].lat,  response.data[0].lon)
        callback(undefined, {
            latitude: response.data[0].lat,
            longitude: response.data[0].lon,
            })
    }).catch((error) => {
            callback('Unable to connect to location services!',undefined) 
    })
}

module.exports = geocode
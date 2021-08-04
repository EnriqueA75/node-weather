const request = require('postman-request');

const weather = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZW5yaXF1ZWFyaWFzIiwiYSI6ImNrcnFwdXF4eTBqY2EybnBvcGlrc3J0eHQifQ.peFMbKZ2c9URO9nWKW6OqQ&limit=1'
       
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to wheatermap', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location')
        } else {
            const data = (body.features[0].center)
            callback(undefined, {  
                data: `'The latitude is', ${data[1]} and longitude', ${data[0]}`
            })
        }
    })
}

module.exports = weather
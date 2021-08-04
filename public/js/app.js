console.log('Client site JS is loading perfect')

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const messageThree = document.querySelector('#messageThree')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
   
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ location +'.json?access_token=pk.eyJ1IjoiZW5yaXF1ZWFyaWFzIiwiYSI6ImNrcnFwdXF4eTBqY2EybnBvcGlrc3J0eHQifQ.peFMbKZ2c9URO9nWKW6OqQ&limit=1'
    messageOne.textContent = 'Loading'
    fetch(url).then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = (error)
            } else {
                messageThree.textContent = (`Country code: ${data.features[0].context[1].short_code}`).toUpperCase()
                messageOne.textContent = (data.features[0].center[0], data.features[0].center[1], data.features[0].place_name)
                const info = data.features[0].center
                messageTwo.textContent =(`Latitude ${info[1]} and longitude ${info[0]}`)
            }
        })
    })
}) 
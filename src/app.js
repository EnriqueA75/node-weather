const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
//define paths from express config
const viewsPath = path.join(__dirname, '../templates/views');
app.use(express.static(path.join(__dirname, '../public')));
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and veiews location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Enrique Arias'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About view',
        name: 'Enrique Arias',
        me: 'Software development student'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help section',
        text: 'Page to help you to know something about your weather',
        helpText: 'This is some helpful text to help you',
        name: 'Arias Enrique'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        message: 'ERROR 404 PAGE NOT FOUND',
        name: 'Enrique Arias'
    })
})
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, {location} = {} )=> {
        if(error){
            return res.send({ error })
        }
        weather(location, (error, data) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                data,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        message: 'ERROR 404 PAGE NOT FOUND',
        name: 'Enrique Arias'
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})






















// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Alajuela',
//         location: '123, -123'
//     })
// })
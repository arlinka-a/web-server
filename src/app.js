const path = require('path')
const express = require('express')
const hbs = require('hbs')

// getting utils
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define pathes for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine ad views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arlin Agarunov'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            product: []
        })
    }
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Arlin Agarunov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        txt: 'contact here if needed',
        name: 'Arlin Agarunov'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        let weatherPro, tempPro
        const address = req.query.address
        geocode(address, (error, {latitude, longitude} = {}) => {
            if (error){
                return res.send({error})
            }
            forecast(longitude, latitude, (error, {weather, temp} = {}) => {
                if (error){
                    return res.send({error})
                    }
                weatherPro = weather
                tempPro = temp
                res.send({
                    product: {
                        address: req.query.address,
                        weather: weatherPro, 
                        temp: tempPro
                    }
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help artical not found',
        name: 'Arlin Agarunov'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'About artical not found',
        name: 'Arlin Agarunov'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Arlin Agarunov'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
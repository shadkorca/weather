const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

// Define paths for application config
const publicDirectoryPath = path.join(__dirname, '../public');
//  templates is the name of our views dir
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather Application',
    name: 'Aleksandr Bobyr'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Title',
    name: 'Aleksandr Bobyr'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Some helpful text',
    title: 'Help Title',
    name: 'Aleksandr Bobyr'
  })
});

app.get('/weather', (req, res) => {
  // const geoData = geocode('Philadelphia',(error, data) => {
  //   console.log('data', data);
  //   res.send(data)
  // });
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided in a search term'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error)
      return res.send({ error });
    forecast(latitude, longitude, (error, forecastData) => {
      if (error)
        return res.send({ error });
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  });
  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'Konotop',
  //   address: req.query.address
  // })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query);
  console.log(req.query.search);
  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 error',
    name: 'Aleksandr Bobyr',
    error_massage: 'Help article not found.'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 error',
    name: 'Aleksandr Bobyr',
    error_massage: 'Page not found'
  })
});

app.listen(port, ()=> {console.log(`Starting on port ${port}`)});

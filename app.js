// express library
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// PORT
const PORT = process.env.PORT || 3000

// controllers
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

//Middleware
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use(
	'/prehistoric_creatures',
	require('./controllers/prehistoric_creatures')
)

//DEFAULT routing testing
app.get('/test', (req, res) => res.send('server is running'))
app.get('/', function (req, res) {
	res.render('home')
})
app.get('/*', (req, res) => res.render('404'))

app.listen(PORT, () => {
	console.log('Sever listening on PORT', PORT)
})

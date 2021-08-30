// express library
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const fs = require('fs')

// PORT
const PORT = process.env.PORT || 3000
// controllers
const dinosaurs = require('./controllers/dinosaurs')
const prehistoric_creatures = require('./controllers/prehistoric_creatures')

//Middleware &
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use(
	'/prehistoric_creatures',
	require('./controllers/prehistoric_creatures')
)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

//DEFAULT routing testing
app.get('/test', (req, res) => res.send('server is running'))
app.get('/', function (req, res) {
	res.render('home')
})
app.get('/*', (req, res) => res.render('404'))
/*
//lists all dinosaurs
app.get('/dinosaurs', (req, res) => {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)

	const nameFilter = req.query.nameFilter

	if (nameFilter) {
		dinoData = dinoData.filter((dino) => {
			return dino.name.toLowerCase() === nameFilter.toLowerCase()
		})
	}

	res.render('dinosaurs/index', { myDinos: dinoData })
})

app.get('/prehistoric_creatures', (req, res) => {
	const dinosaurs = fs.readFileSync('./prehistoric_creatures.json')
	const dinoData = JSON.parse(dinosaurs)

	const nameFilter = req.query.nameFilter

	if (nameFilter) {
		dinoData = dinoData.filter((dino) => {
			return dino.name.toLowerCase() === nameFilter.toLowerCase()
		})
	}

	res.render('prehistoric_creatures/index', { myDinos: dinoData })
})

//get new dino
app.get('/dinosaurs/new', (req, res) => {
	res.render('dinosaurs/new')
})

//POST route
app.post('/dinosaurs', (req, res) => {
	console.log(req.body)
})

//POST dino stuff
app.post('/dinosaurs', (req, res) => {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	dinosaurs = JSON.parse(dinosaurs)

	// add item to dinosaurs array
	dinosaurs.push(req.body)

	// save dinosaurs to the data.json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs))

	// redirect to the GET /dinosaurs route (index)
	res.redirect('/dinosaurs')
})

// DELETE & PUT

//adding edit route
app.get('/dinosaurs/edit/:idx', (req, res) => {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)
	res.render('dinosaurs/edit', {
		dino: dinoData[req.params.idx],
		dinoId: req.params.idx
	})
})

//adding PUT route
app.put('/dinosaurs/:idx', (req, res) => {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)

	//re-assign the name and type fields of the dinosaur to be editted
	dinoData[req.params.idx].name = req.body.name
	dinoData[req.params.idx].type = req.body.type

	//save the editted dinosaurs to the data.json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
	res.redirect('/dinosaurs')
})

//express show route for dinosaurs (list one dinosaur)
app.get('/dinosaurs/:idx', (req, res) => {
	// get dinosaurs
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)

	//get array index from url parameter
	const dinoIndex = parseInt(req.params.idx)

	//render page with data of the specified animal
	res.render('dinosaurs/show', { myDino: dinoData[dinoIndex] })
})

//adding DELETE route
app.delete('/dinosaurs/:idx', (req, res) => {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)

	// remove the deleted dinosaur from the dinosaurs array
	dinoData.splice(req.params.idx, 1)

	// save the new dinosaurs to the data.json file
	fs.writeFileSync('/dinosaurs.json', JSON.stringify(dinoData))

	//redirect to the GET /dinosaurs route (index)
	res.redirect('/dinosaurs')
})
*/
app.listen(PORT, () => {
	console.log('Sever listening on PORT', PORT)
})

const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const fs = require('fs')
const PORT = process.env.PORT || 8000

app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
//body-parser middleware
app.use(express.urlencoded({ extended: false }))

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

//adding edit route
app.get('/dinosaurs/edit/:idx', (req, req) => {
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

app.listen(PORT, () => {
	console.log('Sever listening on PORT', PORT)
})

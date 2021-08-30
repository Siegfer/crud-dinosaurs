const express = require('express')
const app = express()
const router = express.Router()

const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const fs = require('fs')

//lists all dinosaurs
router.get('/', (req, res) => {
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
router.get('/new', (req, res) => {
	res.render('dinosaurs/new')
})

//POST dino stuff
router.post('/', (req, res) => {
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
router.get('/edit/:idx', (req, res) => {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)
	res.render('dinosaurs/edit', {
		dino: dinoData[req.params.idx],
		dinoId: req.params.idx
	})
})

//adding PUT route
router.put('/:idx', (req, res) => {
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
router.get('/:idx', (req, res) => {
	// get dinosaurs
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)

	//get array index from url parameter
	const dinoIndex = parseInt(req.params.idx)

	//render page with data of the specified animal
	res.render('dinosaurs/show', { myDino: dinoData[dinoIndex] })
})

//adding DELETE route
router.delete('/:idx', (req, res) => {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)

	// remove the deleted dinosaur from the dinosaurs array
	dinoData.splice(req.params.idx, 1)

	// save the new dinosaurs to the data.json file
	fs.writeFileSync('/dinosaurs.json', JSON.stringify(dinoData))

	//redirect to the GET /dinosaurs route (index)
	res.redirect('/dinosaurs')
})

module.exports = router

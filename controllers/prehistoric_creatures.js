const express = require('express')
const router = express.Router()
const fs = require('fs')

// GET routes
router.get('/', (req, res) => {
	console.log('OTHER DINO LAND')
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const creatureData = JSON.parse(creature)

	const nameFilter = req.query.nameFilter

	if (nameFilter) {
		creatureData = creatureData.filter((creature) => {
			return creature.type.toLowerCase() === nameFilter.toLowerCase()
		})
	}

	res.render('prehistoric_creatures/index', { myDinos: creatureData })
})

router.get('/new', (req, res) => {
	res.render('/prehistoric_creatures/new')
})

router.get('/edit/:idx', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const creatureData = JSON.parse(creature)
	res.render('prehistoric_creatures/edit', {
		creature: creatureData[req.params.idx],
		dinoId: req.params.idx
	})
})

router.get('/:idx', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const creatureData = JSON.parse(creature)
	const dinoIndex = parseInt(req.params.idx)
	res.render('prehistoric_creatures/show', { myDino: creatureData[dinoIndex] })
})

//POST routes
router.post('/', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	creature = JSON.parse(creature)
	creature.push(req.body)
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creature))
	res.redirect('/prehistoric_creatures')
})

//PUT routes
router.put('/:idx', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const creatureData = JSON.parse(creature)
	creatureData[req.params.idx].name = req.body.name
	creatureData[req.params.idx].type = req.body.type
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
	res.redirect('/prehistoric_creatures')
})

router.delete('/:idx', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const creatureData = JSON.parse(creature)
	creatureData.splice(req.params.idx, 1)
	fs.writeFileSync('/prehistoric_creatures.json', JSON.stringify(creatureData))
	res.redirect('/prehistoric_creatures')
})

module.exports = router

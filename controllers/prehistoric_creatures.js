const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
	console.log('OTHER DINO LAND')
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const dinoData = JSON.parse(creature)

	const nameFilter = req.query.nameFilter

	if (nameFilter) {
		dinoData = dinoData.filter((dino) => {
			return dino.type.toLowerCase() === nameFilter.toLowerCase()
		})
	}

	res.render('prehistoric_creatures/index', { myDinos: dinoData })
})

router.get('/new', (req, res) => {
	res.render('/prehistoric_creatures/new')
})

router.post('/', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	creature = JSON.parse(creature)
	creature.push(req.body)
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creature))
	res.redirect('/prehistoric_creatures')
})

router.get('/edit/:idx', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const dinoData = JSON.parse(creature)
	res.render('prehistoric_creatures/edit', {
		dino: dinoData[req.params.idx],
		dinoId: req.params.idx
	})
})

router.put('/:idx', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const dinoData = JSON.parse(creature)
	dinoData[req.params.idx].name = req.body.name
	dinoData[req.params.idx].type = req.body.type
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(dinoData))
	res.redirect('/prehistoric_creatures')
})

router.get('/:idx', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const dinoData = JSON.parse(creature)
	const dinoIndex = parseInt(req.params.idx)
	res.render('prehistoric_creatures/show', { myDino: dinoData[dinoIndex] })
})

router.delete('/:idx', (req, res) => {
	const creature = fs.readFileSync('./prehistoric_creatures.json')
	const dinoData = JSON.parse(creature)
	dinoData.splice(req.params.idx, 1)
	fs.writeFileSync('/prehistoric_creatures.json', JSON.stringify(dinoData))
	res.redirect('/prehistoric_creatures')
})

module.exports = router

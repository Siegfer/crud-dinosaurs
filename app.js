const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(ejsLayouts)

const fs = require('fs')

// lists all dinosaurs

app.get('/dinosaurs', function (req, res) {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	const dinoData = JSON.parse(dinosaurs)
	res.render('/dinosaurs/index', { myDinos: dinoData })
})

app.listen(PORT, () => {
	console.log('Sever Listening on PORT', PORT)
})

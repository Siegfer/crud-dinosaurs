const fs = require('fs')
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

//lists all dinosaurs

app.get('/dinosaurs', (req, res) => {
	const dinosaurs = fs.readFileSync('./dinosaurs.json')
	console.log('hello')
	const dinoData = JSON.parse(dinosaurs)
	console.log(dinoData)
})

// app.listen(PORT, () => {
// 	console.log('Sever listening on PORT', PORT)
// })

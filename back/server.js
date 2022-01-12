const express = require("express")
const data = require('./data.js')
const cors = require('cors')

const app = express()
app.use(cors())
app.get('/api/products', (req, res) => {
  res.send(data.products)
})


app.listen(3000, () => {
  console.log("Server Rodando na porta 3000")
})
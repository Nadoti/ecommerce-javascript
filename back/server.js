const express = require("express")
const data = require('./data.js')
const cors = require('cors')


const app = express()
app.use(cors())
app.get('/api/products', (req, res) => {
  res.send(data.products)
})

app.get("/api/products/:id", (req,res) => {
  const product = res.send(data.products.find(x => x.id == req.params.id))

  console.log(product)
  if(product) {
    res.send(product)
  } else {
    res.status(404).send({message: "Product Not Found"})
  }
})


app.listen(3000, () => {
  console.log("Server Rodando na porta 3000")
})
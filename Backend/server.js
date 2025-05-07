require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send('Hello sfsfsfsf World!')
})

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})

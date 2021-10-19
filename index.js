require('dotenv').config()
const express = require('express')
const request = require('request-promise')

const app = express()

const PORT = process.env.PORT || 5000

const generateScraperUrl = (apiKey) => `${process.env.BASE_URL}${apiKey}&autoparse=true`

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`Welcome to an Amazon Scraper API`)
})

app.get('/products/:productId', async (req, res) => {

  const {productId} = req.params
  const {apiKey} = req.query

  try {
    const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`)

    res.json(JSON.parse(response))
  }
  catch(error) {
    console.log('Error: ', error)
  }
})

app.get('/products/:productId/reviews', async (req, res) => {

  const {productId} = req.params
  const {apiKey} = req.query

  try {
    const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`)

    res.json(JSON.parse(response))
  }
  catch(error) {
    console.log('Error: ', error)
  }
})

app.get('/products/:productId/offers', async (req, res) => {

  const {productId} = req.params
  const {apiKey} = req.query

  try {
    const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

    res.json(JSON.parse(response))
  }
  catch(error) {
    console.log('Error: ', error)
  }
})

app.get('/search/:searchQuery', async (req, res) => {

  const {searchQuery} = req.params
  const {apiKey} = req.query

  try {
    const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`)

    res.json(JSON.parse(response))
  }
  catch(error) {
    console.log('Error: ', error)
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

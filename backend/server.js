require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3002

//Get all restaurants
app.get('/api/v1/restaurants', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurants: ['pizza', 'mcdonald']
        }
    })
})

//Get a restaurant
app.get('api/v1/restaurants/:id', (req, res) => {
    console.log(res)
})

app.listen(port, () => {
    console.log(`Server started on ${port} port`)
})
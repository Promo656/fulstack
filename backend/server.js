require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./db')
const app = express()
const port = process.env.PORT || 3002

/*app.use(morgan('dev'))*/
app.use(cors())
app.use(express.json())

//Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const restaurantRatingData= await db.query('select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id')
        res.status(200).json({
            status: 'success',
            result: restaurantRatingData.rows.length,
            data: {
                restaurants: restaurantRatingData.rows
            }
        })
    } catch (err) {
        console.log(err.message)
    }
})

//Get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await db.query('select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1', [req.params.id])
        const reviews = await db.query('select * from reviews where restaurant_id=$1', [req.params.id])
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
    try {
        const result = await db.query('insert into restaurants (name,location, price_range) values ($1,$2,$3) returning *',
            [req.body.name, req.body.location, req.body.price_range])
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//Update restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const result = await db.query('update restaurants set name=$1, location=$2, price_range=$3 where id=$4 returning *',
            [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            status: 'success',
            data: {
                restaurants: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//Delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        await db.query('delete from restaurants where id=$1 returning *', [req.params.id])
        res.status(204).json({
            status: 'success',
        })
    } catch (err) {
        console.log(err)
    }

})

//Add Review
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
    try {
        const review = await db.query('insert into reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *',
            [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: 'success',
            data: {
                review: review.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Server started on ${port} port`)
})
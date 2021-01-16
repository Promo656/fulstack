import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";

function UpdateRestaurant() {
    const {id} = useParams()
    let history = useHistory()
    const [restaurant, setRestaurant] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [price_range, setPriceRange] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                setRestaurant(response.data.data.restaurant)
                setName(response.data.data.restaurant.name)
                setLocation(response.data.data.restaurant.location)
                setPriceRange(response.data.data.restaurant.price_range)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await RestaurantFinder.put(`/${id}`, {name, location, price_range})
            history.push('/')
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <h1>{restaurant.name}</h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id='name'
                        value={name}
                        onChange={event => setName(event.currentTarget.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id='location'
                        value={location}
                        onChange={event => setLocation(event.currentTarget.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Price range</label>
                    <input
                        type="number"
                        className="form-control"
                        id='price_range'
                        value={price_range}
                        onChange={event => setPriceRange(event.currentTarget.value)}
                    />
                </div>
                <button onClick={handleSubmit} type='submit' className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default UpdateRestaurant;
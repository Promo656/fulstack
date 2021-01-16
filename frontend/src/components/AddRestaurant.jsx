import React, {useState, useContext} from 'react';
import RestaurantFinder from "../api/RestaurantFinder";
import {RestaurantsContext} from "../context/RestaurantsContext";


function AddRestaurant() {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [price_range, setPriceRange] = useState("Price Range")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await RestaurantFinder.post('/', {name, location, price_range})
            addRestaurants(response.data.data.restaurant)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='mb-4'>
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input
                            type="text"
                            className='form-control'
                            placeholder='name'
                            value={name}
                            onChange={event => setName(event.currentTarget.value)}/>
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className='form-control'
                            placeholder='location'
                            value={location}
                            onChange={event => setLocation(event.currentTarget.value)}
                        />
                    </div>
                    <div className="col">
                        <select
                            className='custom-select my-1 mr-sm-2'
                            value={price_range}
                            onChange={event => setPriceRange(event.currentTarget.value)}
                        >
                            <option disabled>Price Range</option>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                            <option value='5'>$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>

        </div>
    );
}

export default AddRestaurant;
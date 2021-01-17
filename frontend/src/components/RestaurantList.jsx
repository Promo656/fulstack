import React, {useContext, useEffect} from 'react';
import RestaurantFinder from "../api/RestaurantFinder";
import {RestaurantsContext} from "../context/RestaurantsContext";
import {useHistory} from "react-router-dom";
import StarRating from "./StarRating";

function RestaurantList() {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    let history = useHistory()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get('/')
                setRestaurants(response.data.data.restaurants)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = async (id) => {
        history.push(`/restaurants/${id}`)
    }

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>;
        }

        return <div>
            <StarRating rating={restaurant.average_rating}/>
            <span className="text-warning ml-1">({restaurant.count})</span>
        </div>
    }


    return (
        <div className='list-group'>
            <table className="table table-hover table-dark">
                <thead>
                <tr className="bg-primary">
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    restaurants.map(restaurants =>
                        <tr onClick={() => handleRestaurantSelect(restaurants.id)} key={restaurants.id}>
                            <td>{restaurants.name}</td>
                            <td>{restaurants.location}</td>
                            <td>{'$'.repeat(restaurants.price_range)}</td>
                            <td>{renderRating(restaurants)}</td>
                            <td>
                                <button onClick={(e) => handleUpdate(e, restaurants.id)} className="btn btn-warning">
                                    Update
                                </button>
                            </td>
                            <td>
                                <button onClick={(e) => handleDelete(e, restaurants.id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default RestaurantList;
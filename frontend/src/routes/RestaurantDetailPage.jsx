import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantFinder from "../api/RestaurantFinder";

function RestaurantDetailPage() {
    const {id} = useParams()
    const {selectedRestaurants, setSelectedRestaurants} = useContext(RestaurantsContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                setSelectedRestaurants(response.data.data.restaurant)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    return (
        <div>{selectedRestaurants.name}</div>
    );
}

export default RestaurantDetailPage;